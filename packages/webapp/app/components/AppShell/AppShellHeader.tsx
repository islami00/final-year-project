import { AppShell, Button } from '@mantine/core';
import { logout } from '../../services/queries/auth/logout';
import { header } from './AppShell.styles';
import { User } from '../../models/User.model';
import { Icon } from '../Icon/Icon';
interface AppShellHeaderProps {
  user: User;
}

export function AppShellHeader(props: AppShellHeaderProps) {
  const {} = props;
  return (
    <AppShell.Header className={header}>
      <Icon name="logo" size={null} width={41} height={15} />
      <Button onClick={logout}>Logout</Button>
    </AppShell.Header>
  );
}
