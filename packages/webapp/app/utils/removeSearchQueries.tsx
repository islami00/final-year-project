import {
  matchQuery,
  type QueryClient,
  type QueryKey,
} from '@tanstack/react-query';

export function removeSearchQueries(
  queryClient: QueryClient,
  queryKeys: QueryKey[]
) {
  queryClient.removeQueries({
    predicate: (query) => {
      const matched = queryKeys.some((queryKey) =>
        matchQuery(
          {
            queryKey,
          },
          query
        )
      );
      return matched;
    },
    type: 'inactive',
  });
}
