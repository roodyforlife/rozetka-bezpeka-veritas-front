import React, { useEffect, useState } from 'react'
import { getCategories, changeCategories } from '../../http/epicentrApi'
import { CategoryViewer } from '../../components/CategoryViewer/CategoryViewer'

export interface ICategoryItem {
  id: string,
  parentId: string,
  name: string,
  secondName?: string,
  percent: string,
  checked: boolean
}

export interface IViewer {
  title: string,
}

export const Epicentr = () => {
  return (
    <CategoryViewer viewer={{title: "Epicentr"}} fetchFunction={getCategories} saveFunction={changeCategories}></CategoryViewer>
  )
}
