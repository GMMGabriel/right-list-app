import { useEffect, useRef, useState } from 'react'
import { SafeAreaView, SectionList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Feather, MaterialIcons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons'

import { RenderItemList } from '@/components/renderItemList'
import { BottomSheetListDetails } from '@/components/bottomSheetListDetails'

import { generateSectionListItems, IData, simulatorProductList, TProductList } from '@/utilities/simulatorProductList'
import { Format } from '@/utilities/format'
import { Link } from 'expo-router'
import { colors } from '@/styles/colors'
import { ButtonIcon } from '@/components/buttonIcon'
import { RenderSectionHeaderList } from '@/components/renderSectionHeaderList'
import { useColorScheme } from 'nativewind'
import BottomSheet from '@gorhom/bottom-sheet'
import useDebounceValue from '@/hooks/use-debounce-value'
import { Loading } from '@/components/loading'

export default function ListPage() {
  const format = new Format()
  const { colorScheme } = useColorScheme()
  const refBottomSheet = useRef<BottomSheet>(null)

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const [isShownSearchField, setIsShownSearchField] = useState<boolean>(false)
  const refTextInputSearch = useRef<TextInput>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoadingSearchFilter, setIsLoadingSearchFilter] = useState<boolean>(false)
  const debounceValue = useDebounceValue<string>(searchValue, 1000)
  const [productList, setProductList] = useState<TProductList>(generateSectionListItems())
  const [productListToShow, setProductListToShow] = useState<TProductList>(productList)

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

  function handleToggleIsShownSearchField() {
    if (isShownSearchField) {
      setProductListToShow(generateSectionListItems())
      setSearchValue('')
    }
    else refBottomSheet.current?.collapse()
    setIsShownSearchField(state => !state)
  }

  function handleToSearchProduct() {
    // console.warn('searchValue:', searchValue)
    if (!searchValue.trim()) {
      setProductListToShow(productList)
      setIsLoadingSearchFilter(false)
      return
    }
    setProductListToShow(productList
      .map(section => {
        const filteredData = section.data.filter(product =>
          product.name.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            )
        );

        // Se a seção ainda tiver produtos após o filtro, mantemos a seção.
        if (filteredData.length > 0) {
          return {
            ...section,
            data: filteredData
          };
        }

        // Se não houver produtos que correspondam ao termo de busca, não retorna nada.
        return null;
      })
      .filter(section => section !== null)
    )
    setIsLoadingSearchFilter(false)
  }

  useEffect(handleToSearchProduct, [debounceValue])

  return (
    <>
      <GestureHandlerRootView>
        <View
          className={`flex-1 items-center bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark`}
        >
          {simulatorProductList.length > 0 && isShownSearchField && (
            <View
              className='p-4 flex-row items-center justify-center'
            >
              <View
                className='h-full flex-row flex-1 rounded-tl-2xl rounded-bl-2xl bg-backgroundSecondary-light dark:bg-backgroundSecondary-dark'
              >
                <TextInput
                  ref={refTextInputSearch}
                  autoFocus
                  className='h-full flex-1 p-4 text-tint-light dark:text-tint-dark placeholder:text-withoutHighlight-light placeholder:dark:placeholder:text-withoutHighlight-dark'
                  keyboardType='default'
                  placeholder='Nome do produto...'
                  value={searchValue}
                  onChangeText={text => {
                    setSearchValue(text)
                    setIsLoadingSearchFilter(true)
                  }}
                />

                {searchValue && (
                  <ButtonIcon
                    className='p-2 justify-center'
                    onPress={() => {
                      setSearchValue('')
                      setIsLoadingSearchFilter(true)
                      refTextInputSearch.current?.focus()
                    }}
                  >
                    <FontAwesome name='times' size={16} color={colors.theme.DEFAULT} />
                  </ButtonIcon>
                )}
              </View>

              <View className='w-0.5 h-full bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark' />

              {isLoadingSearchFilter ? (
                <Loading
                  size={1.5}
                  className='flex-none h-full p-4 flex-row items-center rounded-tr-2xl rounded-br-2xl bg-backgroundSecondary-light dark:bg-backgroundSecondary-dark'
                />
              ) : (
                <ButtonIcon
                  className='h-full p-4 flex-row items-center rounded-tr-2xl rounded-br-2xl bg-backgroundSecondary-light dark:bg-backgroundSecondary-dark'
                  onPress={handleToSearchProduct}
                >
                  <AntDesign name='enter' color={colors.theme.DEFAULT} size={24} />
                </ButtonIcon>
              )}
            </View>
          )}

          {/* LISTA */}
          {simulatorProductList.length ? productListToShow.length ? (
            <SafeAreaView
              className='flex-1 w-full'
            >
              <SectionList
                ref={refProductList}
                sections={productListToShow}
                keyExtractor={item => item.id}
                renderItem={({ item }) => isExpanded ? <RenderItemList item={item} /> : <View />}
                renderSectionHeader={({ section }) => RenderSectionHeaderList({ section })}
                ListFooterComponent={() => <View className='pb-[74px]' />} // 74px porque a altura do bottom sheet inicialmente é 74px
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled
              />
            </SafeAreaView>
          ) : (
            <View
              className='flex-1 justify-center pb-[90px]' // 74px porque a altura do bottom sheet inicialmente é 74px + 16px que é o padding inferior do campo de pesquisa
            >
              <Text>
                Nenhum produto encontrado
              </Text>
            </View>
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

          <BottomSheetListDetails ref={refBottomSheet}>
            <View className=''>
              <View className='flex-row items-center py-2'>
                <Text className='flex-1 pl-4 text-tint-light dark:text-tint-dark'>
                  {format.currency(
                    totalAmountIsCollected,
                    true
                  )}
                </Text>

                {simulatorProductList.length > 0 && (
                  <>
                    <ButtonIcon
                      className='px-4 pt-1'
                      onPress={handleUpdateExpand}
                    >
                      <MaterialCommunityIcons name={isExpanded ? 'arrow-collapse-vertical' : 'arrow-expand-vertical'} color={colors.theme.DEFAULT} size={32} />
                    </ButtonIcon>

                    <ButtonIcon
                      onPress={handleToggleIsShownSearchField}
                    >
                      <MaterialIcons name={isShownSearchField ? 'search-off' : 'search'} color={colors.theme.DEFAULT} size={32} />
                    </ButtonIcon>
                  </>
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