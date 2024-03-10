import { css, cx } from '../../../styled-system/css'
import { button } from '../../../styled-system/recipes';
import { Btn } from './nx-welcome.styles';

/*import './App.css'

function App() {
  return (
 
  )
}

 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function NxWelcome({ title }: { title: string }) {
  return (
    <>
      <h1 className={css({ fontSize: '4xl', lineHeight: '1.1' })}>
        Hello from Panda 🐼
      </h1>
      <h2 className={css({ fontSize: '2xl', my: 4, color: 'yellow.400' })}>
        module-resolution/with-outdir
      </h2>
      <div>
        <button
          className={cx(
            button(),
            css({

              bgColor: 'teal.400',
              color: 'rgba(0, 0, 0, 0.8)',
              fontWeight: 'bold',
            })
          )}
        >
          button recipe from ui-lib, with local overrides
        </button>
        <Btn>Hello</Btn>
      </div>
    </>
  );
}

export default NxWelcome;
