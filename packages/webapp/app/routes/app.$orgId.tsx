import { parseWithZod } from '@conform-to/zod';
import {
  Outlet,
  generatePath,
  json,
  redirect,
  useLoaderData,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import omit from 'lodash/fp/omit';
import { AppShellRoot } from '../components/AppShell/AppShellRoot';
import { CreateDepartment } from '../modules/DepartmentPage/components/CreateDepartment';
import { useCurrentDepartments } from '../modules/DepartmentPage/logic/useCurrentDepartments';
import {
  requireCurrentOrganisation,
  requireOrganizations,
  requireUser,
} from '../services/pocketbase/auth';
import { getDepartmentsByOrg } from '../services/queries/department/getDepartmentsByOrg';
import { postCreateDepartment } from '../services/queries/department/postCreateDepartment';
import { patchUserById } from '../services/queries/users/patchUserById';
import type { AppLoaderData } from '../types/app.types';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import * as appOrgIdForm from '../utils/appOrgIdForm';
import { modalIds } from '../utils/modalIds';
import { routeConfig } from './utils';

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
