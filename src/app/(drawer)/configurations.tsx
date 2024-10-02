import { Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/styles/colors';
import { MyStorage } from '@/hooks/useAsyncStorage';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';

export default function ConfigurationsPage() {
  const { colorScheme, setColorScheme } = useColorScheme()
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark' | undefined>(colorScheme)

  function handleSetTheme(theme: 'light' | 'dark') {
    setActiveTheme(theme)
    const storage = new MyStorage()
    storage.setItem('theme', theme)
    setColorScheme(theme)
  }

  return (
    <View className='flex-1 bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark'>
      {/* <Text className='text-3xl font-bold text-tint-light dark:text-tint-dark'>Configurações</Text> */}
      <View className='gap-4 p-4'>
        <Text className='text-xl text-tint-light dark:text-tint-dark'>Tema</Text>
        <View className='gap-2'>
          <TouchableOpacity
            className={`flex flex-row p-4 items-center gap-4 border-4 rounded-lg ${activeTheme === 'light' ? 'border-theme bg-theme/15' : 'border-withoutHighlight-light dark:border-withoutHighlight-dark'}`}
            onPress={() => handleSetTheme('light')}
          >
            <Feather
              name='sun'
              color={activeTheme === 'light' ? colors.theme.DEFAULT : colorScheme === 'dark' ? colors.withoutHighlight.dark : colors.withoutHighlight.light}
              size={32}
            />
            <Text
              className={activeTheme === 'light' ? 'text-theme' : 'text-withoutHighlight-light dark:text-withoutHighlight-dark'}
            >
              Claro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex flex-row p-4 items-center gap-4 border-4 rounded-lg ${activeTheme === 'dark' ? 'border-theme bg-theme/15' : 'border-withoutHighlight-light dark:border-withoutHighlight-dark'}`}
            onPress={() => handleSetTheme('dark')}
          >
            <Feather
              name='moon'
              color={activeTheme === 'dark' ? colors.theme.DEFAULT : colorScheme === 'dark' ? colors.withoutHighlight.dark : colors.withoutHighlight.light}
              size={32}
            />
            <Text
              className={activeTheme === 'dark' ? 'text-theme' : 'text-withoutHighlight-light dark:text-withoutHighlight-dark'}
            >
              Escuro
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}