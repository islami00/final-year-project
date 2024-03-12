import { Paper } from '@mantine/core';
import NxWelcome from '../modules/nx-welcome/nx-welcome';

export default function Index() {
  return (
    <Paper w="100dvw" h="100dvh" bg="dark">
      
      <NxWelcome title={'webapp'} />
    </Paper>
  );
}
