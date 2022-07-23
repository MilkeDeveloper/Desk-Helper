import { HStack, Text } from 'native-base';
import React from 'react';

import Logo from '../assets/logo_secondary.svg';

export function LogoApp() {
  return (
    <HStack alignItems='center'>
        <Logo />
        
    </HStack>
  );
}