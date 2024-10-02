import { ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native"
import { Feather, MaterialIcons } from '@expo/vector-icons'

import { IData } from "@/utilities/simulatorProductList"
import { ButtonIcon } from "./butttonIcon"
import { colors } from "@/styles/colors"

export function ItemList({ item }: ListRenderItemInfo<IData>) {
  function handleLongPressItem(i: IData) {
    console.log(i)
  }

  return (
    <TouchableOpacity
      className={`w-full flex-row items-center ${item.isCollected ? 'bg-theme/10' : ''}`}
      activeOpacity={.9}
      onLongPress={() => handleLongPressItem(item)}
    >
      {/* precisa dessa View para que essa parte do botão de check tenha um flex-row */}
      <View>
        <ButtonIcon className='flex flex-1 justify-center p-4'>
          <MaterialIcons
            name={item.isCollected ? 'check-box' : 'check-box-outline-blank'}
            color={colors.theme.DEFAULT}
            size={20}
          />
        </ButtonIcon>
      </View>

      <View className='flex-1 py-4 gap-1 justify-center'>
        <Text className={`text-tint-light text-base font-bold ${item.isCollected ? 'line-through' : ''} dark:text-tint-dark`}>
          {item.name}
        </Text>
        <Text className='text-tint-light text-sm dark:text-tint-dark'>
          R${item.amount},00
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
  )
}