import { Modal, type ModalRootProps } from '@mantine/core';
import * as React from 'react';
import { Icon } from '../Icon';
import { mergeClassObjects } from '../../utils/mergeClassObjects';
import { modalClasses } from './TMAModal.styles';

export interface TMAModalProps extends ModalRootProps {
  children: React.ReactNode;
  onClose: VoidFunction;
  opened: boolean;
  title: React.ReactNode;
}

export function TMAModal(props: TMAModalProps) {
  const { children, title, classNames, ...rest } = props;

  const classes = React.useMemo(
    () => mergeClassObjects(modalClasses, classNames),
    [modalClasses, classNames]
  );
  return (
    <Modal.Root {...rest} classNames={classes}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          {React.isValidElement(title) ? (
            title
          ) : (
            <Modal.Title>{title}</Modal.Title>
          )}
          <Modal.CloseButton
            icon={
              <Icon name="IconX" size="s16" strokeSize="s24" color="#fff" />
            }
          />
        </Modal.Header>
        {children}
      </Modal.Content>
    </Modal.Root>
  );
}
