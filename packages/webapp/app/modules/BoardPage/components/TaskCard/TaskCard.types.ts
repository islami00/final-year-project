import * as React from 'react';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';

export type TaskSectionRenderers = (task: TaskWithAssignees) => React.ReactNode;

export type StaticSections = [key: React.Key, TaskSectionRenderers][];
