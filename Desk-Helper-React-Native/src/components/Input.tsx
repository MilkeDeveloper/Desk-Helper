import { Input as NBInput, IInputProps } from 'native-base';
import React from 'react';

export function Input({ ...rest}: IInputProps) {
  return (
    <NBInput 
        bg='gray.700'
        h={14}
        size='md'
        borderWidth={0}
        fontSize='md'
        fontFamily='body'
        color='white'
        placeholderTextColor='gray.300'
        _focus={{
            borderWidth: 1,
            borderColor: "gray.300",
            bg: "gray.700"
        }} 
        {...rest}
    />

    
  );
}