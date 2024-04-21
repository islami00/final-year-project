import { useAsyncError } from '@remix-run/react';
import { ErrorLayout } from './ErrorLayout';
import { getErrorMessage } from '../../utils/ErrorHandling/getErrorMessage';

export function DefaultAwaitErrorElement() {
  const err = useAsyncError();

  return <ErrorLayout>Error: {getErrorMessage(err)}</ErrorLayout>;
}
