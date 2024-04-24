import { P } from '../../P';
import * as classes from './NavbarLink.styles';

export function NavbarLinkEmpty() {
  return (
    <P textStyle="xs" className={classes.innerNesting}>
      No links Inside
    </P>
  );
}
