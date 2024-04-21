import { useAsyncError } from '@remix-run/react';
import { ErrorLayout } from '../../components/ErrorLayout/ErrorLayout';
import { getErrorMessage } from '../../utils/ErrorHandling/getErrorMessage';

export function BoardPageError() {
  const err = useAsyncError();

  return <ErrorLayout>Error: {getErrorMessage(err)}</ErrorLayout>;
}
