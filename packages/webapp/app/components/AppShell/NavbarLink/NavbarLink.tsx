import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from '@remix-run/react';
import { Icon } from '../../Icon';
import { P } from '../../P';
import * as classes from './NavbarLink.styles';
import { defineNavbarLinkVars } from './NavbarLink.utils';
import type { CSSProperties } from 'react';
import { cx } from '@tma/design-system';
import { NavbarLinkEmpty } from './NavbarLinkEmpty';
export interface NavbarLinkProps {
  to: string;
  title: string;
  isEmpty: boolean;
  children?: React.ReactNode;
  level?: number;
}

export function NavbarLink(props: NavbarLinkProps) {
  const { to, title, children, isEmpty, level = 1 } = props;
  const [opened, toggle] = useDisclosure();
  function onToggle(e: React.MouseEvent) {
    e.preventDefault();
    toggle.toggle();
  }
  const isNested = level > 1;
  const vars = defineNavbarLinkVars(level) as CSSProperties;

  function getKids() {
    if (isEmpty || !children) return <NavbarLinkEmpty />;
    return children;
  }
  return (
    <div>
      <NavLink
        to={to}
        className={cx(classes.root, isNested && classes.innerNesting)}
      >
        <div className={classes.inner}>
          <div className={classes.linkContent}>
            <ActionIcon
              onClick={onToggle}
              size="sm"
              className={classes.expandBtn}
              data-invisible={isNested || undefined}
              variant="subtle"
              color="dark.1"
            >
              <Icon
                name={opened ? 'IconChevronDown' : 'IconChevronRight'}
                className={classes.icon}
                strokeSize="s24"
              />
            </ActionIcon>

            <P textStyle="xs" truncate>
              {title}
            </P>
          </div>
        </div>
      </NavLink>
      {opened ? <div style={vars}>{getKids()}</div> : null}
    </div>
  );
}
