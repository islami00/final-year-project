import { Menu } from '@mantine/core';
import { User } from '../../../models/User.model';
import { logout } from '../../../services/queries/auth/logout';
import { Icon } from '../../Icon/Icon';
import { UserAvatar } from '../../UserAvatar';
import { menuTarget } from '../AppShell.styles';
import { menuClasses } from './HeaderMenu.styles';
import { P } from '../../P';
import { Flex } from '@tma/design-system';
import NiceModal from '@ebay/nice-modal-react';
import { UserSettings } from '../UserSettings';

interface HeaderMenuProps {
  user: User;
}
export function HeaderMenu(props: HeaderMenuProps) {
  const { user } = props;

  return (
    <Menu classNames={menuClasses}>
      <Menu.Target>
        <UserAvatar className={menuTarget} src={user.avatar} name={user.name} />
      </Menu.Target>
      <Menu.Dropdown>
        <Flex columnGap="xs" alignItems="center" p="sm">
          <UserAvatar src={user.avatar} name={user.name} />
          <div>
            <P textStyle="smSemiBold">{user.name}</P>
            <P textStyle="xsSemiBold">{user.email}</P>
          </div>
        </Flex>
        <Menu.Item
          leftSection={<Icon name="IconSettings" strokeSize="s24" />}
          onClick={() => NiceModal.show(UserSettings)}
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<Icon name="IconLogout" strokeSize="s24" />}
          onClick={logout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
