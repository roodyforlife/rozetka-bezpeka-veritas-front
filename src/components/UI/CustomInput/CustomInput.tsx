import React from 'react'
import cl from './CustomInput.module.css'

interface IProps {
    type?: InputType,
    placeholder?: string,
    value: string,
    disabled?: boolean,
    onChange?: (val: string) => void;
}

type InputType = "text" | "number" 

export const CustomInput = ({placeholder, disabled, value, onChange, type = "text"}: IProps) => {
  return (
    <input className={cl.input} type={type} disabled={disabled} placeholder={placeholder} value={value} onChange={(e) => onChange && onChange(e.target.value)}/>
  )
}
