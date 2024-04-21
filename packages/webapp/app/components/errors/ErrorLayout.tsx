import { Center } from '@tma/design-system';

export interface ErrorLayoutProps {
  children: React.ReactNode;
}

export function ErrorLayout(props: ErrorLayoutProps) {
  const { children } = props;
  return (
    <Center textStyle="smSemiBold" w="100%" h="100%">
      {children}
    </Center>
  );
}
