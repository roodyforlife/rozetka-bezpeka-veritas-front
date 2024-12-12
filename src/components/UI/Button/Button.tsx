import React, { CSSProperties, MouseEvent, ReactNode } from 'react'
import cl from './Button.module.css'

interface IProps {
    onClick: () => void
    children: ReactNode,
    icon?: string
    type?: ButtonType,
    styles?: CSSProperties
}

type ButtonType = "default" | "dark"

export const Button = ({onClick, children, icon, type = "default", styles}: IProps) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onClick();
  }

  return (
    <div>
      <button data-button-type={type} className={cl.button} style={styles} onClick={handleClick}>
        {icon && <div className={cl.icon}><img src={icon} alt="" /></div>}
        {children}
      </button>
    </div>
  )
}
