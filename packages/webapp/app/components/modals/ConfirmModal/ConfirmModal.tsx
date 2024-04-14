import * as React from 'react';
import { TMAModal } from '../../TMAModal';
import { Modal } from '@mantine/core';
import * as classes from './ConfirmModal.styles';
import { P } from '../../P';

export interface ConfirmModalProps {
  onClose: VoidFunction;
  /** Confirm and Cancel Buttons */
  children: React.ReactNode;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const { onClose, children } = props;
  return (
    <TMAModal
      classNames={classes.modalClasses}
      centered
      onClose={onClose}
      opened
      title="Are you sure?"
    >
      <Modal.Body>
        <P textStyle="sm" color="dark.0">
          This action cannot be reversed
        </P>
        <div className={classes.buttons}>{children}</div>
      </Modal.Body>
    </TMAModal>
  );
}
