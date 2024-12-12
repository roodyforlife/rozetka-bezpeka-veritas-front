import React, { useState } from 'react'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { File } from '../File/File'
import cl from './Files.module.css'
import { FileCreateModal } from '../FileCreateModal/FileCreateModal'
import { Button } from '../../../../components/UI/Button/Button'
import { addDocumentIcon, addIcon, minusCircleIcon } from '../../../../imagesConsts'

interface IProps {
    fetch: () => Promise<void>
    files: IWordFile[]
    setLoading: (val: boolean) => void
    hidden?: boolean
}

export const Files = ({files, fetch, setLoading, hidden = true}: IProps) => {
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(hidden);

    const handleOpenCreateModal = () => setCreateModal(true)
    const handleCloseCreateModal = () => setCreateModal(false)

    const toggleHidden = () => {
      setIsHidden(!isHidden)
    }

  return (
   <div className={cl.content}>
    <div className={cl.header} onClick={toggleHidden}>
    <div className={cl.title}>Шаблони документів</div>
        <div><button className={cl.hideButton}><img src={isHidden ? addIcon : minusCircleIcon} alt="" /></button></div>
      </div>
   <FileCreateModal fetch={fetch} show={createModal} onHide={handleCloseCreateModal}></FileCreateModal>
   {!isHidden && 
   <div style={{marginTop: "20px"}}>
    <Button onClick={handleOpenCreateModal} icon={addDocumentIcon}>Додати файл</Button>
     <div className={cl.items}>
        <div className={cl.headerText}>Назва</div>
        <div></div>
        <div></div>
        {files.map((file) => 
            <File setLoading={setLoading} fetch={fetch} file={file} />
        )}
    </div>
    </div>
   }
   </div>
  )
}
