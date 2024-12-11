import React, { useState } from 'react'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { File } from '../File/File'
import cl from './Files.module.css'
import { FileCreateModal } from '../FileCreateModal/FileCreateModal'
import { Button } from '../../../../components/UI/Button/Button'

interface IProps {
    fetch: () => Promise<void>
    files: IWordFile[]
    setLoading: (val: boolean) => void
}

export const Files = ({files, fetch, setLoading}: IProps) => {
    const [createModal, setCreateModal] = useState<boolean>(false)

    const handleOpenCreateModal = () => setCreateModal(true)
    const handleCloseCreateModal = () => setCreateModal(false)

   

  return (
   <div className={cl.content}>
    <div className={cl.title}>Uploaded files</div>
   <FileCreateModal fetch={fetch} show={createModal} onHide={handleCloseCreateModal}></FileCreateModal>
   <Button onClick={handleOpenCreateModal}>Add new file</Button>
     <div className={cl.items}>
        <div className={cl.headerText}>File name</div>
        <div></div>
        <div></div>
        {files.map((file) => 
            <File setLoading={setLoading} fetch={fetch} file={file} />
        )}
    </div>
   </div>
  )
}
