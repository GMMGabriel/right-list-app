import { Drawer } from 'expo-router/drawer'
import { useColorScheme } from 'nativewind'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import {
  Feather,
  Octicons,
  FontAwesome,
  FontAwesome5
} from '@expo/vector-icons'

import { colors } from '@/styles/colors'
import { Text } from 'react-native'
import { HeaderListPage } from '@/components/headerListPage'

export default function AppRoutes() {
  const { colorScheme } = useColorScheme()

  const backgroundSecondaryColor = colorScheme === 'dark' ? colors.backgroundSecondary.dark : colors.backgroundSecondary.light
  const backgroundTertiaryColor = colorScheme === 'dark' ? colors.backgroundTertiary.dark : colors.backgroundTertiary.light
  const tintColor = colorScheme === 'dark' ? colors.tint.dark : colors.tint.light

  return (
    <>
      <GestureHandlerRootView>
        <Drawer
          screenOptions={{
            title: '',
            headerStyle: {
              backgroundColor: backgroundSecondaryColor,
              shadowColor: 'transparent',
            },
            headerTintColor: tintColor,
            drawerContentStyle: {
              backgroundColor: backgroundTertiaryColor,
              borderRightWidth: 1,
              borderRightColor: '#666666',
            },
            drawerActiveTintColor: colors.theme.DEFAULT,
            drawerInactiveTintColor: tintColor,
            headerRight: () => <HeaderListPage />
          }}
        >
          <Drawer.Screen
            name='index'
            options={{
              drawerLabel: 'Lista',
              drawerIcon: ({ color, size }) =>
                <Feather
                  name="list"
                  size={size}
                  color={color}
                />,
            }}
          />
          <Drawer.Screen
            name='history'
            options={{
              drawerLabel: 'Histórico',
              title: 'Histórico',
              headerTitleAlign: 'center',
              drawerIcon: ({ color, size }) =>
                <FontAwesome5
                  name="history"
                  size={size-1}
                  color={color}
                />,
            }}
          />
          <Drawer.Screen
            name='drafts'
            options={{
              drawerLabel: 'Rascunhos',
              title: 'Rascunhos',
              headerTitleAlign: 'center',
              drawerIcon: ({ color, size }) =>
                <FontAwesome
                  name="pencil-square-o"
                  size={size}
                  color={color}
                />,
            }}
          />
          <Drawer.Screen
            name='configurations'
            options={{
              drawerLabel: 'Configurações',
              title: 'Configurações',
              headerTitleAlign: 'center',
              drawerIcon: ({ color, size }) =>
                <Octicons
                  name="gear"
                  size={size}
                  color={color}
                />,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  )
}