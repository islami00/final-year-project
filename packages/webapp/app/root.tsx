import pandaCssUrl from './styles/panda.css?url';
import mantineCssUrl from '@mantine/core/styles.layer.css?url';
import mantineTiptapCssUrl from '@mantine/tiptap/styles.layer.css?url';
import { Toaster } from 'react-hot-toast';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { MantineProvider, ColorSchemeScript, Paper } from '@mantine/core';
import { WatchAuthState } from './modules/Auth/components/WatchAuthState/WatchAuthState';
import { appThemeOverride } from './styles/mantine/appThemeOverride';
import fontStyleSheetUrl from '@fontsource-variable/open-sans/index.css?url';
import NiceModal from '@ebay/nice-modal-react';
import { AutoCloseModals } from './components/AutoCloseModals/AutoCloseModals';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'TMA',
    viewport: 'width=device-width,initial-scale=1',
  },
];
export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: pandaCssUrl },
  { rel: 'stylesheet', href: mantineCssUrl },
  { rel: 'stylesheet', href: mantineTiptapCssUrl },
  { rel: 'preload', href: fontStyleSheetUrl, as: 'style' },
  { rel: 'stylesheet', href: fontStyleSheetUrl },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={appThemeOverride} defaultColorScheme="dark">
            <NiceModal.Provider>
              <Paper w="100dvw" h="100dvh" bg="dark.8">
                <Outlet />
              </Paper>
              <ScrollRestoration />
              <Scripts />
              <WatchAuthState />
              <AutoCloseModals />
              <Toaster />
            </NiceModal.Provider>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
