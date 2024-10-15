import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

import { colors } from '@/styles/colors'

type TActivityIndicator = ActivityIndicatorProps & {
  size?: number
  color?: string
}

export function Loading({ size = 4, color = colors.theme.DEFAULT, className, ...rest }: TActivityIndicator) {
  return <ActivityIndicator
    className={twMerge("flex-1 bg-zinc-100 items-center justify-center dark:bg-zinc-900", className)}
    size={16 * size}
    color={color}
    {...rest}
  />
}