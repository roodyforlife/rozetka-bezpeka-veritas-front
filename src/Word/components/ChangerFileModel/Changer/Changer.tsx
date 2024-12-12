import React, { useMemo, useState } from 'react'
import cl from '../../TemplateModel/Templates/Templates.module.css'
import { IWordFile } from '../../../../interfaces/IWordFile'
import { ITemplate, ITemplateItem } from '../../../../interfaces/ITemplate'
import classes from './Changer.module.css';
import { FormCheck, FormSelect } from 'react-bootstrap'
import { Button } from '../../../../components/UI/Button/Button'
import { downloadWordResult } from '../../../../http/wordApi'
import saveFile from '../../../../utils/saveFile'
import { CustomInput } from '../../../../components/UI/CustomInput/CustomInput'
import { addIcon, minusCircleIcon, zipFileIcon } from '../../../../imagesConsts';

interface IProps {
    files: IWordFile[],
    templates: ITemplate[]
    hidden?: boolean
}

export const Changer = ({files, templates, hidden = false}: IProps) => {
    const [selectedFiles, setSelectedFiles] = useState<string[]>([])
    const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>()
    const [isHidden, setIsHidden] = useState<boolean>(hidden);
    const [fileSearchText, setFileSearchText] = useState<string>('')

    const downloadResult = async () => {
        if (selectedTemplate) {
            const downloadedFile: Blob = await downloadWordResult({ selectedFiles, selectedTemplate: {
                id: selectedTemplate.id,
                name: selectedTemplate.name,
                items: selectedTemplate.items,
                image: []
            } });
            saveFile(downloadedFile, "result.zip")
        } else {
            alert("Error")
        }
        
    }

    const filteredFiles = useMemo(() => {
        return files.filter((file) => file.name.toLocaleUpperCase().includes(fileSearchText.toLocaleUpperCase()))
    }, [files, fileSearchText])

    // useEffect(() => {
    //     if (selectedTemplate) {
    //         var img: any = selectedTemplate.image

    //     const uint8Array = new Uint8Array(img?.data);
    //     const blob = new Blob([uint8Array], { type: "image/png" });
    //     const url = URL.createObjectURL(blob);
    //     setPreviewUrl(url);
    //     }
    // }, [selectedTemplate, templates])

    const toggleHidden = () => {
        setIsHidden(!isHidden)
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
    <div className={cl.header} onClick={toggleHidden}>
    <div className={cl.title}>Формування файлів</div>
        <div><button className={cl.hideButton} ><img src={isHidden ? addIcon : minusCircleIcon} alt="" /></button></div>
      </div>
   {!isHidden &&
    <div style={{marginTop: "20px"}}>
    <div className={classes.blocks}>
        <div className={classes.block}>
        <div className={classes.title}>Файли</div>
        <div className={classes.find}><CustomInput placeholder='Пошук файлу' onChange={(val) => setFileSearchText(val)} value={fileSearchText}/></div>
            <div className={classes.files}>
                {filteredFiles.map((file) => 
                    <div className={classes.file}>
                        <FormCheck checked={selectedFiles.includes(file.id)} onChange={() => toggleSelectFile(file.id)}></FormCheck>
                        <div>{file.name}</div>
                    </div>
                )}
            </div>
        </div>
        <div className={cl.block}>
        <div className={classes.title}>Організація</div>
            <FormSelect value={selectedTemplate?.id} onChange={(e) => selectTemplate(e.target.value)} data-live-search="true">
                <option value={'0'}>Виберіть організацію</option>
                {templates.map((template) => 
                    <option value={template.id} key={template.id}>{template.name}</option>
                )}
            </FormSelect>
        </div>
    </div>
    <div className={classes.keys}>
        {selectedTemplate && 
            <>
            <div>Ключ</div>
            <div>Значення</div>
            {selectedTemplate.items.map((item) =>
                <>
                    <CustomInput placeholder='Ключ' value={item.key} disabled={true}></CustomInput>
                    <CustomInput placeholder='Значення' value={item.value} onChange={(val) => handleItemChange(item, val)} disabled={item.changeable}></CustomInput>
                </>
            )}
            </>
        }
        
    </div>
    <div className={classes.button}><Button onClick={downloadResult} icon={zipFileIcon}>Завантажити результат</Button></div>
    </div>
   }
   </div>
  )
}
