import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#14cee6cc",
        headerStyle: {
          backgroundColor: 'black',
        },
        headerShadowVisible: false,
        headerTintColor: "#14cee6cc",
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'videocam-sharp' : 'videocam-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid-sharp' : 'grid-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
