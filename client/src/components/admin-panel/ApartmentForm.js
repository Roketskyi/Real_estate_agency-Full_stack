import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  border: 2px dashed #007bff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: #f0f8ff;
    border-color: #0056b3;
  }

  &:focus-within {
    border-color: #0056b3;
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  object-fit: cover;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  transform: scale(1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
`;

const DeleteButton = styled.button.attrs({
  type: 'button',
})`
  background: rgba(255, 0, 0, 0.7);
  border: none;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`;

const ImagePreview = ({ files, onDelete }) => (
  <PreviewContainer>
    {files.map((file, index) => (
      <div key={index} style={{ position: 'relative' }}>
        <PreviewImage src={URL.createObjectURL(file)} alt={`preview-${index}`} />
        <DeleteButton onClick={() => onDelete(index)}>X</DeleteButton>
      </div>
    ))}
  </PreviewContainer>
);

const ApartmentForm = ({ inputValues, handleChange, handleImageUpload, handleSubmit, createLoading, setShowModal, handleImageDelete }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      handleImageUpload(acceptedFiles);
    },
    accept: 'image/*',
    multiple: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="modal-header">
        <h5 className="modal-title">Додати нову квартиру</h5>
        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
      </div>
      <div className="modal-body">
        <div className="mb-3">
          <label htmlFor="imageUrls" className="form-label">Зображення квартир</label>
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()} id="imageUrls" />
            <p>Перетягніть зображення сюди, або натисніть, щоб вибрати файли</p>
          </DropzoneContainer>
          <PreviewContainer>
            {inputValues.imageUrls && inputValues.imageUrls.length > 0 && (
              <ImagePreview files={inputValues.imageUrls} onDelete={handleImageDelete} />
            )}
          </PreviewContainer>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Назва</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={inputValues.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Опис</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={inputValues.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Ціна $</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={inputValues.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="locality" className="form-label">Місцезнаходження</label>
          <input
            type="text"
            className="form-control"
            id="locality"
            name="locality"
            value={inputValues.locality}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="floorInApartment" className="form-label">Поверх</label>
          <input
            type="number"
            className="form-control"
            id="floorInApartment"
            name="floorInApartment"
            value={inputValues.floorInApartment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="numberOfRooms" className="form-label">Кількість кімнат</label>
          <input
            type="number"
            className="form-control"
            id="numberOfRooms"
            name="numberOfRooms"
            value={inputValues.numberOfRooms}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="square" className="form-label">Площа (м²)</label>
          <input
            type="number"
            className="form-control"
            id="square"
            name="square"
            value={inputValues.square}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="wallMaterial" className="form-label">Матеріал стін</label>
          <input
            type="text"
            className="form-control"
            id="wallMaterial"
            name="wallMaterial"
            value={inputValues.wallMaterial}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="heating" className="form-label">Тип опалення</label>
          <input
            type="text"
            className="form-control"
            id="heating"
            name="heating"
            value={inputValues.heating}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Закрити</button>
        <button type="submit" className="btn btn-primary" disabled={createLoading}>Зберегти</button>
      </div>
    </form>
  );
};

export default ApartmentForm;
