import { Modal, ScrollArea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMemo } from 'react';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { Filter, FilterMeta } from '../../../../../utils/Filter';
import type { AddFilterActions } from '../AddFilter/AddFilter.types';
import * as classes from './FilterValueDialog.styles';
import * as filterValueForm from './filterValueForm';
import { OperatorList } from './OperatorList';

export interface FilterValueDialogProps {
  meta: FilterMeta;
  onChange: (value: Filter) => void;
  onClose: (value: AddFilterActions) => void;
}

export function FilterValueDialog(props: FilterValueDialogProps) {
  const { meta, onClose } = props;
  const operators = useMemo(
    () => filterValueForm.operatorsByType(meta.dataType, meta.isListType),
    [meta.dataType, meta.isListType]
  );

  const form = useForm<filterValueForm.FilterValueForm>({
    mode: 'uncontrolled',
    initialValues: filterValueForm.defaultData({
      firstOp: operators[0].operator,
    }),
    validate: zodResolver(filterValueForm.filterValueFormSchema),
    transformValues: (v) => filterValueForm.filterValueFormSchema.parse(v),
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
            <OperatorList
              getInputProps={form.getInputProps}
              operators={operators}
            />
            <div className="input"></div>
            <ConfirmButton color="blue">Apply</ConfirmButton>
          </div>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
