import { useRef, useState } from 'react'
import { SafeAreaView, SectionList, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Feather, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

import { RenderItemList } from '@/components/renderItemList'
import { BottomSheetListDetails } from '@/components/bottomSheetListDetails'

import { generateSectionListItems, IData, simulatorProductList } from '@/utilities/simulatorProductList'
import { Format } from '@/utilities/format'
import { Link } from 'expo-router'
import { colors } from '@/styles/colors'
import { ButtonIcon } from '@/components/buttonIcon'
import { RenderSectionHeaderList } from '@/components/renderSectionHeaderList'
import { useColorScheme } from 'nativewind'

export default function ListPage() {
  const format = new Format()
  const { colorScheme } = useColorScheme()
  // const calc = new Calculations()

  const [isExpanded, setIsExpanded] = useState<boolean>(true)

  const productList = generateSectionListItems()

  const refProductList = useRef<SectionList<IData> | null>(null)

  const totalProductList = simulatorProductList.length
  const totalProductIsCollected = simulatorProductList.length ? simulatorProductList.filter(spl => spl.isCollected).length : 0
  const percentage = Number((totalProductIsCollected / totalProductList * 100).toFixed(1))
  const totalAmountIsCollected = simulatorProductList.filter(spl => spl.isCollected)
    .reduce(
      (acc: number, d: IData) =>
        Number((acc + Number(((d.promotionalAmount > 0 && d.quantity >= d.promotionalQuantity ? d.promotionalAmount : d.amount) * d.quantity)
          .toFixed(2))).toFixed(2))
      , 0).toFixed(2)
  const totalAmountDiscount = simulatorProductList.filter(spl => spl.isCollected && spl.promotionalAmount > 0 && spl.quantity >= spl.promotionalQuantity)
    .reduce(
      (acc: number, d: IData) =>
        Number((acc + Number((
          Number((d.amount * d.quantity).toFixed(2))
          - Number((d.promotionalAmount * d.quantity).toFixed(2))
        ).toFixed(2))).toFixed(2))
      , 0).toFixed(2)

  function handleUpdateExpand() {
    setIsExpanded(state => !state)
  }

  return (
    <>
      <GestureHandlerRootView>
        <View
          className={`flex-1 items-center bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark`}
        >
          {/* LISTA */}
          {simulatorProductList.length ? (
            <SafeAreaView
              className='flex-1 w-full pt-2 pb-[74px]' // 74px porque a altura do bottom sheet inicialmente é 74px
            >
              <SectionList
                ref={refProductList}
                sections={productList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => isExpanded ? <RenderItemList item={item} /> : <View />}
                renderSectionHeader={({ section }) => RenderSectionHeaderList({ section })}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled
              />
            </SafeAreaView>
          ) : (
            <View
              className='flex flex-1 justify-center pb-[74px]' // 74px porque a altura do bottom sheet inicialmente é 74px
            >
              <Text className='text-3xl text-tint-light dark:text-tint-dark'>
                Lista vazia
              </Text>
            </View>
          )}

          {/* ===== bottom sheet ===== */}

          <BottomSheetListDetails>
            <View className=''>
              <View className='flex-row items-center py-2'>
                <Text className='flex-1 pl-4 text-tint-light dark:text-tint-dark'>
                  {format.currency(
                    totalAmountIsCollected,
                    true
                  )}
                </Text>

                {simulatorProductList.length > 0 && (
                  <ButtonIcon
                    className='px-4 pt-1'
                    onPress={handleUpdateExpand}
                  >
                    <MaterialCommunityIcons name={isExpanded ? 'arrow-collapse-vertical' : 'arrow-expand-vertical'} color={colors.theme.DEFAULT} size={32} />
                  </ButtonIcon>
                )}

                <Link
                  href={`/newProduct/0`}
                  className='px-4'
                >
                  <Feather name='plus' color={colors.theme.DEFAULT} size={32} />
                </Link>
              </View>

              {simulatorProductList.length > 0 && (
                <View className='gap-4 items-center p-4'>
                  <View className='w-full gap-4'>
                    <View className='flex-row gap-4 items-center'>
                      <View className='h-1 flex-1 bg-zinc-600/50 rounded-lg overflow-hidden'>
                        <View
                          style={{ width: `${percentage}%` }}
                          className={`h-1 bg-theme`}
                        />
                      </View>

                      <Text className='text-base text-tint-light dark:text-tint-dark'>
                        {percentage}% - {totalProductIsCollected}/{totalProductList}
                      </Text>
                    </View>
                  </View>

                  <View className='w-full flex-row gap-2 items-center justify-center'>
                    <Text className='text-base text-tint-light dark:text-tint-dark'>
                      Total de desconto:
                    </Text>
                    <Text className='text-base text-tint-light dark:text-tint-dark'>
                      {format.currency(totalAmountDiscount, true)}
                    </Text>
                  </View>

                  <View className='w-full gap-4'>
                    <TouchableOpacity
                      className='w-full py-2 px-4 flex-row items-center justify-center gap-1 rounded-lg bg-theme'
                    >
                      <Text className='text-base text-tint-light dark:text-tint-dark'>
                        Definir limite da lista
                      </Text>
                      <MaterialIcons name='attach-money' color={colorScheme === 'dark' ? colors.tint.dark : colors.tint.light} size={32} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      className='w-full py-2 px-4 flex-row items-center justify-center gap-2 rounded-lg bg-theme'
                    >
                      <Text className='text-base text-tint-light dark:text-tint-dark'>
                        Salvar lista
                      </Text>
                      <MaterialIcons name='save' color={colorScheme === 'dark' ? colors.tint.dark : colors.tint.light} size={32} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </BottomSheetListDetails>
        </View>
      </GestureHandlerRootView>
    </>
  )
}