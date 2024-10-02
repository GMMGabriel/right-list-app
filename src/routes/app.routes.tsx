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
        }}
      >
        <Stack.Screen
          name='(drawer)'
          options={{
            title: 'Lista'
          }}
        />
        <Stack.Screen
          name='newProduct'
          options={{
            title: 'Novo produto'
          }}
        />
      </Stack>
    </>
  )
}