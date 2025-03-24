import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from './ui/button'

export default function NavTabs() {
  return (
    <View className='flex-row p-1 border-[1px] border-foreground w-auto justify-between rounded-xl'>
      <Button variant={'ghost'}>
        <Text className='text-foreground font-BaiJamjureeRegular'>Following</Text>
      </Button>
      <Button variant={'ghost'}>
        <Text className='text-foreground font-BaiJamjureeRegular'>Recommended</Text>
      </Button>
      <Button variant={'ghost'}>
        <Text className='text-foreground font-BaiJamjureeRegular'>Promos</Text>
      </Button>
    </View>
  )
}

