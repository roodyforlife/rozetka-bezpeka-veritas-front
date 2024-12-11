import React, { MouseEvent, ReactNode } from 'react'
import cl from './Button.module.css'

interface IProps {
    onClick: () => void
    children: ReactNode
}

export const Button = ({onClick, children}: IProps) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onClick();
  }

  return (
    <button className={cl.button} onClick={handleClick}>{children}</button>
  )
}
