import * as React from 'react';
import * as classes from './NavbarSection.styles';
import { NavbarSectionTitle } from './NavbarSectionTitle';

export interface NavbarSectionProps {
  title: string;
  titleRightSection: React.ReactNode;
  children: React.ReactNode;
}

export function NavbarSection(props: NavbarSectionProps) {
  const { title, titleRightSection, children } = props;
  return (
    <div className={classes.root}>
      <NavbarSectionTitle title={title} rightSection={titleRightSection} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}
