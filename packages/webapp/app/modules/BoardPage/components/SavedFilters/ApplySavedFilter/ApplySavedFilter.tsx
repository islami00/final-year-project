import { Modal } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { ReactErrorBoundaryFallback } from '../../../../../components/errors/ReactErrorBoundaryFallback';
import { SavedFilter } from '../../../../../models/SavedFilter.model';
import * as classes from './ApplySavedFilter.styles';
import { ApplySavedFilterContent } from './ApplySavedFilterContent';
import { ApplySavedFilterLoading } from './ApplySavedFilter.loading';

export interface ApplySavedFilterProps {
  onClose: VoidFunction;
  onApply: (value: SavedFilter) => void;
  organisationId: string;
}

export function ApplySavedFilter(props: ApplySavedFilterProps) {
  const { onClose, onApply, organisationId } = props;
  return (
    <TMAModal opened onClose={onClose} title="Select Saved Filter" centered>
      <Modal.Body className={classes.body}>
        <ErrorBoundary FallbackComponent={ReactErrorBoundaryFallback}>
          <Suspense fallback={<ApplySavedFilterLoading />}>
            <ApplySavedFilterContent
              onClose={onClose}
              onApply={onApply}
              orgId={organisationId}
            />
          </Suspense>
        </ErrorBoundary>
      </Modal.Body>
    </TMAModal>
  );
}
