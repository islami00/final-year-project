import { ActionIcon, Button } from '@mantine/core';
import { styled } from '@tma/design-system';
import { Icon } from '../../../../../components/Icon/Icon';
import { Filter } from '../../../../../utils/Filter';
import { fmtFilter } from '../../../logic/filterValueForm';
import { filterChip } from './FilterChip.styles';

export interface FilterChipProps {
  filter: Filter;
}

export function FilterChip(props: FilterChipProps) {
  const { filter } = props;
  const { label, operator, value } = fmtFilter(filter);
  const classes = filterChip();
  return (
    <div className={classes.root}>
      <Button size="xs" color="dark" className={classes.btn}>
        <styled.span truncate>
          <styled.span color="blue.6">{label}</styled.span> {operator}{' '}
          <styled.span truncate color="blue.6">
            {value}
          </styled.span>
        </styled.span>
      </Button>
      <ActionIcon size="lg" color="dark" className={classes.btn}>
        <Icon name="IconX" />
      </ActionIcon>
    </div>
  );
}
