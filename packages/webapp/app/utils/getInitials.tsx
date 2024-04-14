/**
 *
 * @param name
 * @description Get intials of a name. Thanks https://stackoverflow.com/a/33076482/16071410
 */
export function getInitials(name: string) {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  const initials = [...name.matchAll(rgx)];

  const first = initials.shift()?.[1] || '';
  const last = initials.pop()?.[1] || '';
  const result = (first + last).toUpperCase();
  return result;
}
