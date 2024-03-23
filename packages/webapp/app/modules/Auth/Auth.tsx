import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { Form, Link, useActionData } from '@remix-run/react';
import { Root, content } from './Auth.styles';
import { AuthModes } from './Auth.types';
import { useForm, getInputProps, SubmissionResult } from '@conform-to/react';
import { parseWithYup } from '@conform-to/yup';
import * as authForm from './logic/authForm';

interface AuthProps {
  mode: AuthModes;
}
export function Auth(props: AuthProps) {
  const { mode } = props;

  const lastResult = useActionData<SubmissionResult>();
  const [form, fields] = useForm({
    lastResult,
    defaultValue: authForm.defaultData(),
    // Required to avoid api flooding: https://github.com/edmundhung/conform/issues/125
    onValidate({ formData }) {
      return parseWithYup(formData, {
        schema:
          mode === 'register' ? authForm.signupSchema : authForm.loginSchema,
      });
    },
    shouldRevalidate: 'onInput',
  });

  return (
    <Root>
      <Paper className={content} radius="md" p="xl" withBorder {...props}>
        <Title mb="xl" order={2}>
          Welcome back to TMA!
        </Title>

        <Form method="post" id={form.id} onSubmit={form.onSubmit}>
          <Stack>
            {mode === 'register' ? (
              <TextInput
                label="Name"
                placeholder="Your name"
                radius="md"
                {...getInputProps(fields.name, { type: 'text' })}
              />
            ) : null}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              radius="md"
              {...getInputProps(fields.email, { type: 'email' })}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              radius="md"
              error={fields?.password?.errors?.at(0)}
              {...getInputProps(fields.password, { type: 'password' })}
            />
          </Stack>

          <Stack justify="center" mt="xl">
            <Button type="submit">{upperFirst(mode)}</Button>
            <Anchor
              component={Link}
              to={mode === 'register' ? '/auth/login' : '/auth/register'}
              c="dimmed"
              size="xs"
              replace
            >
              {mode === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
          </Stack>
        </Form>
      </Paper>
    </Root>
  );
}
