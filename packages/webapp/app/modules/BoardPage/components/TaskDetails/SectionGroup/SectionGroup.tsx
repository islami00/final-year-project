import { Text } from '@mantine/core';
import * as React from 'react';
import * as classes from './SectionGroup.styles';

export interface SectionGroupProps {
  title: string;
  children: React.ReactNode;
}

export function SectionGroup(props: SectionGroupProps) {
  const { title, children } = props;
  return (
    <div className={classes.sectionGroup}>
      <Text className={classes.sectionGroupTitle}>{title}</Text>
      <div className={classes.sectionGroupButtons}>{children}</div>
    </div>
  );
}
