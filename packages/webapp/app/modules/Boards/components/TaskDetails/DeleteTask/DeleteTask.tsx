import { useDisclosure } from '@mantine/hooks';
import { CancelButton } from '../../../../../components/modals/ConfirmModal/CancelButton';
import { ConfirmButton } from '../../../../../components/modals/ConfirmModal/ConfirmButton';
import { ConfirmModal } from '../../../../../components/modals/ConfirmModal/ConfirmModal';
import * as React from 'react';

export interface DeleteTaskProps {
  target: (onClick: VoidFunction) => void;
}

export function DeleteTask(props: DeleteTaskProps) {
  const [opened, toggle] = useDisclosure();
  const { target } = props;
  return (
    <>
      {target(toggle.open)}
      {opened ? (
        <ConfirmModal onClose={toggle.close}>
          <ConfirmButton color="red">Delete</ConfirmButton>
          <CancelButton onClick={toggle.close}>Cancel</CancelButton>
        </ConfirmModal>
      ) : null}
    </>
  );
}
