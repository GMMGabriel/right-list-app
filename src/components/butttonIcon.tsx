import { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonIconProps = TouchableOpacityProps & {
  children: ReactNode
}

export function ButtonIcon({ children, ...rest }: ButtonIconProps) {
  return (
    <TouchableOpacity
      activeOpacity={.7}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  )
}