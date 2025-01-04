import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import images from '@/constants/images'
import icons from '@/constants/icons'

const SignIn = () => {

  const handleLogin = () => { };
  return (
    <SafeAreaView className="bg-white h-full border-solid">
      <ScrollView contentContainerClassName='h-full'>
        <Image source={images.onboarding2} className="w-full h-4/6 bg-white" resizeMode="contain" />

        <View className='px-10'>
          <Text className='top-[-20] text-5xl text-center uppercase font-rubik-extrabold text-primary-300'>table42</Text>
          <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>Where you can get a {"\n"}
            <Text className='text-primary-300'>table for two.</Text>
          </Text>

          {/* <Text className='text-lg font-rubik text-black-200 text-center mt-12'>Login to table42 with Google</Text> */}

          <TouchableOpacity onPress={handleLogin} className=' top-5 bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
              <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn