import { ActivityIndicator } from 'react-native'
import { colors } from '@/styles/colors'

export function Loading({size = 4, color = colors.theme.DEFAULT}: { size?: number; color?: string}) {
  return <ActivityIndicator
    className="flex-1 bg-zinc-100 items-center justify-center dark:bg-zinc-900"
    size={16 * size}
    color={color}
  />
}