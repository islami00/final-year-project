import { type SVGProps } from 'react';
// @ts-expect-error The icon may not exist, but it's fine as it's the type
import { type IconName } from './icons/name';
import href from './icons/sprite.svg';
import { cva, cx, type RecipeVariant } from '@tma/design-system';
import { rem } from '@mantine/core';

export { href };

export { IconName };

const sizeRecipe = cva({
  base: { display: 'inline', alignSelf: 'center' },
  variants: {
    size: {
      s16: { width: rem(16), height: rem(16) },
      s24: { width: rem(24), height: rem(24) },
    },
  },
});
const gapRecipe = cva({
  base: { gap: '3xs', display: 'inline-flex', alignItems: 'center' },
});

type Size = RecipeVariant<typeof sizeRecipe>['size'] | null;

interface IconProps {
  name: IconName;
  /** Default size is s16, set to null to remove size styling */
  size?: Size;
}

/**
 * Renders an SVG icon. The icon defaults to the size of the font. To make it
 * align vertically with neighboring text, you can pass the text as a child of
 * the icon and it will be automatically aligned.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export function Icon({
  name,
  size = 's16',
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & IconProps) {
  const parsedSize = size || undefined;
  if (children) {
    return (
      <span className={gapRecipe({ size: parsedSize })}>
        <Icon name={name} size={size} className={className} {...props} />
        {children}
      </span>
    );
  }
  return (
    <svg {...props} className={cx(sizeRecipe({ size: parsedSize }), className)}>
      <use href={`${href}#${name}`} />
    </svg>
  );
}
