import React, { useState } from 'react'
import cl from '../../TemplateModel/Templates/Templates.module.css'
import { Loader } from '../../../../components/Loader/Loader'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { ITemplate, ITemplateItem } from '../../../../interfaces/ITemplate'
import classes from './Changer.module.css';
import { Form, FormCheck, FormSelect } from 'react-bootstrap'
import { Button } from '../../../../components/UI/Button/Button'
import { downloadWordResult } from '../../../../http/wordApi'
import saveFile from '../../../../utils/saveFile'
import { CustomInput } from '../../../../components/UI/CustomInput/CustomInput'

interface IProps {
    files: IWordFile[],
    templates: ITemplate[]
}

export const Changer = ({files, templates}: IProps) => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>()

    const downloadResult = async () => {
        if (selectedTemplate) {
            const downloadedFile: Blob = await downloadWordResult({ selectedFiles, selectedTemplate });
            saveFile(downloadedFile, "result.zip")
        } else {
            alert("Error")
        }
        
    }

    const toggleSelectFile = (fileId: string) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.includes(fileId)
                ? prevSelectedFiles.filter((id) => id !== fileId)
                : [...prevSelectedFiles, fileId]
        );
    };

    const selectTemplate = (id: string) => {
        const foundTemplate = templates.find((template) => template.id === id);
        setSelectedTemplate(foundTemplate)
    }

    const handleItemChange = (item: ITemplateItem, value: string) => {
       if (selectedTemplate) {
        setSelectedTemplate({
            ...selectedTemplate,
            items: selectedTemplate.items.map((templateItem) => {
                return (item.id === templateItem.id) ? {...templateItem, value} : templateItem
            })
        })
       }
    }

  return (
    <div className={cl.content}>
    <div className={cl.title}>Result</div>
    <div className={classes.blocks}>
        <div className={classes.block}>
        <div className={classes.title}>Files</div>
            <div className={classes.files}>
                {files.map((file) => 
                    <div className={classes.file}>
                        <FormCheck checked={selectedFiles.includes(file.id)} onChange={() => toggleSelectFile(file.id)}></FormCheck>
                        <div>{file.name}</div>
                    </div>
                )}
            </div>
        </div>
        <div className={cl.block}>
        <div className={classes.title}>Templates</div>
            <FormSelect value={selectedTemplate?.id} onChange={(e) => selectTemplate(e.target.value)} data-live-search="true">
                <option value={'0'}>Select template</option>
                {templates.map((template) => 
                    <option value={template.id} key={template.id}>{template.name}</option>
                )}
            </FormSelect>
        </div>
    </div>
    <div className={classes.keys}>
        {selectedTemplate && 
            <>
            <div>Key</div>
            <div>Value</div>
            {selectedTemplate.items.map((item) =>
                <>
                    <CustomInput placeholder='Key' value={item.key} disabled={true}></CustomInput>
                    <CustomInput placeholder='Value' value={item.value} onChange={(val) => handleItemChange(item, val)}></CustomInput>
                </>
            )}
            </>
        }
        
    </div>
    <div className={classes.button}><Button onClick={downloadResult}>Download result</Button></div>
   </div>
  )
}
