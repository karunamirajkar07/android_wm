import { router } from 'expo-router'
import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function login() {
  return (
    <SafeAreaView>

        <Text style={{color:"white"}}>Hello Washing</Text>
        <Button title='Login' onPress={()=>{router.push("/newtab")}}/>
    </SafeAreaView>
    )
}
