import { Button as NativeButton, IButtonProps, Heading } from 'native-base';
import React from 'react';

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {
  return (
    <NativeButton
        bg='error.700'
        h={14}
        fontSize='md'
        fontFamily='body'
        rounded='sm'
        _pressed={{ bg: 'error.500'}}
        {...rest}
    >
        <Heading color='white' fontSize='sm' >
            {title}
        </Heading>
    </NativeButton>
  );
}