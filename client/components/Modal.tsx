import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { AlertTriangle } from 'lucide-react-native'
import { BlurView } from 'expo-blur';
import { Button } from './ui/button';

export default function Modal(){
  return (
    <View className='absolute w-full h-[20vh] bg-black'>
        <Alert icon={AlertTriangle} variant='default' className='max-w-xl'>
            <AlertTitle>Danger!</AlertTitle>
            <AlertDescription>
            High voltage. Do not touch. Risk of electric shock. Keep away from children.
            </AlertDescription>
            <Button>
                <Text className='text-background'>pp</Text>
            </Button>
        </Alert>
    </View>
  )
}




