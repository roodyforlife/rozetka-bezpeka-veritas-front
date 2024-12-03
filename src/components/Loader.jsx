import React from 'react'
import cl from './Loader.module.css';

export const Loader = ({loading}) => {
  return loading ? (
    <div className={cl.container}>
        <div className={cl.loader}></div>
    </div>
  ) : <></>
}