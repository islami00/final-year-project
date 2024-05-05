import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ScrollArea } from '@mantine/core';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { Filter, FilterMeta } from '../../../../../utils/Filter';
import type { AddFilterActions } from '../AddFilter/AddFilter.types';
import * as classes from './FilterValueDialog.styles';
import { OperatorList } from './OperatorList';
import * as filterValueForm from '../../../logic/filterValueForm';
import { FilterValueInput } from '../FilterValueInput/FilterValueInput';
import { User } from '../../../../../models/User.model';
import { Status } from '../../../../../models/Status.model';

export interface FilterValueDialogProps {
  meta: FilterMeta;
  onChange: (value: Filter) => void;
  onClose: (value: AddFilterActions) => void;
  users: User[];
  statuses: Status[];
}

export function FilterValueDialog(props: FilterValueDialogProps) {
  const { meta, onClose, users, statuses } = props;
  const operators = useMemo(
    () => filterValueForm.operatorsByType(meta.dataType, meta.isListType),
    [meta.dataType, meta.isListType]
  );

  const form = useForm<filterValueForm.FilterValueForm>({
    defaultValues: filterValueForm.defaultData({
      firstOp: operators[0].operator,
    }),
    resolver: zodResolver(filterValueForm.filterValueFormSchema),
  });

  return (
    <TMAModal
      opened
      onClose={() => onClose({ type: 'close' })}
      title={meta.label}
      centered
    >
      <ScrollArea.Autosize>
        <Modal.Body>
          <div className={classes.formContainer}>
            <OperatorList form={form} operators={operators} />
            <FilterValueInput
              users={users}
              meta={meta}
              form={form}
              statuses={statuses}
            />
            <ConfirmButton color="blue">Apply</ConfirmButton>
          </div>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
