import React, { CSSProperties } from 'react'
import cl from './CustomInput.module.css'

interface IProps {
    type?: InputType,
    placeholder?: string,
    value: string,
    disabled?: boolean,
    onChange?: (val: string) => void;
    styles?: CSSProperties
}

type InputType = "text" | "number" 

export const CustomInput = ({placeholder, disabled, value, onChange, type = "text", styles}: IProps) => {
  return (
    <input className={cl.input} style={styles} type={type} disabled={disabled} placeholder={placeholder} value={value} onChange={(e) => onChange && onChange(e.target.value)}/>
  )
}
