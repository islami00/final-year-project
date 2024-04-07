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
import { WatchState } from './modules/Auth/components/WatchState/WatchState';
import { appThemeOverride } from './styles/mantine/appThemeOverride';
import fontStyleSheetUrl from '@fontsource-variable/open-sans/index.css?url';

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'TMA',
    viewport: 'width=device-width,initial-scale=1',
  },
];
export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
    { rel: 'stylesheet', href: pandaCssUrl },
    { rel: 'stylesheet', href: mantineCssUrl },
    { rel: 'stylesheet', href: mantineTiptapCssUrl },
    { rel: 'preload', href: fontStyleSheetUrl, as: 'style' },
    { rel: 'stylesheet', href: fontStyleSheetUrl },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={appThemeOverride} defaultColorScheme="dark">
          <Paper w="100dvw" h="100dvh" bg="dark.8">
            <Outlet />
          </Paper>
          <ScrollRestoration />
          <Scripts />
          <WatchState />
          <Toaster />
        </MantineProvider>
      </body>
    </html>
  );
}
