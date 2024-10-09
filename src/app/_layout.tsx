import '../styles/global.css'

import { useEffect, useState } from 'react'
import { useColorScheme } from 'nativewind'
import { StatusBar } from 'expo-status-bar'
import { SplashScreen } from 'expo-router'

import { Loading } from '@/components/loading'

import { MyStorage } from '@/hooks/useAsyncStorage'

import AppRoutes from '@/routes/app.routes'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [themeLoaded, setThemeLoaded] = useState(false)
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    async function prepare() {
      try {
        const storage = new MyStorage()
        const temp = await storage.getItem('theme')
        if (temp === null) {
          setColorScheme('system')
          await storage.setItem('theme', 'system')
        } else {
          setColorScheme(temp)
        }
      } catch (e) {
        console.log('ERRO: Erro ao tentar aplicar o tema =>', e)
        setColorScheme('system')
        const storage = new MyStorage()
        await storage.setItem('theme', 'system')
        await SplashScreen.hideAsync()
        setThemeLoaded(true)
      } finally {
        await SplashScreen.hideAsync()
        setThemeLoaded(true)
      }
    }
    prepare()
  }, [])

  const [loaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  if (!themeLoaded) {
    return (
      <>
        <StatusBar style='dark' />
      </>
    )
  }

  if (!loaded)
    return <Loading />

  return <AppRoutes />
}