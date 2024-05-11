import { parseWithZod } from '@conform-to/zod';
import {
  generatePath,
  redirect,
  unstable_defineClientLoader as defineClientLoader,
  unstable_defineClientAction as defineClientAction,
  useLoaderData,
  useParams,
} from '@remix-run/react';
import { useMemo } from 'react';
import { DepartmentPage } from '../../modules/DepartmentPage/DepartmentPage';
import * as departmentIdForm from '../../modules/DepartmentPage/logic/departmentIdForm';
import { postCreateBoard } from '../../services/queries/board/postCreateBoard';
import { deleteDepartment } from '../../services/queries/department/deleteDepartment';
import { getDepartmentBoards } from '../../services/queries/department/getDepartmentBoards';
import { getDepartmentById } from '../../services/queries/department/getDepartmentById';
import { patchDepartmentById } from '../../services/queries/department/patchDepartmentById';
import { catchPostSubmissionError } from '../../utils/Form/catchPostSubmissionError';
import { specialFields } from '../../utils/Form/specialFields';
import { routeConfig } from '../../utils/routeConfig';
import { departmentIdSchema } from './utils';

export const clientLoader = defineClientLoader(async (args) => {
  const { request } = args;
  const url = new URL(request.url);
  const params = await departmentIdSchema.parseAsync(args.params);
  const deptId = params.deptId as string;
  const boards = getDepartmentBoards({
    deptId,
    q: url.searchParams.get(specialFields.q),
  });
  const department = await getDepartmentById({ deptId });
  return { boards, department };
});
export const clientAction = defineClientAction(async (args) => {
  const { request, params } = args;
  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: departmentIdForm.schema,
  });

  // This is also called on error.
  if (submission.status !== 'success') {
    return submission.reply();
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
    return submission.reply({ resetForm: true });
  } catch (error) {
    return catchPostSubmissionError(error, submission);
  }
});

export default function DepartmentsDeptIdRoute() {
  const data = useLoaderData<typeof clientLoader>();
  const rawParams = useParams();
  const params = useMemo(
    () => departmentIdSchema.parse(rawParams),
    [rawParams]
  );

  return <DepartmentPage data={data} key={params.deptId} />;
}
