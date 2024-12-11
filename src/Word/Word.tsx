import React, { useEffect, useState } from 'react'
import { Button } from '../components/UI/Button/Button'
import { FileCreateModal } from './components/FileModel/FileCreateModal/FileCreateModal'
import { Files } from './components/FileModel/Files/Files'
import { getWordFiles } from '../http/wordApi'
import { IWordFile } from '../interfaces/IWordFile'
import { Loader } from '../components/Loader/Loader'
import { Templates } from './components/TemplateModel/Templates/Templates'
import { Changer } from './components/ChangerFileModel/Changer/Changer'
import { ITemplate } from '../interfaces/ITemplate'
import { getTemplates } from '../http/templateApi'

export const Word = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<IWordFile[]>([])

  const fetchTemplates = async () => {
    setLoading(true)
    await getTemplates().then((data) => setTemplates(data)).finally(() => setLoading(false))
  }

  const fetchFiles = async () => {
    setLoading(true)
    await getWordFiles().then((data) => setFiles(data)).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTemplates()
    fetchFiles();
  }, [])


  return (
    <>
        <Loader loading={loading} />
        <Files files={files} fetch={fetchFiles} setLoading={setLoading} />
        <Templates templates={templates} fetch={fetchTemplates} />
        <Changer files={files} templates={templates} />
    </>
  )
}
