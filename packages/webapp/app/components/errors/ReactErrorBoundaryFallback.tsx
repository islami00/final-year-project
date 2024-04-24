import { FallbackProps } from 'react-error-boundary';
import { ErrorLayout } from './ErrorLayout';
import { getErrorMessage } from '../../utils/ErrorHandling/getErrorMessage';

export function ReactErrorBoundaryFallback(props: FallbackProps) {
  const message = getErrorMessage(props.error);
  return <ErrorLayout>Error: {message}</ErrorLayout>;
}
