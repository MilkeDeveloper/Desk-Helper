import { VStack, HStack, Text, Box, useTheme, PresenceTransition } from 'native-base';
import { IconProps } from 'phosphor-react-native';
import { ReactNode } from 'react';
import React from 'react';

type Props = {
    title: string;
    desc?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
}

export function CardDetails({ title, desc, footer = null, icon: Icon, children }: Props) {
    const { colors } = useTheme();

    return (
    <VStack mt={5} bg='gray.600' p={5} rounded='sm'>
        
        <HStack alignItems='center' mb={4}>
            <Icon color={colors.green[300]} />
            <Text ml={2} color='gray.100' fontSize='sm' textTransform='uppercase'>
                {title}
            </Text>
        </HStack>
        {
            !!desc &&
            <Text color='gray.100' fontSize='md'>
                {desc}
            </Text>
        }

        {children}

        {
            !!footer &&
            <Box borderTopWidth={1} borderTopColor='gray.400' mt={3} >
                <Text mt={3} color='gray.300' fontSize='sm' >
                    {footer}
                </Text>
            </Box>
        }

    </VStack>
  );
}