import { useSetState, useDidUpdate } from '@mantine/hooks';
import type { SerializeFrom } from '@remix-run/node';
import { type FetcherWithComponents, useFetcher } from '@remix-run/react';
import { isNonNullable } from '../../utils/isNonNullable';
import { useState } from 'react';

interface UseInfiniteLoaderProps<T> {
  defaultPage: number;
  fetcherKey: (page: number) => string;
  getNextPageParam: (lastPage: SerializeFrom<T>) => number | null | undefined;
  getPreviousPageParam: (
    firstPage: SerializeFrom<T>
  ) => number | null | undefined;
  loadData: (
    fetcher: FetcherWithComponents<SerializeFrom<T>>,
    page: number
  ) => void;
}
interface FetchState {
  direction: 'backward' | 'forward' | null;
}

/**
 *
 * @description useInfiniteLoader. There is one reason why I won't use this:
 *  Refetches will be done out of sequence (this can't be cached now. But I won't be caching with rq lol)
 *  This is a problem even without caching. E.g:
 *  Revalidating page 1 and page 2.
 *  An item in page2 has been moved to page 1.
 *  on success, we immediately see the item in page 1. Page 2 is still loading so we have both instances visible https://reactrouter.com/en/6.22.3/guides/deferred#when-does-the-suspense-fallback-render.
 * Alternative: Send all the data for each page. That way, we avoid this issue and can use more remix, especially with b/f infinite pagination.
 * Do try after react-query.
 */
export function useInfiniteLoader<T>(args: UseInfiniteLoaderProps<T>) {
  const {
    defaultPage,
    fetcherKey,
    getNextPageParam,
    getPreviousPageParam,
    loadData,
  } = args;

  const [visiblePages, setVisiblePages] = useState([defaultPage]);
  const lastPage = visiblePages[visiblePages.length - 1];
  const firstPage = visiblePages[0];
  const lastPageFetcher = useFetcher<T>({
    key: fetcherKey(lastPage),
  });
  const firstPageFetcher = useFetcher<T>({
    key: fetcherKey(firstPage),
  });
  function getFetchState() {
    if (lastPageFetcher.state !== 'idle') return 'forward';
    if (firstPageFetcher.state !== 'idle') return 'backward';
    return null;
  }
  // Based on rq implementation
  const [fetchState, setFetchState] = useSetState<FetchState>({
    direction: getFetchState(),
  });

  // Fetch the next/prev page when empty
  useDidUpdate(() => {
    if (!fetchState.direction) return;
    if (fetchState.direction === 'forward') {
      if (lastPageFetcher.state !== 'idle' || lastPageFetcher.data) return;
      loadData(lastPageFetcher, lastPage);
    } else if (fetchState.direction === 'backward') {
      if (firstPageFetcher.state !== 'idle' || firstPageFetcher.data) return;
      loadData(firstPageFetcher, firstPage);
    }
  }, [lastPage, firstPage, fetchState]);
  // Reset when the fetch is over
  const isIdleForward =
    lastPageFetcher.state === 'idle' &&
    lastPageFetcher.data &&
    fetchState.direction === 'forward';
  const isIdleBackward =
    firstPageFetcher.state === 'idle' &&
    firstPageFetcher.data &&
    fetchState.direction === 'backward';
  if (isIdleForward || isIdleBackward) {
    setFetchState({ direction: null });
  }

  // Signal to the outside
  const isFetchingNextPage =
    lastPageFetcher.state !== 'idle' && fetchState.direction === 'forward';
  const isFetchingPrevPage =
    firstPageFetcher.state !== 'idle' && fetchState.direction === 'backward';

  function hasNextPage() {
    if (!lastPageFetcher.data) return false;
    const next = getNextPageParam(lastPageFetcher.data);
    return isNonNullable(next);
  }
  function hasPrevPage() {
    if (!firstPageFetcher.data) return false;
    const next = getPreviousPageParam(firstPageFetcher.data);
    return isNonNullable(next);
  }

  function fetchNextPage() {
    if (!lastPageFetcher.data) {
      // Based on react query behaviour Initial thoughts:
      // Can't fetch next if this isn't loaded. Maybe revalidate somehow?, or this is an error?
      // Cases:
      // Error: Maybe revalidate? I don't want to.
      // NOt a case: Initial load, doing nothing is fine (they'll both be pointing to the same query key, so no).
      return;
    }
    const nextParam = getNextPageParam(lastPageFetcher.data);
    if (!isNonNullable(nextParam)) return;
    setVisiblePages([...visiblePages, nextParam]);
    setFetchState({ direction: 'forward' });
  }
  function fetchPrevPage() {
    // Based on react-query behaviour
    if (!firstPageFetcher.data) return;
    const prevParam = getPreviousPageParam(firstPageFetcher.data);
    if (!isNonNullable(prevParam)) return;
    setVisiblePages([prevParam, ...visiblePages]);
    setFetchState({ direction: 'backward' });
  }
  return {
    visiblePages,
    isFetchingNextPage,
    isFetchingPrevPage,
    hasNextPage: hasNextPage(),
    hasPrevPage: hasPrevPage(),
    fetchNextPage: fetchNextPage,
    fetchPrevPage: fetchPrevPage,
  };
}
