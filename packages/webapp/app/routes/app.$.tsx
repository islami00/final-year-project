// Todo: better 404 page for app
export async function clientLoader() {
  throw new Response('Not found', { status: 404 });
}

export function ErrorBoundary() {
  return <div>404, not found!</div>;
}
