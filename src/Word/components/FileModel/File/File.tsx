import React, { useState } from 'react'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { Button } from '../../../../components/UI/Button/Button'
import { downloadWordFile, removeWordFile } from '../../../../http/wordApi'
import { FileDeleteModal } from '../FileDeleteModal/FileDeleteModal'
import saveFile from '../../../../utils/saveFile'

interface IProps {
    file: IWordFile,
    fetch: () => Promise<void>
    setLoading: (value: boolean) => void
} 

export const File = ({file, fetch, setLoading}: IProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = () => setDeleteModal(true)
  const handleCloseDeleteModal = () => setDeleteModal(false)

    const download = async () => {
        try {
            const downloadedFile: Blob = await downloadWordFile(file.id);
            saveFile(downloadedFile, file.name)
            
          } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
          }
    }

    const remove = async (id: string) => {
      setLoading(true)
      await removeWordFile(id).finally(() => {
        setLoading(false)
        handleCloseDeleteModal()
        fetch()
      });
    }

  return (
    <>
    <FileDeleteModal remove={remove} file={file} show={deleteModal} onHide={handleCloseDeleteModal} ></FileDeleteModal>
        <div>{file.name}</div>
        <Button onClick={download}>Download</Button>
        <Button onClick={handleOpenDeleteModal}>Remove</Button>
    </>
  )
}
