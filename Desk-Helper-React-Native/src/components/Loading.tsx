import { Center, Heading, Spinner, VStack } from 'native-base'
import React from 'react'

export function Loading() {
    return(
        <Center flex={1} bg='gray.700'>
            <VStack space={4} alignItems='center'>
                <Spinner color='error.700'/>
                <Heading color="gray.200" fontSize="md">
                    Carregando...
                </Heading>
            </VStack>
            
        </Center>
    )
}