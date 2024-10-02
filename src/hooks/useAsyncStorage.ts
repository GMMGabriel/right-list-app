import AsyncStorage from '@react-native-async-storage/async-storage'

export class MyStorage {
  async setItem(key: string, item: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item))
    } catch (e) {
      console.error('Erro ao tentar SALVAR um item com Async Storage =>', e)
    }
  }

  async getItem(key: string) {
    try {
      const temp = await AsyncStorage.getItem(key)
      return temp === null ? null : JSON.parse(temp)
    } catch (e) {
      console.error('Erro ao tentar BUSCAR um item com Async Storage =>', e)
    }
  }
}