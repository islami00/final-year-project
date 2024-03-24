import { AppShell } from '@mantine/core';
import { User } from '../../models/User.model';
import { AppLogo } from '../AppLogo/AppLogo';
import { header } from './AppShell.styles';
import { HeaderMenu } from './HeaderMenu';
interface AppShellHeaderProps {
  user: User;
}

export function AppShellHeader(props: AppShellHeaderProps) {
  const { user } = props;
  return (
    <AppShell.Header className={header}>
      <AppLogo />
      <HeaderMenu user={user} />
    </AppShell.Header>
  );
}
