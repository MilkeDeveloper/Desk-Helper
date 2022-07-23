import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

import Firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export function Register() {
  const navigation = useNavigation();
  
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [desc, setDesc] = useState('');

  function RenderNewOrderRegister() {
    if(!patrimony || !desc ) {
      return Alert.alert('Solicitação', 'Preencha todos os campos');
    }

    setIsLoading(true);

    Firestore()
    .collection('orders').add({
      patrimony,
      desc,
      status: 'open',
      created_at: Firestore.FieldValue.serverTimestamp()


    })
    .then(() => {
      Alert.alert('Solicitação', 'Sua solicitação foi registrada com sucesso');
      navigation.goBack();
    })
    .catch((error => {
      console.log(error);
      setIsLoading(false)
      return Alert.alert('Solicitação', 'Não foi possível registrar sua solicitação');
    }));
  }
  
  return (
    <VStack flex={1} p={6} bg='gray.600'>
      <Header title='Nova Solicitação' />
      <Input 
        placeholder='ID do patrimonio'
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input 
        placeholder='Descrição do problema'
        flex={1}
        mt={5}
        multiline
        textAlignVertical='top'
        onChangeText={setDesc}

      />
      <Button
        title='Registrar solicitação'
        mt={5}
        onPress={RenderNewOrderRegister}
        isLoading={isLoading}
      />
    </VStack>
  );
}