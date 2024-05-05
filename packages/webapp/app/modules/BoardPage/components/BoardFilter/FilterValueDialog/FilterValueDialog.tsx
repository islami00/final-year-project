import { zodResolver } from '@hookform/resolvers/zod';
import { Modal, ScrollArea } from '@mantine/core';
import { useMemo } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import toast from 'react-hot-toast';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { Status } from '../../../../../models/Status.model';
import { User } from '../../../../../models/User.model';
import { Filter, FilterMeta } from '../../../../../utils/Filter';
import * as filterValueForm from '../../../logic/filterValueForm';
import type { AddFilterActions } from '../AddFilter/AddFilter.types';
import { FilterValueInput } from '../FilterValueInput/FilterValueInput';
import * as classes from './FilterValueDialog.styles';
import { OperatorList } from './OperatorList';

export interface FilterValueDialogProps {
  meta: FilterMeta;
  defaultValues?: filterValueForm.FilterValueForm;
  onChange: (value: Filter) => void;
  onClose: (value: AddFilterActions) => void;
  users: User[];
  statuses: Status[];
}

export function FilterValueDialog(props: FilterValueDialogProps) {
  const { meta, onClose, users, statuses, defaultValues, onChange } = props;
  const operators = useMemo(
    () => filterValueForm.operatorsByType(meta.dataType, meta.isListType),
    [meta.dataType, meta.isListType]
  );

  const defaultValuesToSet =
    defaultValues ||
    filterValueForm.defaultData({
      firstOp: operators[0].operator,
    });
  const form = useForm<filterValueForm.FilterValueForm>({
    defaultValues: defaultValuesToSet,
    resolver: zodResolver(filterValueForm.filterValueFormSchema),
  });

  function handleSubmit(base: filterValueForm.FilterValueForm) {
    onChange({
      meta,
      ...base.data,
    });
  }
  function handleError(err: FieldErrors<filterValueForm.FilterValueForm>) {
    const errMessage = err.data?.root?.message;
    toast.error(errMessage || 'Unknown error');
  }
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
            <ConfirmButton
              color="blue"
              className={classes.submitBtn}
              onClick={() => form.handleSubmit(handleSubmit, handleError)()}
            >
              Apply
            </ConfirmButton>
          </div>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
