import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
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
