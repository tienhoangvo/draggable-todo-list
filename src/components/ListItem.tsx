import { HTMLAttributes, ReactNode } from "react";

export type ListItemProps = HTMLAttributes<HTMLLIElement> & {
  children?: ReactNode
}

const ListItem = ({children, ...rest}: ListItemProps) => {
  return (
    <li {...rest} >
      {children}
    </li>
  )
}

export default ListItem