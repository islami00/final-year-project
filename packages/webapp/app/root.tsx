import '@mantine/core/styles.css';
import './styles/panda.css';
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
import { theme } from './styles/theme';
import { WatchState } from './modules/Auth/components/WatchState/WatchState';

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'New Remix App',
    viewport: 'width=device-width,initial-scale=1',
  },
];
export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
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
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Paper w="100dvw" h="100dvh" bg="dark">
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
