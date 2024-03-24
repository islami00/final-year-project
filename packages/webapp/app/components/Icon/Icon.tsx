/**
 * @file If the import of `icons/name` has an error, Run the build-icons script.
 * */
import { cx } from '@tma/design-system';
import { forwardRef, type SVGProps } from 'react';
import * as LocalIcons from './icons';

import { IconSize, sizeRecipe } from './Icon.styles';

import { IconProps as TableIconProps, icons } from '@tabler/icons-react';

type TablerIcons = keyof typeof icons;
type LocalIconOptions = keyof typeof LocalIcons;

export type IconName = LocalIconOptions | TablerIcons;

export interface IconProps {
  name?: IconName;
  /** Default size is s16, set to null to remove size styling */
  size?: IconSize;
}
type IconComponent = React.ForwardRefExoticComponent<TableIconProps>;
/**
 * Renders an SVG icon. The icon defaults to the size of the font.
 * Alternatively, if you're not ok with the icon being to the left of the text,
 * you need to wrap the icon and text in a common parent and set the parent to
 * display "flex" (or "inline-flex") with "items-center" and a reasonable gap.
 */
export const Icon = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement> & IconProps
>(({ name, size = 's16', className, ...props }, ref) => {
  const parsedSize = size || undefined;

  const IconComp = name ? icons[name as TablerIcons] : null;
  const CustomIcon = name ? LocalIcons[name as LocalIconOptions] : null;
  const Comp = (IconComp || CustomIcon || 'svg') as IconComponent | 'svg';

  return (
    <Comp
      {...props}
      ref={ref}
      className={cx(sizeRecipe({ size: parsedSize }), className)}
    />
  );
});
