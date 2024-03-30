// Todo: Better 404 page.

export async function clientLoader() {
  throw new Response('Not found', { status: 404 });
}

export function ErrorBoundary() {
  return <div>Oops! Looks like we couldn't find what you were looking for</div>;
}
