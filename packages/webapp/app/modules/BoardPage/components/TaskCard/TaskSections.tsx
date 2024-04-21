import * as React from 'react';
import * as classes from './TaskCard.styles';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import { isNonNullable } from '../../../../utils/isNonNullable';

type TaskSectionRenderers = (task: TaskWithAssignees) => React.ReactNode;

export interface TaskSectionsProps {
  task: TaskWithAssignees;
  children: TaskSectionRenderers[];
}

export function TaskSections(props: TaskSectionsProps) {
  const { task, children } = props;
  const mapped = children.map((each) => each(task)).filter(isNonNullable);
  if (mapped.length === 0) return null;
  return <div className={classes.sections}>{mapped}</div>;
}
