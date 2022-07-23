import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { AppRoutes } from './app.routes';
import { SignIn } from '../screens/SignIn';
import React, { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';

export function Routes() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] =useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const isAuthenticated = auth()
            .onAuthStateChanged(response => {
                setUser(response);
                setIsLoading(false);
            });

        return isAuthenticated;
    }, []);

    if(isLoading) {
        return <Loading />
    }

    return(
        <NavigationContainer>
           {user ? <AppRoutes /> : <SignIn /> }
        </NavigationContainer>
    )
}