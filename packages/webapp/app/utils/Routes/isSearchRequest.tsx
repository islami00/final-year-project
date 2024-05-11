import { type ShouldRevalidateFunctionArgs } from '@remix-run/react';
import { specialFields } from '../Form/specialFields';

export function isSearchRequest(args: ShouldRevalidateFunctionArgs) {
  const { currentUrl, nextUrl, formMethod } = args;
  const currentQ = currentUrl.searchParams.get(specialFields.q);
  const nextQ = nextUrl.searchParams.get(specialFields.q);
  const isSearchReq = formMethod === 'GET' && currentQ !== nextQ;
  return isSearchReq;
}
function isSameRoute(args: ShouldRevalidateFunctionArgs) {
  const { currentUrl, nextUrl } = args;
  return currentUrl.pathname === nextUrl.pathname;
}
export function isFilterRequest(args: ShouldRevalidateFunctionArgs) {
  const { currentUrl, nextUrl } = args;

  const currentVal = currentUrl.searchParams.get(specialFields.filter);
  const nextVal = nextUrl.searchParams.get(specialFields.filter);

  const isSearchReq = isSameRoute(args) && currentVal !== nextVal;
  return isSearchReq;
}
export function isSavedFilterRequest(args: ShouldRevalidateFunctionArgs) {
  const { currentUrl, nextUrl } = args;
  const currentVal = currentUrl.searchParams.get(specialFields.savedFilter);
  const nextVal = nextUrl.searchParams.get(specialFields.savedFilter);
  const isSearchReq = isSameRoute(args) && currentVal !== nextVal;
  return isSearchReq;
}
