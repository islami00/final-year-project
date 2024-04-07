import { Button } from '@mantine/core';
import type { JSONContent } from '@tiptap/react';
import noop from 'lodash/fp/noop';
import { TextEditor } from '../../../../../components/TextEditor/TextEditor';
import * as classes from './DescriptionSection.styles';

interface DescriptionSectionProps {
  defaultValue: JSONContent | null;
}
export function DescriptionSection(props: DescriptionSectionProps) {
  const { defaultValue } = props;
  return (
    <div className={classes.descriptionInputAndButton}>
      <TextEditor
        content={defaultValue}
        onChange={noop}
        placeholder="Add a description"
      />
      <div className={classes.descriptionButtons}>
        <Button size="xs">Save</Button>
        <Button size="xs" variant="subtle" color="white">
          Cancel
        </Button>
      </div>
    </div>
  );
}
