import { colors } from '@/styles/colors'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'

export default function AppRoutes() {
  const { colorScheme } = useColorScheme()

  return (
    <>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'ios',
          navigationBarColor: colorScheme === 'dark' ? colors.backgroundSecondary.dark : colors.backgroundSecondary.light
          // navigationBarColor: 'blue'
        }}
      >
        <Stack.Screen
          name='(drawer)'
          options={{
            title: 'Lista'
          }}
        />
        <Stack.Screen
          name='newProduct/[id]'
          options={{
            title: 'Novo produto',
            navigationBarColor: colorScheme === 'dark' ? colors.backgroundPrimary.dark : colors.backgroundPrimary.light
          }}
        />
      </Stack>
    </>
  )
}