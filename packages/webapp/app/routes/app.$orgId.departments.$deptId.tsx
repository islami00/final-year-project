import { parseWithZod } from '@conform-to/zod';
import {
  generatePath,
  json,
  redirect,
  useLoaderData,
  type ClientActionFunctionArgs,
  type ClientLoaderFunctionArgs,
} from '@remix-run/react';
import { DepartmentPage } from '../modules/DepartmentPage/DepartmentPage';
import * as departmentIdForm from '../modules/DepartmentPage/logic/departmentIdForm';
import { getDepartmentBoards } from '../services/queries/department/getDepartmentBoards';
import { postCreateBoard } from '../services/queries/board/postCreateBoard';
import { deleteDepartment } from '../services/queries/department/deleteDepartment';
import { getDepartmentById } from '../services/queries/department/getDepartmentById';
import { patchDepartmentById } from '../services/queries/department/patchDepartmentById';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import { routeConfig } from '../utils/routeConfig';
import { specialFields } from '../utils/Form/specialFields';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params, request } = args;
  const url = new URL(request.url);
  const deptId = params.deptId as string;
  const boards = getDepartmentBoards({
    deptId,
    q: url.searchParams.get(specialFields.q),
  });
  const department = await getDepartmentById({ deptId });
  return { boards, department };
}
export async function clientAction(args: ClientActionFunctionArgs) {
  const { request, params } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: departmentIdForm.schema,
  });

  // This is also called on error.
  if (submission.status !== 'success') {
    return json(submission.reply());
  }
  const { value } = submission;
  const deptId = params.deptId as string;
  const orgId = params.orgId as string;
  try {
    switch (value.intent) {
      case departmentIdForm.DepartmentIdFormIntent.NAME:
        await patchDepartmentById({
          body: {
            name: value.name,
          },
          deptId,
        });
        break;

      case departmentIdForm.DepartmentIdFormIntent.DELETE_DEPARTMENT:
        await deleteDepartment({ deptId });
        return redirect('../');
      case departmentIdForm.DepartmentIdFormIntent.CREATE_BOARD: {
        const board = await postCreateBoard({
          body: { departmentId: deptId, name: value.name },
        });
        return redirect(
          generatePath(routeConfig.board.param, { boardId: board.id, orgId })
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
export default function DepartmentsDeptIdRoute() {
  const data = useLoaderData<typeof clientLoader>();

  return <DepartmentPage data={data} />;
}
