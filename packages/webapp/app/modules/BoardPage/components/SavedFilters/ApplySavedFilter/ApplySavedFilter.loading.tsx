import { Skeleton } from '@mantine/core';
import * as React from 'react';

export function ApplySavedFilterLoading() {
  return (
    <>
      <Skeleton h={22} />
      <Skeleton h={42} />
      <Skeleton h={32} />
    </>
  );
}
