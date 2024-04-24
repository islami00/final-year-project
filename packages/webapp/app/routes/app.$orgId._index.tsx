import { useRouteLoaderDataOrThrow } from '../hooks/useRouteLoaderDataOrThrow';
import { Home } from '../modules/Home/Home';
import { AppLoader } from './app.$orgId/types';
import { routeConfig } from '../utils/routeConfig';

export default function AppOrgIdIndex() {
  const { currentOrganisation } = useRouteLoaderDataOrThrow<AppLoader>(
    routeConfig.org.routeId
  );
  return (
    <Home
      message={`Welcome to ${currentOrganisation.name}!`}
      description="Select a department or board from the side bar."
    />
  );
}
