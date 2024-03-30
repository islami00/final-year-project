/**
 * @file If the import of `icons` has an error, restart the dev server, or re-run build-icons
 * */
import { cx } from '@tma/design-system';
import { forwardRef, type SVGProps } from 'react';
import * as LocalIcons from './icons';

import { IconSize, sizeRecipe } from './Icon.styles';

import type { IconProps as TableIconProps } from '@tabler/icons-react';
import * as TablerIcons from './TablerIcons';

type TablerIconNames = keyof typeof TablerIcons;
type LocalIconOptions = keyof typeof LocalIcons;

export type IconName = LocalIconOptions | TablerIconNames;
type IconComponent = React.ForwardRefExoticComponent<TableIconProps>;

export interface IconProps {
  name?: IconName;
  /** Default size is s16, set to null to remove size styling */
  size?: IconSize;
  strokeSize?: IconSize;
}
/**
 * Renders an SVG icon. The icon defaults to the size of the font.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export const Icon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & IconProps
>(({ name, size = 'font', strokeSize = size, className, ...props }, ref) => {
  const parsedSize = size || undefined;
  const parsedStrSize = strokeSize || undefined;

  const IconComp = name ? TablerIcons[name as TablerIconNames] : null;
  const CustomIcon = name ? LocalIcons[name as LocalIconOptions] : null;
  const Comp = (IconComp || CustomIcon || 'svg') as IconComponent | 'svg';

  return (
    <Comp
      {...props}
      ref={ref}
      className={cx(
        sizeRecipe({ size: parsedSize, strokeWidth: parsedStrSize }),
        className
      )}
    />
  );
});
