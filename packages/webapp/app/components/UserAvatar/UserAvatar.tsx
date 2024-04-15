import { Avatar, type AvatarProps } from '@mantine/core';
import { getInitials } from '../../utils/getInitials';
import { forwardRef } from 'react';

interface UserAvatarProps extends AvatarProps {
  name: string;
}
export const UserAvatar = forwardRef<HTMLImageElement, UserAvatarProps>(
  (props, ref) => {
    const { name, src, ...rest } = props;
    const initials = getInitials(name);

    return (
      <Avatar
        ref={ref}
        variant="light"
        src={src}
        size="md"
        color="gray"
        {...rest}
      >
        {initials}
      </Avatar>
    );
  }
);
