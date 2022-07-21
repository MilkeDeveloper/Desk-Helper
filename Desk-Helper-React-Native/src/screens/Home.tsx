import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button'

export function Home() {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const [statusSelected, setStatusSelected] = useState< 'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderProps[]>([
    {
      id: '21314323',
      patrimony: '12312453',
      when: '16/07/2022 as 15:00',
      status: 'open'


    },

]);

  function handleNewOrder() {
    navigation.navigate('new');
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleLogOut() {
    
  }

  return (
    <VStack flex={1} pb={6} bg='gray.700'>
      <HStack
        w='full'
        justifyContent='space-between'
        alignItems='center'
        bg='gray.600'
        pt={12}
        pb={5}
        px={6}
      >
        <HStack alignItems='center'>
          <Logo />
          <Text color='purple.600' fontSize='xl' fontWeight='bold'>Desk</Text>
          <Text color='green.500' fontSize='xl' fontWeight='bold'>Helper</Text>
        </HStack>
        

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
        >

        </IconButton>

      </HStack>
      <VStack flex={1} px={6}>
        <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
          <Heading color='gray.100'>
            Solicitações
          </Heading>
          
          <Text color='gray.200'>
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8} >
          <Filter 
            type='open'
            title='em andamento'
            onPress={() => setStatusSelected('open')}
            isActive={statusSelected === 'open'}
          />
          <Filter 
            type='closed'
            title='finalizados'
            onPress={() => setStatusSelected('closed')}
            isActive={statusSelected === 'closed'}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color='gray.300' fontSize='xl' mt={6} textAlign='center'>
                Voce ainda não possui { '\n' }
                solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas' }  
              </Text>
            </Center>
          )}

        />

        <Button title='Nova Solicitação' onPress={handleNewOrder}/>
      </VStack>
      
      

    </VStack>
  );
}