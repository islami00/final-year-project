import type { RichTextEditorStylesNames } from '@mantine/tiptap';
import { cva } from '@tma/design-system';

const contentCss = cva({
  base: {
    '& em': {
      fontStyle: 'italic',
    },
    '& ul li': {
      listStyleType: 'disc',
    },
    '& ol li': {
      listStyleType: 'numeric',
    },
  },
});
export const teCLasses: Partial<Record<RichTextEditorStylesNames, string>> = {
  content: contentCss(),
};
