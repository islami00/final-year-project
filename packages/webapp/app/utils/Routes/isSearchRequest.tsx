import { type ShouldRevalidateFunctionArgs } from '@remix-run/react';
import { specialFields } from '../Form/specialFields';

export function isSearchRequest(args: ShouldRevalidateFunctionArgs) {
  const { currentUrl, nextUrl, formMethod } = args;
  const currentQ = currentUrl.searchParams.get(specialFields.q);
  const nextQ = nextUrl.searchParams.get(specialFields.q);
  const isSearchReq = formMethod === 'GET' && currentQ !== nextQ;
  return isSearchReq;
}
