import { DefaultSectionT, SectionListData, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'

import { Format } from '@/utilities/format'
import { IData } from '@/utilities/simulatorProductList'

import { colors } from '@/styles/colors'

export function RenderSectionHeaderList({ section }: { section: SectionListData<IData, DefaultSectionT> }) {
  const format = new Format()

  const productList = section.data
  const totalProduct = productList.length
  const totalAmountProduct = productList.reduce((acc: number, p: IData) => Number((acc + Number(((p.quantity >= p.promotionalQuantity && p.promotionalAmount > 0 ? p.promotionalAmount : p.amount) * p.quantity).toFixed(2))).toFixed(2)), 0).toFixed(2)

  const productCollectedList = section.data.filter(p => p.isCollected)
  const totalProductCollected = productCollectedList.length
  const totalAmountProductColleted = productCollectedList.reduce((acc: number, p: IData) => Number((acc + Number(((p.quantity >= p.promotionalQuantity && p.promotionalAmount > 0 ? p.promotionalAmount : p.amount) * p.quantity).toFixed(2))).toFixed(2)), 0).toFixed(2)

  return (
    <View className='px-4 pt-6 pb-2 bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark'>
      <View
        className='flex-row items-center rounded-2xl overflow-hidden bg-theme/10'
      >
        <View className='flex-1 pl-4 pt-2 pb-3 gap-1'>
          <Text className='text-2xl text-tint-light dark:text-tint-dark'>
            {section.title}
          </Text>

          <View className='flex-row items-center gap-4'>
            <Text className='text-sm text-tint-light dark:text-tint-dark'>
              {totalProductCollected} / {totalProduct}
            </Text>

            <Text className='text-sm text-tint-light dark:text-tint-dark'>
              {format.currency(totalAmountProductColleted, true)} / {format.currency(totalAmountProduct, true)}
            </Text>
          </View>
        </View>

        <View className='w-1 h-4/5 ah-full rounded-full bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark' />

        <Link
          href={`/newProduct/0?section=${section.title}`}
          className='p-4'
        >
          <Feather name='plus' color={colors.theme.DEFAULT} size={24} />
        </Link>
      </View>
    </View>
  )
}