import { ActionIcon } from '@mantine/core';
import { NavLink } from '@remix-run/react';
import { Icon } from '../../Icon';
import { P } from '../../P';
import * as classes from './NavbarLink.styles';
export interface NavbarLinkProps {
  to: string;
  title: string;
}

export function NavbarLink(props: NavbarLinkProps) {
  const { to, title } = props;
  return (
    <>
      <NavLink to={to} className={classes.root}>
        <div className={classes.inner}>
          <div className={classes.linkContent}>
            <ActionIcon
              onClick={(e) => e.preventDefault()}
              size="sm"
              variant="subtle"
              color="dark.1"
            >
              <Icon
                name="IconChevronRight"
                className={classes.icon}
                strokeSize="s24"
              />
            </ActionIcon>
            <P className={classes.linkText} truncate>
              {title}
            </P>
          </div>
        </div>
      </NavLink>
    </>
  );
}
