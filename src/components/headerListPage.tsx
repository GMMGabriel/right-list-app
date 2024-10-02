import { Alert, Switch, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonIcon } from "./butttonIcon";
import { colors } from "@/styles/colors";
import { useState } from "react";

export function HeaderListPage() {
  const [modeList, setModeList] = useState<boolean>(false)

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
          Modo {modeList ? 'rascunho' : 'compra'}
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
    </View>
  )
}