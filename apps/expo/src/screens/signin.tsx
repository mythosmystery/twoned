import React from 'react'

import { View, SafeAreaView } from 'react-native'

import SignInWithSpotify from '../components/SignInWithOSpotify'

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <SignInWithSpotify />
      </View>
    </SafeAreaView>
  )
}
