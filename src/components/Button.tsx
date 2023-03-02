import { ButtonHTMLAttributes, HTMLAttributes, LegacyRef, ReactNode, RefObject } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode,
  buttonRef?: RefObject<HTMLButtonElement>
}

const Button = ({children, buttonRef, ...rest } : ButtonProps) => {
  return (
    <button ref={buttonRef} {...rest}>
      {children}
    </button>
  )
}

export default Button