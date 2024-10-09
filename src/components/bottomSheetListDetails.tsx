import { ReactNode, useCallback, useMemo } from 'react'
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import { useColorScheme } from 'nativewind'

import { colors } from '@/styles/colors'

export function BottomSheetListDetails({ children }: { children: ReactNode }) {
  const { colorScheme } = useColorScheme()
  const snapPoints = useMemo(() => [74, '38%', '70%'], [])

  const renderBackdrop = useCallback(
    (props: any) =>
      <BottomSheetBackdrop
        appearsOnIndex={1} // em qual índice do snapPoints o backdrop irá APARECER
        disappearsOnIndex={0} // em qual índice do snapPoints o backdrop irá DESAPARECER
        pressBehavior={'collapse'} // comportamento do BottomSheet ao clicar no backdrop
        opacity={.4}
        {...props}
      />
    , []
  )

  return (
    <>
      <BottomSheet
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: colorScheme === 'dark'
            ? colors.backgroundSecondary.dark
            : colors.backgroundSecondary.light
        }}
        handleIndicatorStyle={{
          backgroundColor: colorScheme === 'dark'
            ? colors.tint.dark
            : colors.tint.light,
          opacity: .7
        }}
      >
        {children}
      </BottomSheet>
    </>
  )
}