import { Button, type ButtonProps, type ElementProps } from '@mantine/core';
import { forwardRef, useMemo } from 'react';
import { Icon } from '../../../../../components/Icon/Icon';
import * as classes from './SavedFiltersButton.styles';
import { SavedFilterQueryData } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import isEqual from 'lodash/fp/isEqual';

interface SavedFiltersButtonProps
  extends ButtonProps,
    Omit<ElementProps<'button'>, 'color'> {
  currentFilter?: SavedFilterQueryData;
  activeSavedFilter?: SavedFilterQueryData;
}
export const SavedFiltersButton = forwardRef<
  HTMLButtonElement,
  SavedFiltersButtonProps
>((props, ref) => {
  const { currentFilter, activeSavedFilter, ...rest } = props;

  const isDifferent = useMemo(
    () => !isEqual(currentFilter?.content, activeSavedFilter?.content),
    [currentFilter?.content, activeSavedFilter?.content]
  );
  const activeFilterName = activeSavedFilter?.id
    ? activeSavedFilter.name
    : null;
  return (
    <Button
      {...rest}
      size="xs"
      ref={ref}
      leftSection={
        <Icon name="IconDeviceFloppy" size="s24" className={classes.icon} />
      }
      color={activeSavedFilter?.content ? 'blue' : 'dark'}
      variant="filled"
    >
      {activeFilterName || 'Saved Filters'}
      {isDifferent && '*'}
    </Button>
  );
});
