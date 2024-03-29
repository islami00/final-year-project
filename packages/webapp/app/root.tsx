import mantineCssUrl from '@mantine/core/styles.css?url';
import pandaCssUrl from './styles/panda.css?url';
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
import { mantineThemeOverride } from '@tma/design-system';

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
    { rel: 'stylesheet', href: mantineCssUrl },
    { rel: 'stylesheet', href: pandaCssUrl },
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
        <MantineProvider theme={mantineThemeOverride} defaultColorScheme="dark">
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
