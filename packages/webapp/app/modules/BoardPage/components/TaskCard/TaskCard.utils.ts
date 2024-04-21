import type { StaticSections } from './TaskCard.types';
import { assigneeRenderer } from './TaskSectionRenderers/assignee';
import { priorityRenderer } from './TaskSectionRenderers/priority';
import { sprintPointRenderer } from './TaskSectionRenderers/sprintPoints';

export const renderableSections: StaticSections = {
  sprintPointRenderer,
  priorityRenderer,
  assigneeRenderer,
};
