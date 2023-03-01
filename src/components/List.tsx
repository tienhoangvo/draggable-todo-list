import type { HTMLAttributes, ReactNode } from "react"

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  children?: ReactNode
}

const List = ({ children, ...rest }: ListProps) => {
  return (
    <ul {...rest}>
      {children}
    </ul>
  )
}

export default List