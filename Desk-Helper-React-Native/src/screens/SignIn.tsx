import { Heading, VStack, Icon, useTheme, Text, HStack, Center, PresenceTransition, Box } from 'native-base';
import { Key, Envelope } from 'phosphor-react-native';
import React from 'react';
import { useState } from 'react';

import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg'
import { LogoApp } from '../components/LogoApp';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Alert } from 'react-native';
import { CloseErrorMsg, ErrorMsg } from '../components/ErrorMsg';

export function SignIn() {
    const { colors } = useTheme();

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading] = useState(false);
    const [ alertOpen, setAlertOpen] = useState(false);

    function handleSignInPressed() {
        if(!email || !password) {
            return setAlertOpen(true);
            
        }
        
        
        //console.log('vc está logado com: ' + email, password)
        setIsLoading(true);

        

        auth().signInWithEmailAndPassword(email, password)
        .catch((error => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email') {
                return setAlertOpen(true);
            }
            if(error.code === 'auth/wrong-password') {
                return setAlertOpen(true);
                    
                    

                
            }
            if(error.code === 'auth/user-not-found') {
                return setAlertOpen(true);
            }

            setAlertOpen(false);
        }));
    }

    function closeAlert() {
        setAlertOpen(false)
    }

    return(
        

        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            
            <VStack w='full' h='50' zIndex={5} alignContent='center' justifyContent='center'>
                {alertOpen ? <ErrorMsg /> : <CloseErrorMsg />}

            </VStack>

            <LogoApp />
            <HStack>
                <Text color='error.700' fontSize='3xl' fontWeight='bold'>Desk</Text>
                <Text color='gray.300' fontSize='3xl' fontWeight='bold'>Helper</Text>
            </HStack>
            
            <Heading color='gray.100' fontSize='xl' mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                placeholder='E-mail' 
                mb={4} 
                InputLeftElement={<Icon as ={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
                onChange={closeAlert}
                
                    
                
            />
            <Input 
                placeholder='Senha'
                InputLeftElement={<Icon as ={<Key color={colors.gray[300]} />} ml={4} /> }
                secureTextEntry
                onChangeText={setPassword}
                onChange={closeAlert}
                mb={8}
            />
            <Button 
                title='Entrar'
                w='full'
                onPress={handleSignInPressed}
                isLoading={isLoading}
                
            />
        </VStack>
    )
}