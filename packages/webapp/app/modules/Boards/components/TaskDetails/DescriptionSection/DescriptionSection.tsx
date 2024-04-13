import { SubmissionResult, useForm } from '@conform-to/react';
import { Button } from '@mantine/core';
import { TextEditor } from '../../../../../components/TextEditor/TextEditor';
import * as taskDetailsForm from '../../../logic/taskDetailsForm';
import * as classes from './DescriptionSection.styles';

import { useFetcher } from '@remix-run/react';
import { taskFetcherKeys } from '../../../../../services/queries/task/taskFetcherKeys';

import { useDidUpdate } from '@mantine/hooks';
import { useTextEditor } from '../../../../../components/TextEditor/TextEditor.utils';
import { Task } from '../../../../../models/Task.model';
import { serialiseFormData } from '../../../../../utils/Form/serialiseFormData';
import { getLastResultToReset } from '../../../logic/getLastResultToReset';

interface DescriptionSectionProps {
  defaultValue: Task['description'];
  taskId: string;
}

export function DescriptionSection(props: DescriptionSectionProps) {
  const { defaultValue, taskId } = props;

  const fetcher = useFetcher<SubmissionResult>({
    key: taskFetcherKeys.descriptionFilter(taskId),
  });
  const editor = useTextEditor({
    placeholder: 'Add a description',
    content: defaultValue.data,
  });

  const lastResult = getLastResultToReset(fetcher);

  // I couldn't figure out sending JSON, so I ended up with a hybrid. b/w the editor and conform
  // This "hybrid" is actually best as resetting the editor on each save will lead to a "jump"
  const [, field] = useForm({
    lastResult,
    defaultValue: taskDetailsForm.descriptionDefaultData(defaultValue),
  });

  function onReset() {
    editor?.commands.setContent(defaultValue.data);
  }

  function handleSubmit() {
    if (!editor) return;
    const editorJSON = editor.getJSON();
    const desc: taskDetailsForm.DescriptionFormData['description'] = {
      data: editorJSON,
    };
    const result: taskDetailsForm.DescriptionFormDataSent = {
      intent: taskDetailsForm.TaskDetailsIntent.DESCRIPTION,
      description: JSON.stringify(desc),
    };
    fetcher.submit(serialiseFormData(result), {
      method: 'post',
    });
  }
  useDidUpdate(() => {
    if (lastResult) {
      // On success, reset to API for sync
      onReset();
    }
  }, [field.description.key]);

  return (
    <div className={classes.descriptionInputAndButton}>
      <TextEditor editor={editor} />
      <div className={classes.descriptionButtons}>
        <Button
          size="xs"
          onClick={handleSubmit}
          loading={fetcher.state !== 'idle'}
        >
          Save
        </Button>
        <Button size="xs" onClick={onReset} variant="subtle" color="white">
          Cancel
        </Button>
      </div>
    </div>
  );
}
