import { Icon } from '../Icon/Icon';

interface PriorityFlagProps {
  color: string;
}
export function PriorityFlag(props: PriorityFlagProps) {
  const { color } = props;
  return (
    <Icon name="IconFlagFilled" size="s16" strokeSize="s24" color={color} />
  );
}
