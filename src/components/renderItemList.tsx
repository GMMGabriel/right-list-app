import { Alert, DefaultSectionT, ListRenderItemInfo, SectionListData, Text, TouchableOpacity, View } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'

import { ButtonIcon } from './buttonIcon'

import { IData } from '@/utilities/simulatorProductList'
import { Format } from '@/utilities/format'
import { colors } from '@/styles/colors'
import { router } from 'expo-router'
import { useColorScheme } from 'nativewind'

export function RenderItemList({ item }: { item: IData }) {
  const format = new Format()
  const { colorScheme } = useColorScheme()

  const promotion = item.quantity >= item.promotionalQuantity && item.promotionalAmount > 0

  function handleLongPressItem() {
    console.log(item)
    Alert.alert(
      'Deletar',
      `deletar "${item.name}" da lista?`,
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', style: 'destructive', isPreferred: true },
      ],
      { cancelable: true }
    )
  }

  function handlePressItem() {
    // console.log(item.id)
    router.push(`/newProduct/${item.id}`)
  }

  return (
    <View className='w-full py-2 px-4'>
      <TouchableOpacity
        className={`flex-row items-center rounded-2xl aborder-2 ${item.isCollected ? 'bg-positive/10 aborder-theme/40' : 'abg-backgroundSecondary-dark/5 aborder-backgroundSecondary-dark/20 dark:abg-backgroundSecondary-light/5 dark:aborder-backgroundSecondary-light/20'}`}
        activeOpacity={.9}
        onLongPress={handleLongPressItem}
        onPress={handlePressItem}
      >
        {/* precisa dessa View para que essa parte do botão de check tenha um flex-row */}
        <View>
          <ButtonIcon className='flex flex-1 justify-center p-4'>
            <MaterialIcons
              name={item.isCollected ? 'check-box' : 'check-box-outline-blank'}
              color={item.isCollected ? colors.positive : colorScheme === 'dark' ? colors.tint.dark : colors.tint.light}
              size={20}
            />
          </ButtonIcon>
        </View>

        <View className='flex-1 py-4 gap-1 justify-center'>
          <Text className={`text-base font-bold text-tint-light dark:text-tint-dark ${item.isCollected ? 'atext-theme line-through' : 'atext-tint-light adark:text-tint-dark'}`}>
            {item.name}
          </Text>

          <View className='flex-row items-center gap-2'>
            <Text className={`text-sm text-tint-light dark:text-tint-dark ${promotion ? 'line-through' : ''}`}>
              {format.currency(item.amount, true)}
            </Text>

            {promotion && (
              <Text className='text-sm text-tint-light dark:text-tint-dark'>
                {format.currency(item.promotionalAmount, true)}
              </Text>
            )}
          </View>

          <Text className='text-tint-light text-sm dark:text-tint-dark'>
            total: {format.currency(((promotion ? item.promotionalAmount : item.amount) * item.quantity).toFixed(2), true)}
          </Text>
        </View>

        <View className='h-full flex-row items-center'>
          <View>
            <ButtonIcon className='flex flex-1 justify-center p-4'>
              <Feather
                name='minus'
                color={colors.negative}
              />
            </ButtonIcon>
          </View>

          <Text className='w-5 text-sm text-tint-light text-center dark:text-tint-dark'>
            {item.quantity}
          </Text>

          <View>
            <ButtonIcon className='flex flex-1 justify-center p-4'>
              <Feather
                name='plus'
                color={colors.positive}
              />
            </ButtonIcon>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}