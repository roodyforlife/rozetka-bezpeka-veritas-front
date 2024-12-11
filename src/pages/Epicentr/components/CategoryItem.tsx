import React from 'react'
import cl from './CategoryItem.module.css'
import { ICategoryItem } from '../Epicentr'
import { CustomInput } from '../../../components/UI/CustomInput/CustomInput'

interface IProps {
    categoryItem: ICategoryItem
    handleItemChange: (categoryItem: ICategoryItem) => void;
}

export const CategoryItem = ({categoryItem, handleItemChange}: IProps) => {

  return (
    <div className={cl.item}>
      <div className={cl.block}>
      <input type="checkbox" checked={categoryItem.checked} onChange={(e) => handleItemChange({...categoryItem, checked: e.target.checked})} />
      </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.name} disabled={true}></CustomInput>
        </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.secondName || ""} onChange={(val) => handleItemChange({...categoryItem, secondName: val})}></CustomInput>
        </div>
        <div className={cl.block}>
            <CustomInput value={categoryItem.percent} type='number' onChange={(val) => handleItemChange({...categoryItem, percent: val})}></CustomInput>
        </div>
    </div>
  )
}
