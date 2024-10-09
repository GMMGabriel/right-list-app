import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { useColorScheme } from 'nativewind'
import { Feather } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

export function ButtonThemeConfiguration(
  { theme, ...rest }: { theme: 'light' | 'dark' } & TouchableOpacityProps
) {
  const { colorScheme } = useColorScheme()

  return (
    <TouchableOpacity
      className={`flex flex-row p-4 items-center gap-4 border-4 rounded-lg ${colorScheme === theme ? 'border-theme bg-theme/15' : 'border-withoutHighlight-light dark:border-withoutHighlight-dark'}`}
      activeOpacity={.7}
      {...rest}
    >
      <Feather
        name={theme === 'light' ? 'sun' : 'moon'}
        color={colorScheme === theme ? colors.theme.DEFAULT : colorScheme === 'dark' ? colors.withoutHighlight.dark : colors.withoutHighlight.light}
        size={32}
      />
      <Text
        className={colorScheme === theme ? 'text-theme' : 'text-withoutHighlight-light dark:text-withoutHighlight-dark'}
      >
        {theme === 'light' ? 'Claro' : 'Escuro'}
      </Text>
    </TouchableOpacity>
  )
}