import * as classes from './TaskCard.styles';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import { isNonNullable } from '../../../../utils/isNonNullable';
import { type StaticSections } from './TaskCard.types';
import React from 'react';
import { mapDefined } from '../../../../utils/mapDefined';

export interface TaskSectionsProps {
  task: TaskWithAssignees;
  children: StaticSections;
}

export function TaskSections(props: TaskSectionsProps) {
  const { task, children } = props;
  const mapped = mapDefined(children, (entry) => {
    const [key, value] = entry;
    const res = value(task);
    if (!isNonNullable(res)) return undefined;
    return <React.Fragment key={key}>{value(task)}</React.Fragment>;
  });
  if (mapped.length === 0) return null;
  return <div className={classes.sections}>{mapped}</div>;
}
