import { Avatar, Menu } from '@mantine/core';
import { logout } from '../../services/queries/auth/logout';
import { User } from '../../models/User.model';
import { Icon } from '../Icon/Icon';
import { menuTarget } from './AppShell.styles';

interface HeaderMenuProps {
  user: User;
}
export function HeaderMenu(props: HeaderMenuProps) {
  const { user } = props;
  return (
    <Menu>
      <Menu.Target>
        <Avatar className={menuTarget} src={user.avatar} alt={user.name} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<Icon name="IconLogout" />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
