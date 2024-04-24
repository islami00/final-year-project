import type { StaticSections } from './TaskCard.types';
import { assigneeRenderer } from './TaskSectionRenderers/assignee';
import { priorityRenderer } from './TaskSectionRenderers/priority';
import { sprintPointRenderer } from './TaskSectionRenderers/sprintPoints';

export const renderableSections: StaticSections = [
  [0, sprintPointRenderer],
  [1, priorityRenderer],
  [2, assigneeRenderer],
];
