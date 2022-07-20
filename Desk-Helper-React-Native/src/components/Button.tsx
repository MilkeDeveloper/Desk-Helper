import { Button as NativeButton, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <NativeButton
        bg='green.700'
        h={14}
        fontSize='md'
        fontFamily='body'
        rounded='sm'
        _pressed={{ bg: 'green.500'}}
        {...rest}
    >
        <Heading color='white' fontSize='sm' >
            {title}
        </Heading>
    </NativeButton>
  );
}