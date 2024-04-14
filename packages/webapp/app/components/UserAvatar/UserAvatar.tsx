import { Avatar, type AvatarProps } from '@mantine/core';
import { getInitials } from '../../utils/getInitials';

interface UserAvatarProps extends AvatarProps {
  name: string;
}
export function UserAvatar(props: UserAvatarProps) {
  const { name, src, ...rest } = props;
  const initials = getInitials(name);

  return (
    <Avatar variant="light" src={src} size="md" color="gray" {...rest}>
      {initials}
    </Avatar>
  );
}
