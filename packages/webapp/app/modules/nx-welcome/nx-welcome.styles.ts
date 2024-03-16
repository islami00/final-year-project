// Previously working:
// import { css} from '../../../styled-system/css';
// import { styled } from '../../../styled-system/jsx';
// import { button } from '../../../styled-system/recipes';

// export const Btn = css( {

//   backgroundColor: "orange",
//   width: 100,
//   height: 250

// });

// export const Bt2 = styled('div', button);

// // export const Btn = css`

// //   background-color: {primary};
// //   width: 100px;
// //   height: 250px;

// // `;

// // export const Bt2 = styled.div`
// // background-color: red;
// // `;

import { css } from '@tma/design-system/css';
import { styled } from '@tma/design-system/jsx';

export const Btn = css({
  backgroundColor: 'pink',
  width: 100,
  height: 250,
  color: "blue"
});

export const Bt2 = styled('div', {
  base: {
    background: "orange.500",
    width:500,
    height:500
  }
});

