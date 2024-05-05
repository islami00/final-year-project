import { useSearchParams } from '@remix-run/react';
import { hashKey } from '@tanstack/react-query';
import { taskQueries } from '../../../../services/queries/task/taskQueryOptionFactory';
import { specialFields } from '../../../../utils/Form/specialFields';
import { useMemo } from 'react';
import { ReactErrorBoundaryFallback } from '../../../../components/errors/ReactErrorBoundaryFallback';
import { type FallbackProps } from 'react-error-boundary';
import { useCurrentFilter } from '../../logic/useCurrentFilter';
import { useDidUpdate } from '@mantine/hooks';
import { SavedFilterQueryData } from '../../../../services/queries/savedFilters/savedFilterQueries';

interface BoardColumnsErrorProps extends FallbackProps {
  savedFilter: SavedFilterQueryData;
}
export function BoardColumnsError(props: BoardColumnsErrorProps) {
  const { resetErrorBoundary } = props;
  const [search] = useSearchParams();

  const currentQ = search.get(specialFields.q);
  const filterQuery = useCurrentFilter();

  const queryKeyHash = useMemo(
    () =>
      hashKey(
        taskQueries.listByStatusFilterKey({
          q: currentQ,
          statusId: '',
          savedFilter: filterQuery.data,
        })
      ),
    [currentQ, filterQuery.data]
  );

  useDidUpdate(() => {
    resetErrorBoundary();
  }, [queryKeyHash]);

  return <ReactErrorBoundaryFallback {...props} />;
}
