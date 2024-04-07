import {
  getInputProps,
  useForm,
  type SubmissionResult,
} from '@conform-to/react';
import { TextInput } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { useFetcher } from '@remix-run/react';
import * as React from 'react';
import {
  TaskDetailsIntent,
  createTitleDefault,
  type TitleFormData,
} from '../../logic/taskDetailsForm';
import { titleInput } from './TaskDetails.styles';

interface TaskTitleProps {
  defaultValue: string;
}
export function TaskTitle(props: TaskTitleProps) {
  const { defaultValue } = props;
  const fetcher = useFetcher<SubmissionResult>();

  // Ensure we only reset when not loading or submitting (navigating)
  const lastResult = fetcher.state === 'idle' ? fetcher.data : null;

  const [form, fields] = useForm<TitleFormData>({
    lastResult: lastResult,
    defaultValue: createTitleDefault(defaultValue),
  });

  const submitRef = React.useRef<HTMLFormElement | null>(null);
  const ref = useEventListener('change', () => {
    fetcher.submit(submitRef.current);
  });

  return (
    <fetcher.Form
      method="POST"
      onSubmit={form.onSubmit}
      id={form.id}
      ref={submitRef}
    >
      <TextInput
        classNames={{
          input: titleInput,
        }}
        ref={ref}
        variant="transparent"
        placeholder="Title"
        {...getInputProps(fields.title, { type: 'text' })}
        error={fields.title.errors?.at(0)}
      />
      <input
        {...getInputProps(fields.intent, { type: 'hidden', value: false })}
        value={TaskDetailsIntent.TITLE}
      />
    </fetcher.Form>
  );
}
