import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native'

export default function NewProductPage() {
  const { id, section } = useLocalSearchParams<{
    id: string
    section?: string
  }>()

  return (
    <View className='flex-1 bg-backgroundPrimary-light items-center justify-center dark:bg-backgroundPrimary-dark'>
      {/* <Text className='text-white my-8'>
        Id: {id}{'\n'}
        section: {section ?? '-'}
      </Text> */}
      {id !== '0' ? (
        <Text className='text-tint-light dark:text-tint-dark'>
          Editar produto com id: {id}
        </Text>
      ) : (
        <>
          <Text className='text-3xl font-bold text-tint-light dark:text-tint-dark'>Novo produto</Text>
          {section && (
            <Text className='text-tint-light dark:text-tint-dark'>
              Este novo produto será da seção: {section}
            </Text>
          )}
        </>
      )}
    </View>
  );
}