import {
  Combobox,
  useCombobox,
  type ComboboxStore,
  Button,
} from '@mantine/core';
import { AppError, appErrorCodes } from '../../utils/AppError';
import { AssigneeData } from './AssigneeSelect.types';
import { AssigneeDropdown } from './AssigneeDropdown';
import * as classes from './AssigneeSelect.styles';

type AssigneeValue = Set<string>;

type SelectAction =
  | {
      type: 'add';
      value: AssigneeData;
    }
  | {
      type: 'remove';
      value: string;
    };
type AssigneeSelectTarget = (
  users: AssigneeData[],
  combobox: ComboboxStore
) => React.ReactNode;

export interface AssigneeSelectProps {
  /**
   * All available users, assume they aren't a lot
   * */
  data: AssigneeData[];
  /** Something. Remove it or add it. Only one can be queued up at a time. Remix handles it! */
  onChange?: (value: SelectAction) => void;
  /**
   * Currently selected assignees
   * For optimistic: Add to this list, and Remove from this list
   */
  values: AssigneeValue;
  /** Renders a target like the list of users, or the button! */

  target?: AssigneeSelectTarget;
}
const defaultTarget: AssigneeSelectTarget = (_, cb) => (
  <Button onClick={() => cb.toggleDropdown()}>Select</Button>
);
/**
 * How do you sync the remaining fetches remix?
 *  Use fetcher keys and intent.
 *  IF: fetcher intent is add, add it to the list
 *  IF: fetcher intent is remove, remove it from the list.
 *
 *  Then: Add a key with the assignee ID, so that if the user submits again, we cancel the old one.
 *
 */

export function AssigneeSelect(props: AssigneeSelectProps) {
  const { values, onChange, data, target = defaultTarget } = props;
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  function toggleItem(value: string) {
    let stateToSet: SelectAction;
    if (values.has(value)) {
      stateToSet = {
        type: 'remove',
        value,
      };
    } else {
      const foundItem = data.find((each) => each.id === value);
      if (!foundItem) {
        throw new AppError(appErrorCodes.NOT_FOUND);
      }
      stateToSet = {
        type: 'add',
        value: foundItem,
      };
    }
    onChange?.(stateToSet);
  }

  const selectedUsers = data.filter((each) => values.has(each.id));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={toggleItem}
      classNames={classes.selectClasses}
      width={250}
      position="bottom-start"
    >
      <Combobox.DropdownTarget>
        {target(selectedUsers, combobox)}
      </Combobox.DropdownTarget>

      <AssigneeDropdown data={data} values={values} />
    </Combobox>
  );
}
