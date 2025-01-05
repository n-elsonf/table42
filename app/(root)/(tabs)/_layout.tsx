import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'


const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => (
  <View className='flex-1 mt-3 flex felx-col items-center'>
    <Image tintColor={focused ? '#FF4B1B' : '#666876'} resizeMode='contain' className='size-6' source={icon} />
    <Text className={`${focused ? 'text-primary-300 font-rubik-medium' : 'text-black-200 font-rubik'} text-xs w-full text-center mt-1`}>
      {title}
    </Text>
  </View>
)

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: 'white',
        position: 'absolute',
        borderTopColor: "#FF4B1B1A",
        borderTopWidth: 1,
        minHeight: 70,
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" />
          )
        }} />

      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.chat} title="Messages" />
          )
        }} />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          )
        }} />
    </Tabs>
  )
}

export default TabsLayout