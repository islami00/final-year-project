import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, TextInput } from '@mantine/core';
import { Form, useActionData } from '@remix-run/react';
import { hiddenInputs } from '../../../../utils/Form/hiddenInputs';
import { CreateModal } from '../../../../components/modals/CreateModal/CreateModal';
import * as departmentIdForm from '../../logic/departmentIdForm';
import { useIsNavigatingTo } from '../../logic/useIsNavigatingTo';
import {
  formRoot,
  submitBtn,
} from '../CreateDepartment/CreateDepartment.styles';

interface CreateBoardProps {
  deptId: string;
}

function CreateBoardModal(props: CreateBoardProps) {
  const { deptId } = props;
  const modal = useModal();

  const maybeNavigation = useIsNavigatingTo(
    departmentIdForm.DepartmentIdFormIntent.CREATE_BOARD
  );

  const lastResult = useActionData<SubmissionResult>();
  const [form, fields] = useForm<departmentIdForm.CreateBoardFormData>({
    lastResult,
    defaultValue: departmentIdForm.createBoardDefaultData(),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: departmentIdForm.createBoardSchema,
      });
    },
    shouldRevalidate: 'onBlur',
  });

  return (
    <CreateModal onClose={modal.remove} title="Create Board">
      <Form method="post" className={formRoot} {...getFormProps(form)}>
        <TextInput
          label="Name"
          {...getInputProps(fields.name, { type: 'text' })}
          error={fields.name.errors?.join()}
          key={fields.name.key}
        />
        {hiddenInputs([
          { field: fields.deptId, value: deptId },
          { field: fields.intent },
        ])}
        <Button
          disabled={maybeNavigation?.state !== 'idle'}
          size="xs"
          type="submit"
          className={submitBtn}
        >
          Submit
        </Button>
      </Form>
    </CreateModal>
  );
}

export const CreateBoard = NiceModal.create(CreateBoardModal);
