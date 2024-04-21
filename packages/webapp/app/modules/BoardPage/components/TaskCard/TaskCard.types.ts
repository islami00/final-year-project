import * as React from 'react';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import type { Dictionary } from 'lodash';

export type TaskSectionRenderers = (task: TaskWithAssignees) => React.ReactNode;

export type StaticSections = Dictionary<TaskSectionRenderers>;
