import { Text, View } from 'react-native'

export default function DraftsPage() {
  
  return (
    <View className='flex-1 bg-backgroundPrimary-light items-center justify-center dark:bg-backgroundPrimary-dark'>
      <Text className='text-3xl font-bold text-tint-light dark:text-tint-dark'>Rascunhos</Text>
    </View>
  );
}