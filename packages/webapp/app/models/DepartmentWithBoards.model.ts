import BoardModel, { type Board, type BoardApi } from './Board.model';
import Converter from './Converter.model';
import DepartmentModel, { Department, DepartmentApi } from './Department.model';

export interface DepartmentWithBoardApi extends DepartmentApi {
  expand: {
    board_via_departmentId: BoardApi[];
  };
}
export interface DepartmentWithBoard extends Department {
  boards: Board[];
}

class DepartmentConverter extends Converter<
  DepartmentWithBoardApi,
  DepartmentWithBoard
> {
  async fromApi(from: DepartmentWithBoardApi): Promise<DepartmentWithBoard> {
    const boards = await BoardModel.fromArrayApi(
      from.expand.board_via_departmentId
    );
    const department = await DepartmentModel.fromApi(from);
    return {
      ...department,
      boards,
    };
  }
}

export default new DepartmentConverter();
