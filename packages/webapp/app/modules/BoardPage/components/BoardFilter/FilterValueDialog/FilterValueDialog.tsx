import { ScrollArea, Modal } from '@mantine/core';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { FilterMeta, Filter } from '../../../../../utils/Filter';
import type { AddFilterActions } from '../AddFilter/AddFilter.types';
import { useMemo } from 'react';
import * as filterValueForm from './filterValueForm';
import { useForm } from '@conform-to/react';
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

  const [form, fields] = useForm({
    defaultValue: filterValueForm.defaultData({
      firstOp: operators[0].operator,
    }),
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
          <div className="form">
            <div className="operators"></div>
            <div className="input"></div>
            <div className="submit"></div>
          </div>
        </Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
