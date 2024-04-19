import { AppShell } from '@mantine/core';
import { Center, Stack, css, grid } from '@tma/design-system';
import * as React from 'react';
import { P } from '../../components/P/P';

export interface HomeProps {
  message: React.ReactNode;
  description?: string;
}

export function Home(props: HomeProps) {
  const { message, description } = props;
  return (
    <AppShell.Main className={grid()}>
      <Center w="100%" h="100%">
        <Stack
          rowGap="sm"
          flexGrow={1}
          className={css({ textAlign: 'center' })}
        >
          <P textStyle="lg" textAlign="inherit" color="white">
            {message}
          </P>
          <P textStyle="md" textAlign="inherit">
            {description}
          </P>
        </Stack>
      </Center>
    </AppShell.Main>
  );
}
