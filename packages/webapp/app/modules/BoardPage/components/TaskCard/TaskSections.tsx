import * as classes from './TaskCard.styles';
import { TaskWithAssignees } from '../../../../models/TaskWithAssignees.model';
import { isNonNullable } from '../../../../utils/isNonNullable';
import { TaskSectionRenderers } from './TaskCard.types';

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
