import React from 'react'
import cl from './Loader.module.css';

interface IProps {
  loading: boolean
}

export const Loader = ({loading}: IProps) => {
  return loading ? (
    <div className={cl.container}>
        <div className={cl.loader}></div>
    </div>
  ) : <></>
}