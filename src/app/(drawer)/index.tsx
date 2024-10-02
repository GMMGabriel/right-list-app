import { Alert, FlatList, ListRenderItemInfo, SafeAreaView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons'

import { Header } from '@/components/header';
import { ButtonIcon } from '@/components/butttonIcon';
import { Format } from '@/utilities/format';
import { useRef, useState } from 'react';
import { IData, simulatorProductList } from '@/utilities/simulatorProductList';
import { colors } from '@/styles/colors';
import { ItemList } from '@/components/renderItem';

export default function ListPage() {
  const format = new Format()
  // const calc = new Calculations()

  const [modeList, setModeList] = useState<boolean>(false)
  const refProductList = useRef<FlatList<IData> | null>(null)

  const total = simulatorProductList.length
  const totalCollected = simulatorProductList.filter(spl => spl.isCollected).length
  const p = total ? Number((totalCollected / total * 100).toFixed(1)) : 0

  function updateSwitch() {
    setModeList(state => !state)
  }

  function separator() {
    return (
      <View className='w-full h-[1px] bg-zinc-700' />
    )
  }

  return (
    <>
      <View
        className={`flex-1 items-center bg-backgroundPrimary-light dark:bg-backgroundPrimary-dark`}
      >
        {/* LISTA */}
        {simulatorProductList.length ? (
          <SafeAreaView
            className='flex-1 w-full'
          >
            <FlatList
              ref={(ref) => { refProductList.current = ref }}
              data={simulatorProductList}
              renderItem={ItemList}
              ItemSeparatorComponent={separator}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        ) : (
          <View className='flex flex-1 justify-center'>
            <Text className='text-3xl text-tint-light dark:text-tint-dark'>
              Lista vazia
            </Text>
          </View>
        )}

        <View className='w-full rounded-ss-2xl rounded-se-2xl border-t-2 border-solid border-zinc-700 bg-backgroundSecondary-light dark:bg-backgroundSecondary-dark'>
          {/* PROGRESSO DA COMPRA */}
          <View className='flex-row gap-4 items-center p-4'>
            <Text className='text-tint-light dark:text-tint-dark'>
              {format.currency(
                simulatorProductList.filter(spl => spl.isCollected).reduce((acc: number, d: IData) => Number((acc + Number((d.amount * d.quantity).toFixed(2))).toFixed(2)), 0).toFixed(2),
                true,
                'pt-br'
              )}
            </Text>
            <View className='flex-1 flex-row gap-4 items-center'>
              <View className='h-1 flex-1 bg-zinc-600/50 rounded-lg overflow-hidden'>
                <View
                  style={{ width: `${p}%` }}
                  className={`h-1 bg-theme`}
                />
              </View>
              <Text className='text-base text-tint-light dark:text-tint-dark'>
                {p}% - {totalCollected}/{total}
              </Text>
            </View>
            {/* <Link href='#' className='p-4'>
              <Feather name='plus' color={colors.theme.DEFAULT} size={32} />
            </Link> */}
          </View>

          {/* VALOR TOTAL E BOTÃO PARA SALVAR A LISTA */}
          <View className='flex-row items-center justify-between py-2'>
            <ButtonIcon className='px-4'>
              <MaterialIcons name='save' color={colors.theme.DEFAULT} size={32} />
            </ButtonIcon>

            <Link
              href='/newProduct'
              className='px-4'
            // onPress={() => {
            //   refProductList.current?.scrollToEnd()
            // }}
            >
              <Feather name='plus' color={colors.theme.DEFAULT} size={32} />
            </Link>
          </View>
        </View>

        {/* <Text className='mt-4 text-3xl text-theme-color'>Home</Text> */}

        {/* <Link
          href='/newProduct'
          className='p-2 bg-theme-color-700 rounded text-tint-light dark:text-tint-dark'
        >
          Novo produto
        </Link> */}
      </View>
    </>
  )
}