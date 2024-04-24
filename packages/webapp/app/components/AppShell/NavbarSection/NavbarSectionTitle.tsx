import * as React from 'react';
import * as classes from './NavbarSection.styles';
import { P } from '../../P';
export interface NavbarSectionTitleProps {
  title: string;
  rightSection?: React.ReactNode;
}

export function NavbarSectionTitle(props: NavbarSectionTitleProps) {
  const { title, rightSection } = props;
  return (
    <div className={classes.titleRoot}>
      <div className={classes.titleContent}>
        <P textStyle="xsSemiBold" truncate>
          {title}
        </P>
        {rightSection}
      </div>
    </div>
  );
}
