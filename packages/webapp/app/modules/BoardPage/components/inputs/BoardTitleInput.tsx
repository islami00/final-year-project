import type { SubmissionResult } from '@conform-to/dom';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { useFetcher } from '@remix-run/react';
import { ModuleLayoutTitleInput } from '../../../../layouts/ModuleLayout/ModuleLayoutTitleInput';
import { boardFetcherKeys } from '../../../../services/queries/board/boardFetcherKeys';
import { getLastResultToReset } from '../../logic/getLastResultToReset';
import * as boardIdForm from '../../../../routes/app.$orgId.boards.$boardId/form';
import { hiddenInputs } from '../../../../utils/Form/hiddenInputs';

export interface BoardInputProps {
  defaultValue: string;
  id: string;
}

// Todo: Add optimistic ui
export function BoardTitleInput(props: BoardInputProps) {
  const { defaultValue, id } = props;
  const fetcher = useFetcher<SubmissionResult>({
    key: boardFetcherKeys.nameFilter(id),
  });

  const [form, fields] = useForm<boardIdForm.NameFormData>({
    lastResult: getLastResultToReset(fetcher),
    defaultValue: boardIdForm.nameDefaultData({ name: defaultValue, id }),
    onSubmit(event) {
      // Prevent a lot of saves
      if (!form.dirty) event.preventDefault();
    },
  });
  return (
    <fetcher.Form {...getFormProps(form)} method="post">
      <ModuleLayoutTitleInput
        {...getInputProps(fields.name, {
          type: 'text',
        })}
        error={fields.name.errors?.join()}
        key={fields.name.key}
        onBlur={() => {
          if (form.dirty) form.reset();
        }}
      />
      {hiddenInputs([
        { field: fields.intent },
        { field: fields.id, value: id },
      ])}
    </fetcher.Form>
  );
}
