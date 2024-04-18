import type { SerializeFrom } from '@remix-run/node';
import { Board } from '../../models/Board.model';
import { Department } from '../../models/Department.model';

interface DepartmentsDepartmentIdLoaderDataBase {
  boards: Promise<Board[]>;
  department: Department;
}
export type DepartmentsDepartmentIdLoaderData =
  SerializeFrom<DepartmentsDepartmentIdLoaderDataBase>;
