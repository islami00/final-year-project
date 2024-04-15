import { Menu } from '@mantine/core';
import { User } from '../../models/User.model';
import { logout } from '../../services/queries/auth/logout';
import { Icon } from '../Icon/Icon';
import { UserAvatar } from '../UserAvatar';
import { menuTarget } from './AppShell.styles';

interface HeaderMenuProps {
  user: User;
}
export function HeaderMenu(props: HeaderMenuProps) {
  const { user } = props;
  return (
    <Menu>
      <Menu.Target>
        <UserAvatar className={menuTarget} src={user.avatar} name={user.name} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon name="IconLogout" />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
