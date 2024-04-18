import { Skeleton } from '@mantine/core';

export function BoardListLoading() {
  return (
    <>
      <Skeleton w="300px" h="100px" />
      <Skeleton w="300px" h="100px" />
      <Skeleton w="300px" h="100px" />
    </>
  );
}
