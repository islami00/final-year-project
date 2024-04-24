import { AppShell } from '@mantine/core';
import { Center } from '@tma/design-system';
import * as React from 'react';
import { P } from '../../components/P/P';
import * as classes from './Home.styles';

export interface HomeProps {
  message: React.ReactNode;
  description?: string;
}

export function Home(props: HomeProps) {
  const { message, description } = props;
  return (
    <AppShell.Main className={classes.main}>
      <Center w="100%" h="100%">
        <div className={classes.content}>
          <P textStyle="lg" textAlign="inherit" color="white">
            {message}
          </P>
          <P textStyle="md" textAlign="inherit">
            {description}
          </P>
        </div>
      </Center>
    </AppShell.Main>
  );
}
