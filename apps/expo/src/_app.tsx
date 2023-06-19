import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TRPCProvider } from './utils/trpc'

import { HomeScreen } from './screens/home'
import { SignInSignUpScreen } from './screens/signin'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo'
import { tokenCache } from './utils/cache'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

export const App = () => {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <SignedIn>
          <Stack.Navigator>
            <TRPCProvider>
              <SafeAreaProvider>
                <Stack.Screen name="Home" component={HomeScreen} />
                <StatusBar />
              </SafeAreaProvider>
            </TRPCProvider>
          </Stack.Navigator>
        </SignedIn>
        <SignedOut>
          <SignInSignUpScreen />
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  )
}
