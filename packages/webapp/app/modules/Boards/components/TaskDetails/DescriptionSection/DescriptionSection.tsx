import { Button } from '@mantine/core';
import type { JSONContent } from '@tiptap/react';
import noop from 'lodash/fp/noop';
import { TextEditor } from '../../../../../components/TextEditor/TextEditor';
import * as classes from './DescriptionSection.styles';
import {
  SubmissionResult,
  getInputProps,
  useField,
  useForm,
  useInputControl,
} from '@conform-to/react';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import { Form, useFetcher } from '@remix-run/react';
import { getLastResultToReset } from '../../../logic/getLastResultToReset';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';
interface DescriptionSectionProps {
  defaultValue: JSONContent | null;
  taskId: string;
}

export function DescriptionSection(props: DescriptionSectionProps) {
  const { defaultValue, taskId } = props;

  const fetcher = useFetcher<SubmissionResult>({
    key: taskFetcherKeys.descriptionFilter(taskId),
  });

  const [form, field] = useForm({
    defaultValue: taskDetailsForm.descriptionDefaultData(defaultValue),
    lastResult: getLastResultToReset(fetcher),
    onSubmit(event) {
      if (!form.dirty) event.preventDefault();
    },
  });

  return (
    <fetcher.Form className={classes.descriptionInputAndButton}>
      <TextEditor
        content={defaultValue}
        onChange={noop}
        placeholder="Add a description"
      />
      <div className={classes.descriptionButtons}>
        <Button size="xs" type="submit">
          Save
        </Button>
        <Button size="xs" type="reset" variant="subtle" color="white">
          Cancel
        </Button>
      </div>
      <input
        {...getInputProps(field.intent, { type: 'hidden' })}
        key={field.intent.key}
      />
    </fetcher.Form>
  );
}
