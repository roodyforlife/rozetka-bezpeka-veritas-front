import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from '../../../../components/UI/Button/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import { uploadWordFile } from '../../../../http/wordApi';
import { Form } from 'react-bootstrap';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => Promise<void>
}

export const FileCreateModal = ({onHide, show, fetch}: IProps) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setFile(e.target.files[0]);
        }
      };

      const handleSave = async () => {
        if (!file) {
          alert("Выберите файл для загрузки");
          return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
          await uploadWordFile(formData);
          onHide();
          fetch();
        } catch (error) {
          console.error("Ошибка загрузки файла:", error);
        }
      };

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add new file</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="formFile">
            <Form.Label>Выберите файл для загрузки</Form.Label>
            <Form.Control type="file" accept=".docx" onChange={handleFileChange} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>
            Close
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      );
}
