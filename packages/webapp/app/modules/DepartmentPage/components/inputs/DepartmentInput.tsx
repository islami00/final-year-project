import type { SubmissionResult } from '@conform-to/dom';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { useFetcher } from '@remix-run/react';
import { useRef } from 'react';
import { ModuleLayoutTitleInput } from '../../../../layouts/ModuleLayout/ModuleLayoutTitleInput';
import { departmentFetcherKeys } from '../../../../services/queries/department/departmentFetcherKeys';
import { getLastResultToReset } from '../../../Boards/logic/getLastResultToReset';
import * as departmentIdForm from '../../logic/departmentIdForm';

export interface DepartmentInputProps {
  defaultValue: string;
  deptId: string;
}

export function DepartmentInput(props: DepartmentInputProps) {
  const { defaultValue, deptId } = props;
  const fetcher = useFetcher<SubmissionResult>({
    key: departmentFetcherKeys.titleFilter(deptId),
  });

  const [form, fields] = useForm<departmentIdForm.NameFormData>({
    lastResult: getLastResultToReset(fetcher),
    defaultValue: departmentIdForm.titleDefaultData(defaultValue),
    onSubmit(event) {
      // Prevent a lot of saves
      if (!form.dirty) event.preventDefault();
    },
  });

  const submitRef = useRef<HTMLFormElement | null>(null);

  return (
    <fetcher.Form ref={submitRef} {...getFormProps(form)} method="post">
      <ModuleLayoutTitleInput
        {...getInputProps(fields.name, { type: 'text' })}
        defaultValue={defaultValue}
        error={fields.name.errors?.join()}
        key={fields.name.key}
        onBlur={() => form.reset()}
      />
      <input
        {...getInputProps(fields.intent, { type: 'hidden' })}
        key={fields.intent.key}
      />
      <input
        {...getInputProps(fields.deptId, { type: 'hidden', value: false })}
        value={deptId}
        key={fields.deptId.key}
      />
    </fetcher.Form>
  );
}
