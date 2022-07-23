import { Heading, VStack, Icon, useTheme, Text, HStack } from 'native-base';
import { Key, Envelope } from 'phosphor-react-native';
import React from 'react';
import { useState } from 'react';

import auth from '@react-native-firebase/auth';

import Logo from '../assets/logo_primary.svg'
import { LogoApp } from '../components/LogoApp';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
    const { colors } = useTheme();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading] = useState(false);

    function handleSignInPressed() {
        if(!email || !password) {
            return Alert.alert('Entrar', 'Informe o um email e senha válidos');
        }
        //console.log('vc está logado com: ' + email, password)
        setIsLoading(true);

        auth().signInWithEmailAndPassword(email, password)
        .catch((error => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email') {
                return Alert.alert('Entrar','Email ou senha inválidos')
            }
            if(error.code === 'auth/wrong-password') {
                return Alert.alert('Entrar','Email ou senha inválidos')
            }
            if(error.code === 'auth/user-not-found') {
                return Alert.alert('Entrar','Email ou senha inválidos')
            }

        }));
    }

    return(
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <LogoApp />
            <HStack>
                <Text color='secondary.700' fontSize='3xl' fontWeight='bold'>Desk</Text>
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
            />
            <Input 
                placeholder='Senha'
                InputLeftElement={<Icon as ={<Key color={colors.gray[300]} />} ml={4} /> }
                secureTextEntry
                onChangeText={setPassword}
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