import { Button, Paper, Text, TextInput } from '@mantine/core';
import * as styles from './Onboard.styles';

export function Onboard() {
  return (
    <styles.Root>
      <Paper bg="dark.7">
        <div className={styles.header}>
          <Text size="lg" fw="bold" c="white" ff="text">
            Organisation Setup
          </Text>
        </div>
        <div className={styles.body}>
          <Text size="sm" c="dark.0" ff="text">
            You need to be part of at least one organisation. Fill out the
            following form to create an organisation.
          </Text>
          <TextInput label="Name" />

          <Button className={styles.submitBtn}>Submit</Button>
        </div>
      </Paper>
    </styles.Root>
  );
}
