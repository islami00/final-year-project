import type { SubmissionResult } from '@conform-to/dom';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { useFetcher } from '@remix-run/react';
import { ModuleLayoutTitleInput } from '../../../../layouts/ModuleLayout/ModuleLayoutTitleInput';
import { departmentFetcherKeys } from '../../../../services/queries/department/departmentFetcherKeys';
import { getLastResultToReset } from '../../../BoardPage/logic/getLastResultToReset';
import * as departmentIdForm from '../../logic/departmentIdForm';
import { hiddenInputs } from '../../../../utils/Form/hiddenInputs';

export interface DepartmentInputProps {
  defaultValue: string;
  id: string;
}

export function DepartmentTitleInput(props: DepartmentInputProps) {
  const { defaultValue, id } = props;
  const fetcher = useFetcher<SubmissionResult>({
    key: departmentFetcherKeys.nameFilter(id),
  });

  const [form, fields] = useForm<departmentIdForm.NameFormData>({
    lastResult: getLastResultToReset(fetcher),
    defaultValue: departmentIdForm.titleDefaultData(defaultValue),
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
        onBlur={() => form.reset()}
      />
      {hiddenInputs([
        { field: fields.intent },
        { field: fields.deptId, value: id },
      ])}
    </fetcher.Form>
  );
}
