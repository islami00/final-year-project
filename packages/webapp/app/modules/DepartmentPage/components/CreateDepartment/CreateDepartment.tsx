import {
  SubmissionResult,
  getFormProps,
  getInputProps,
  useForm,
} from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Button, TextInput } from '@mantine/core';
import { Form, useActionData } from '@remix-run/react';
import * as appOrgIdForm from '../../../../routes/app.$orgId/form';
import { formRoot, submitBtn } from './CreateDepartment.styles';
import { CreateModal } from '../../../../components/modals/CreateModal/CreateModal';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

interface CreateDepartmentProps {
  organisationId: string;
}

function CreateDepartmentModal(props: CreateDepartmentProps) {
  const { organisationId } = props;
  const modal = useModal();

  const lastResult = useActionData<SubmissionResult>();
  const [form, fields] = useForm<appOrgIdForm.CreateDepartmentData>({
    lastResult,
    defaultValue: appOrgIdForm.createDepartmentDefaultData(organisationId),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: appOrgIdForm.createDepartmentSchema,
      });
    },
    shouldRevalidate: 'onBlur',
  });

  return (
    <CreateModal onClose={modal.remove} title="Create Department">
      <Form method="post" className={formRoot} {...getFormProps(form)}>
        <TextInput
          label="Name"
          {...getInputProps(fields.name, { type: 'text' })}
          key={fields.name.key}
        />
        <input
          {...getInputProps(fields.organisationId, {
            type: 'hidden',
            value: false,
          })}
          value={organisationId}
          key={fields.organisationId.key}
        />
        <input
          {...getInputProps(fields.intent, {
            type: 'hidden',
          })}
          key={fields.intent.key}
        />

        <Button size="xs" type="submit" className={submitBtn}>
          Submit
        </Button>
      </Form>
    </CreateModal>
  );
}

export const CreateDepartment = NiceModal.create(CreateDepartmentModal);
