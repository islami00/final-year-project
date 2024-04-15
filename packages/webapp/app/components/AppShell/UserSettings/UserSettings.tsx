import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Modal, Select } from '@mantine/core';
import { Flex } from '@tma/design-system';
import { TMAModal } from '../../TMAModal';

function UserSettingsModal() {
  const modal = useModal();
  return (
    <TMAModal centered onClose={() => modal.remove()} opened title="Settings">
      <Modal.Body>
        <Flex flexDirection="column" gap="inherit">
          <Select label="Default Organisation" />
          <Flex justifyContent="flex-end">
            <Button>Save</Button>
          </Flex>
        </Flex>
      </Modal.Body>
    </TMAModal>
  );
}

export const UserSettings = NiceModal.create(UserSettingsModal);
