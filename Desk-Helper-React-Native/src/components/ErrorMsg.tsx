import { Center, PresenceTransition, VStack, Text } from 'native-base';
import React from 'react';

export function ErrorMsg() {
  return (
    <VStack>
        <PresenceTransition visible={true} initial={{
                        opacity: 0,
                        scale: 0
                        }} animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {

                            friction: 5,
                            type: 'spring'
                        }
                        }}
                        >
                         
                        
                    <Center mt={-16} position='absolute' zIndex={5} w="full" h="50" bg="error.500" rounded="md">
                        <Text color='white'>
                            Email ou senha inválidos!
                        </Text>
                    </Center>
        </PresenceTransition>
    </VStack>
  );
}

export function CloseErrorMsg() {
  return(
    <VStack>
        <PresenceTransition visible={true} initial={{
                        opacity: 1,
                        scale: 1
                        }} animate={{
                        opacity: 0,
                        scale: 0,
                        transition: {
                            duration: 250,
                            type: 'spring'
                        }
                        }}
                        >
                         
                        
                    <Center mt={-16} position='absolute' zIndex={5} w="full" h="50" bg="error.500" rounded="md">
                        <Text color='white'>
                            {null}
                        </Text>
                    </Center>
                    </PresenceTransition>
    </VStack>
  )
}