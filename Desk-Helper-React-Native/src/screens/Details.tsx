import { VStack,Text, HStack, useTheme, ScrollView, Box, PresenceTransition } from 'native-base';
import { Header } from '../components/Header';

import Firestore from '@react-native-firebase/firestore';

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { OrderProps } from '../components/Order';
import { OrderFirestoreDTO } from '../DataTransferObject/OrderDTO';
import { dateFormat } from '../utils/FirestoreDateFormat';
import { Loading } from '../components/Loading';
import { CircleWavyCheck, DesktopTower, Hourglass, ClipboardText } from 'phosphor-react-native';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';


type RouteParams ={
    orderId: string;
}

type OrderDetails = OrderProps & {
    desc: string;
    solution: string;
    closed: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(true);
    const [solution, setSolution] = useState('');
    const [order, setOrder] =useState<OrderDetails>({} as OrderDetails);
    
    const navigation = useNavigation();
    const route = useRoute();
    const { colors } = useTheme();
    const { orderId } = route.params as RouteParams;

    function handleOrderClose() {
        if(!solution) {
            return Alert.alert('Solicitação', 'Preencha o campo com a solução do problema')
        }

        Firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .update({
            status: 'closed',
            solution,
            closed_at: Firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert('Solicitação', 'Solicitação encerrada');
            navigation.goBack();
        })
        .catch((error) => {
            console.log(error);
            Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação')
        })
    }

    useEffect(() => {

        Firestore()
        .collection<OrderFirestoreDTO>('orders')
        .doc(orderId)
        .get()
        .then((doc) => {
            const { patrimony, desc, status, created_at, closed_at, solution} = doc.data();
            
            const closed = closed_at ? dateFormat(closed_at) : null;
            
            setOrder({
                id: doc.id,
                patrimony,
                desc,
                status,
                solution,
                when: dateFormat(created_at),
                closed
            });
            
            setIsLoading(false)
        })

    }, []);

    if(isLoading) {
        return <Loading />
    }

    return (
    <VStack flex={1} bg='gray.700'>
        <Box px={6} bg='gray.600'>
            <Header title='Detalhes da Solicitação' />
        </Box>

        <HStack bg='gray.500' justifyContent='center' p={4} >
            {
                order.status === 'closed'
                ? <CircleWavyCheck size={22} color={colors.green[500]}/>
                : <Hourglass size={22} color={colors.secondary[700]}/>
            }
            <Text 
                fontSize='sm'
                color={order.status === 'closed'
                ? colors.green[500]
                : colors.secondary[700]
                }
                ml={2}
                textTransform='uppercase'
            >
                {order.status === 'closed'
                    ? 'finalizada'
                    : 'em andamento'
                }
            </Text>
        </HStack>
        
        <ScrollView mx={5} showsVerticalScrollIndicator={false} >
        <PresenceTransition visible={true} initial={{
                        opacity: 0,
                        scale: 1,
                        translateY: -25
                        }} animate={{
                        opacity: 1,
                        scale: 1,
                        translateY: 0,
                        transition: {
                            duration: 500,
                            bounciness: 1.5,
                            delay: 150,
                            type: 'timing'
                        }
                        }}
                        >
            <CardDetails
                title='equipamento'
                desc={`Patrimonio ${order.patrimony}`}
                icon={ DesktopTower }
                
            />

            <CardDetails
                title='descrição  do problema'
                desc={order.desc}
                icon={ClipboardText}
                footer={`Registrado em ${order.when}`}
                
            />

            <CardDetails
                title='solução'
                icon={CircleWavyCheck}
                footer={order.closed && `Encerrado em ${order.closed}`}
                desc={order.solution}
            >
                {order.status === 'open' && <Input
                    placeholder='Descrição da solução'
                    onChangeText={setSolution}
                    h={24}
                    textAlignVertical='top'
                    multiline
                
                    />
                }
            </CardDetails> 
            </PresenceTransition>
        </ScrollView>
        {
            order.status === 'open' &&
            <Button 
                title='Encerrar Solicitação'
                m={5}
                onPress={handleOrderClose}
            />
            
        }
    </VStack>
  );
}