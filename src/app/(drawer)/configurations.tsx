import { Text, View } from 'react-native'
import { useColorScheme } from 'nativewind'

import { MyStorage } from '@/hooks/useAsyncStorage'

import { ButtonThemeConfiguration } from '@/components/buttonThemeConfiguration'

export default function ConfigurationsPage() {
  const { setColorScheme } = useColorScheme()
  const storage = new MyStorage()

  function handleSetTheme(theme: 'light' | 'dark') {
    storage.setItem('theme', theme)
    setColorScheme(theme)
  }

  return (
    <View className='flex-1 bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark'>
      {/* <Text className='text-3xl font-bold text-tint-light dark:text-tint-dark'>Configurações</Text> */}
      <View className='gap-4 p-4'>
        <Text className='text-xl text-tint-light dark:text-tint-dark'>Tema</Text>
        <View className='gap-2'>
          <ButtonThemeConfiguration
            theme='light'
            onPress={() => handleSetTheme('light')}
          />

          <ButtonThemeConfiguration
            theme='dark'
            onPress={() => handleSetTheme('dark')}
          />
        </View>
      </View>
    </View>
  );
}