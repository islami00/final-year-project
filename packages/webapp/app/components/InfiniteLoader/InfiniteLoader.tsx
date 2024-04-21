import { useIntersection } from '@mantine/hooks';
import { useEffect } from 'react';
import { Center } from '@tma/design-system';
import { Loader } from '@mantine/core';

interface InfiniteLoaderProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  containerRef: React.MutableRefObject<HTMLElement | null>;
}
export function InfiniteLoader(props: InfiniteLoaderProps) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, containerRef } =
    props;
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const isVisible = entry?.isIntersecting;
  useEffect(() => {
    if (!isVisible || !hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [isVisible, hasNextPage, isFetchingNextPage]);

  if (!hasNextPage || isFetchingNextPage) return null;
  return (
    <Center ref={ref}>
      <Loader size="sm" />
    </Center>
  );
}
