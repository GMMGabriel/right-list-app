import { useState } from 'react'
import { Alert, Switch, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ButtonIcon } from './buttonIcon'

import { colors } from '@/styles/colors'

export function HeaderListPage() {
  const [modeList, setModeList] = useState<boolean>(false)

  // console.log('screen.width:', Dimensions.get('screen').width)

  function handleUpdateModeList() {
    setModeList(state => !state)
  }

  return (
    <View className="pr-4 flex-row gap-4 items-center">
      <TouchableOpacity
        className="flex flex-row gap-2 items-center"
        activeOpacity={1}
        onPress={handleUpdateModeList}
      >
        <Text className='text-xs text-tint-light dark:text-tint-dark'>
          Modo rascunho
        </Text>
        <Switch
          aria-label='switch'
          aria-labelledby='listModeSwitch'
          value={modeList}
          onChange={handleUpdateModeList}
          thumbColor={colors.theme.DEFAULT}
          trackColor={{
            true: colors.theme['800'],
            false: '#7777775f'
          }}
        />
      </TouchableOpacity>

      <ButtonIcon
        onPress={() => Alert.alert(
          'Atenção',
          'Deseja limpar a lista permanentemente?',
          [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', style: 'destructive' },
          ],
          {
            cancelable: true,
            userInterfaceStyle: 'dark',
          }
        )}
      >
        <MaterialIcons name='clear-all' color={colors.theme.DEFAULT} size={32} />
      </ButtonIcon>

      {/* <View
        className={`p-4 bg-red-600 w-[${Dimensions.get('screen').width}px] absolute right-0 -bottom-full`}
      >
        <Text className='text-white'>
          Teste
        </Text>
      </View> */}
    </View>
  )
}