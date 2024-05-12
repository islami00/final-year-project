import { Button, Select } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { P } from '../../../../../components/P/P';
import { savedFilterQueries } from '../../../../../services/queries/savedFilters/savedFilterQueries';
import * as React from 'react';
import { submitBtn } from '../../../../../styles/utils.styles';
import { SavedFilter } from '../../../../../models/SavedFilter.model';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { selectSavedFilters } from './ApplySavedFilter.utils';

export interface ApplySavedFilterContentProps {
  orgId: string;
  onApply: (value: SavedFilter) => void;
  onClose: VoidFunction;
}
export function ApplySavedFilterContent(props: ApplySavedFilterContentProps) {
  const { orgId, onApply, onClose } = props;
  const savedFilters = useSuspenseQuery({
    ...savedFilterQueries.listFilter(orgId),
    select: selectSavedFilters,
  });

  const [value, onChange] = useState<string | null>(null);
  const savedFilter = savedFilters.data.find((each) => each.value === value);

  return (
    <>
      <P textStyle="sm" px="2xs">
        Existing filters will be cleared
      </P>
      <Select
        placeholder="Select a value"
        data={savedFilters.data}
        value={value}
        onChange={onChange}
      />
      <Button
        onClick={() => {
          if (!savedFilter) toast.error('Missing saved filter');
          else {
            onApply(savedFilter.original);
            onClose();
          }
        }}
        className={submitBtn}
        size="xs"
        color="blue"
      >
        Apply
      </Button>
    </>
  );
}
