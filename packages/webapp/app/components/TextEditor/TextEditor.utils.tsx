import { Link } from '@mantine/tiptap';
import { useEditor, JSONContent } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';

interface UseTextEditorArgs {
  placeholder: string | undefined;
  content: JSONContent | null;
}

export function useTextEditor(args: UseTextEditorArgs) {
  const { placeholder, content } = args;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
  });
  return editor;
}
