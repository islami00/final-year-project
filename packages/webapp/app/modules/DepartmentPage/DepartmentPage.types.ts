import { Board } from '../../models/Board.model';
import { Department } from '../../models/Department.model';

export interface DepartmentsDepartmentIdLoaderData {
  boards: Promise<Board[]>;
  department: Department;
}
