import { ReactNode } from "react";
import { StatusBar, View, ViewProps } from "react-native";
import { twMerge } from 'tailwind-merge'

type HeaderProps = ViewProps & {
  children: ReactNode
}

export function Header({ children, ...rest }: HeaderProps) {
  return (
    <View
      {...rest}
      style={{ paddingTop: Math.ceil(StatusBar.currentHeight || 0) }}
      className={twMerge(
        "w-full flex-row justify-end px-4 bg-black",
        rest.className
      )}
    >
      {children}
    </View>
  )
}