# Welcome to Nx + Remix!

- [Remix Docs](https://remix.run/docs)
- [Nx Docs](https://nx.dev)

## Development

From your terminal:

```sh
npx nx dev webapp
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npx nx build webapp
```

Then run the app in production mode:

```sh
npx nx start webapp
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `packages/webapp/build/`
- `packages/webapp/public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

### SVGs

- I use [svgr](https://react-svgr.com/docs/remix/) to generate jsx from svgs, and a custom svg component to access them via text.

### Possible errors

#### `File '{workspaceRoot}/packages/design-system/src/*' not found.`

Full error:

```console
File '{workspaceRoot}/packages/design-system/src/*' not found.
  The file is in the program because:
    Root file specified for compilation
```

Possible reasons for this error: [Typescript#46432](https://github.com/microsoft/TypeScript/issues/46432#issuecomment-1419568874). Tldr; It happens whenever you rename something.


### Auto complete of @mantine/core doesn't work

- It's a dependency of tma/design-system, so vscode won't include it