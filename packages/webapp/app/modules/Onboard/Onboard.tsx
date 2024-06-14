import {
  getInputProps,
  useForm,
  type SubmissionResult,
} from '@conform-to/react';
import { parseWithYup } from '@conform-to/yup';
import { AppShell, Button, Paper, Text, TextInput } from '@mantine/core';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import * as styles from './Onboard.styles';
import * as utilStyles from '../../styles/utils.styles';
import * as onboardForm from './logic/onboardForm';
import type { OnboardLoaderData } from './Onboard.types';

export function Onboard() {
  const loaderData = useLoaderData<OnboardLoaderData>();
  const lastResult = useActionData<SubmissionResult>();
  const [form, fields] = useForm<onboardForm.OnboardFormData>({
    lastResult,
    defaultValue: onboardForm.defaultData(loaderData.user.id),
    onValidate({ formData }) {
      return parseWithYup(formData, {
        schema: onboardForm.schema,
      });
    },
    shouldRevalidate: 'onBlur',
  });

  return (
    <AppShell.Main className={styles.root}>
      <Paper bg="dark.7">
        <div className={styles.header}>
          <Text size="lg" fw="bold" c="white" ff="text">
            Create Organisation
          </Text>
        </div>
        <Form
          method="post"
          id={form.id}
          onSubmit={form.onSubmit}
          className={styles.body}
        >
          <Text size="sm" c="dark.0" ff="text">
            You need to be part of at least one organisation. Fill out the
            following form to create an organisation.
          </Text>
          <TextInput
            label="Name"
            {...getInputProps(fields.name, { type: 'text' })}
            error={fields.name.errors?.at(0)}
            key={fields.name.key}
          />
          <input
            {...getInputProps(fields.userId, { type: 'hidden', value: false })}
            value={loaderData.user.id}
            key={fields.userId.key}
          />

          <Button type="submit" className={utilStyles.submitBtn}>
            Submit
          </Button>
        </Form>
      </Paper>
    </AppShell.Main>
  );
}
