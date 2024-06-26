import NiceModal from '@ebay/nice-modal-react';
import { useLocation } from '@remix-run/react';
import { useContext, useEffect } from 'react';

// Thanks https://github.com/eBay/nice-modal-react/issues/143#issuecomment-1928687042
/**
 * Auto-closes global modals. Reasons this is fine:
 * - One of the main ways a modal can be unmounted without closing is by a url change
 * - Global modals should not be connected to the URL as the URl is a global state manager
 * - Thus, auto-closing these when the route changes is valid ux.
 */
export function useAutoCloseModals() {
  const location = useLocation();

  const niceModalContext = useContext(NiceModal.NiceModalContext);

  useEffect(() => {
    Object.keys(niceModalContext).forEach((key) => {
      NiceModal.remove(key);
    });
  }, [location.pathname, location.search]);
}
