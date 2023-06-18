import React from 'react'

import { Button, Text, View } from 'react-native'
import { useAuth } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignOut = () => {
  const { signOut } = useAuth()
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut()
        }}
      />
    </View>
  )
}

export const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-5xl font-bold text-black">
          twoned
        </Text>
        <SignOut />
      </View>
    </SafeAreaView>
  )
}
