import {
  json,
  type ClientActionFunctionArgs,
  redirect,
  generatePath,
} from '@remix-run/react';
import {
  useLoaderData,
  Outlet,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import { AppShellRoot } from '../components/AppShell/AppShellRoot';
import {
  requireCurrentOrganisation,
  requireOrganizations,
  requireUser,
} from '../services/pocketbase/auth';
import type { AppLoaderData } from '../types/app.types';
import { parseWithZod } from '@conform-to/zod';
import * as appOrgIdForm from '../utils/appOrgIdForm';
import { patchUserById } from '../services/queries/users/patchUserById';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import { getDepartmentsByOrg } from '../services/queries/department/getDepartmentsByOrg';
import { postCreateDepartment } from '../services/queries/department/postCreateDepartment';
import omit from 'lodash/fp/omit';
import { CreateDepartment } from '../modules/Departments/components/CreateDepartment';
import { modalIds } from '../utils/modalIds';
import { routeConfig } from './utils';
import NiceModal from '@ebay/nice-modal-react';
import { useCurrentDepartments } from '../modules/Departments/logic/useCurrentDepartments';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params } = args;
  const user = await requireUser();
  const organisations = await requireOrganizations(user.id);
  const currentOrganisation = requireCurrentOrganisation(organisations, params);
  const departments = await getDepartmentsByOrg({
    orgId: params.orgId as string,
  });

  return json<AppLoaderData>({
    user,
    organisations,
    currentOrganisation,
    departments,
  });
}

export async function clientAction(args: ClientActionFunctionArgs) {
  const { request } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: appOrgIdForm.schema,
  });
  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;

  try {
    switch (value.intent) {
      case appOrgIdForm.AppOrgIdIntent.USER_SETTINGS:
        await patchUserById({
          body: { dashboardOrganisation: value.dashboardOrganisation },
          id: value.userId,
        });
        break;
      case appOrgIdForm.AppOrgIdIntent.CREATE_DEPARTMENT: {
        const body = omit('intent', value);
        const dept = await postCreateDepartment({ body });
        NiceModal.remove(modalIds.createDepartment);
        return redirect(
          generatePath(routeConfig.departmentList.param, {
            orgId: dept.organisationId,
            deptId: dept.id,
          })
        );
      }
      default:
        break;
    }
    return json(submission.reply({ resetForm: true }));
  } catch (error) {
    return catchPostSubmissionError(error, submission);
  }
}
export default function AppOrgIdRoute() {
  const loadedData = useLoaderData<typeof clientLoader>();
  const { user, organisations, currentOrganisation, departments } = loadedData;
  // Todo: Split this in a normalised way from boards to apply optimistic updates to them too.
  const depts = useCurrentDepartments({ departmentsOrDepartment: departments });
  const currentDepts = Array.from(depts.values());
  return (
    <AppShellRoot
      navbar
      user={user}
      organisations={organisations}
      currentOrganisation={currentOrganisation}
      departments={currentDepts}
    >
      <Outlet />
      <CreateDepartment
        id={modalIds.createDepartment}
        organisationId={currentOrganisation.id}
      />
    </AppShellRoot>
  );
}
