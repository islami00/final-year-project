import Converter from './Converter.model';
import OrganizationModel, {
  OrganizationApi,
  type Organization,
} from './Organization.model';
import type { Task, TaskApi } from './Task.model';
import TaskModel from './Task.model';

/** Partial that gets returned when we expand to organisationId */
export interface TaskWithOrganisationApi extends TaskApi {
  expand: {
    boardId: {
      expand: {
        departmentId: { expand: { organisationId: OrganizationApi } };
      };
    };
  };
}

export interface TaskWithOrganisation extends Task {
  organisation: Organization;
}

class TaskWithOrganisationConverter extends Converter<
  TaskWithOrganisationApi,
  TaskWithOrganisation
> {
  async fromApi(from: TaskWithOrganisationApi): Promise<TaskWithOrganisation> {
    const taskPromise = TaskModel.fromApi(from);
    const organisationPromise = OrganizationModel.fromApi(
      from.expand.boardId.expand.departmentId.expand.organisationId
    );
    const [task, organisation] = await Promise.all([
      taskPromise,
      organisationPromise,
    ]);
    return {
      ...task,
      organisation,
    };
  }
}

export default new TaskWithOrganisationConverter();
