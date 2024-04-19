import {
  json,
  useLoaderData,
  type ClientLoaderFunctionArgs,
  type ClientActionFunctionArgs,
  redirect,
  generatePath,
} from '@remix-run/react';
import { DepartmentPage } from '../modules/DepartmentPage/Department';
import { getBoardsByDepartment } from '../services/queries/board/getBoardsByDepartment';
import { getDepartmentById } from '../services/queries/department/getDepartmentById';
import { parseWithZod } from '@conform-to/zod';
import * as departmentIdForm from '../modules/DepartmentPage/logic/departmentIdForm';
import { catchPostSubmissionError } from '../utils/Form/catchPostSubmissionError';
import { patchDepartmentById } from '../services/queries/department/patchDepartmentById';
import { deleteDepartment } from '../services/queries/department/deleteDepartment';
import NiceModal from '@ebay/nice-modal-react';
import { modalIds } from '../utils/modalIds';
import { postCreateBoard } from '../services/queries/board/postCreateBoard';
import { routeConfig } from './utils';

export async function clientLoader(args: ClientLoaderFunctionArgs) {
  const { params, request } = args;
  const url = new URL(request.url);
  const deptId = params.deptId as string;
  const boards = getBoardsByDepartment({
    deptId,
    q: url.searchParams.get('q'),
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
        NiceModal.remove(modalIds.deleteDepartment);
        return redirect('../');
      case departmentIdForm.DepartmentIdFormIntent.CREATE_BOARD: {
        const board = await postCreateBoard({
          body: { departmentId: deptId, name: value.name },
        });
        NiceModal.remove(modalIds.createBoard);
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
