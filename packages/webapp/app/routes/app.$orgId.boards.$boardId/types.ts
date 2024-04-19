import type { StatusListWithDefault } from '../../models/Status.model';

export interface BoardIdLoaderData extends Record<string, unknown> {
  statuses: StatusListWithDefault;
}
