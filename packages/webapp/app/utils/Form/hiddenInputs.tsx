import { getInputProps, type FieldMetadata } from '@conform-to/react';

interface FieldDef {
  // Can't make schema generic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldMetadata<unknown, Record<string, any>>;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
}
export function hiddenInputs(defs: FieldDef[]) {
  return defs.map((each, idx) => {
    const { field, value } = each;
    const inputProps = getInputProps(field, {
      type: 'hidden',
      value: !value,
    });

    return <input value={value} {...inputProps} key={field.key || idx} />;
  });
}
