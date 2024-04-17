import { Modal, ScrollArea } from '@mantine/core';
import { TMAModal } from '../../TMAModal/TMAModal';
import * as React from 'react';

export interface CreateModalProps {
  children: React.ReactNode;
  title: string;
  onClose: VoidFunction;
}

export function CreateModal(props: CreateModalProps) {
  const { onClose, children, title } = props;
  return (
    <TMAModal opened onClose={onClose} title={title} centered>
      <ScrollArea.Autosize>
        <Modal.Body>{children}</Modal.Body>
      </ScrollArea.Autosize>
    </TMAModal>
  );
}
