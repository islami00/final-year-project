import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from '@conform-to/react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Modal } from '@mantine/core';
import { useFetcher } from '@remix-run/react';
import { Flex, flex } from '@tma/design-system';
import * as appOrgIdForm from '../../../routes/app.$orgId/form';
import { Organization } from '../../../models/Organization.model';
import { User } from '../../../models/User.model';
import { getLastResultToReset } from '../../../modules/BoardPage/logic/getLastResultToReset';
import { TMAModal } from '../../TMAModal';
import { DashboardOrganisationSelect } from './DashboardOrganisationSelect';

interface UserSettingsModalProps {
  user: User;
  organisations: Organization[];
}
function UserSettingsModal(props: UserSettingsModalProps) {
  const { user, organisations } = props;
  const modal = useModal();

  const fetcher = useFetcher<SubmissionResult>();
  const [form, field] = useForm({
    lastResult: getLastResultToReset(fetcher),
    defaultValue: appOrgIdForm.userSettingsDefaultData({ user }),
  });

  return (
    <TMAModal centered onClose={() => modal.remove()} opened title="Settings">
      <Modal.Body>
        <fetcher.Form
          {...getFormProps(form)}
          method="post"
          className={flex({ flexDirection: 'column', gap: 'inherit' })}
        >
          <DashboardOrganisationSelect
            field={field.dashboardOrganisation}
            organisations={organisations}
          />
          <input
            {...getInputProps(field.userId, { value: false, type: 'hidden' })}
            value={user.id}
            key={field.userId.key}
          />
          <input
            {...getInputProps(field.intent, { type: 'hidden' })}
            key={field.intent.key}
          />
          <Flex justifyContent="flex-end">
            <Button type="submit" loading={fetcher.state !== 'idle'} size="xs">
              Save
            </Button>
          </Flex>
        </fetcher.Form>
      </Modal.Body>
    </TMAModal>
  );
}

export const UserSettings = NiceModal.create(UserSettingsModal);
