import { Modal } from '@mantine/core';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { TMAModal } from '../../../../../components/TMAModal/TMAModal';
import { ReactErrorBoundaryFallback } from '../../../../../components/errors/ReactErrorBoundaryFallback';
import { SavedFilter } from '../../../../../models/SavedFilter.model';
import * as classes from './ApplySavedFilter.styles';
import { ApplySavedFilterContent } from './ApplySavedFilterContent';
import { ApplySavedFilterLoading } from './ApplySavedFilter.loading';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

export interface ApplySavedFilterProps {
  onApply: (value: SavedFilter) => void;
  organisationId: string;
}

export function ApplySavedFilter(props: ApplySavedFilterProps) {
  const { onApply, organisationId } = props;
  const modal = useModal();
  return (
    <TMAModal
      opened
      onClose={modal.remove}
      title="Select Saved Filter"
      centered
    >
      <Modal.Body className={classes.body}>
        <ErrorBoundary FallbackComponent={ReactErrorBoundaryFallback}>
          <Suspense fallback={<ApplySavedFilterLoading />}>
            <ApplySavedFilterContent
              onClose={modal.remove}
              onApply={onApply}
              orgId={organisationId}
            />
          </Suspense>
        </ErrorBoundary>
      </Modal.Body>
    </TMAModal>
  );
}
export const GlobalApplySavedFilter = NiceModal.create(ApplySavedFilter);
