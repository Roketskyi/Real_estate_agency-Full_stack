import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_NEW_APARTMENT } from '../apollo/mutation-base';
import { GET_USERS } from '../apollo/get-base';

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState({
    title: '',
    description: '',
    price: 0,
    imageFile: null, // Store the uploaded file object
    imageUrl: '', // Will store the filename with extension
    sellerId: parseInt(localStorage.getItem('userId') || 0), // Initialize sellerId from localStorage
    locality: '',
    floorInApartment: 0,
    numberOfRooms: 0,
    square: 0,
    wallMaterial: '',
    heating: '',
  });

  const { loading: usersLoading, error: usersError, data: userData } = useQuery(GET_USERS);

  const [createApartment, { loading: createLoading, error: createError }] = useMutation(ADD_NEW_APARTMENT, {
    onCompleted: () => {
      setShowModal(false);
      setInputValues({
        title: '',
        description: '',
        price: 0,
        imageFile: null, // Reset imageFile
        imageUrl: '', // Reset imageUrl
        sellerId: parseInt(localStorage.getItem('userId') || 0), // Reset sellerId to current user's ID from localStorage
        locality: '',
        floorInApartment: 0,
        numberOfRooms: 0,
        square: 0,
        wallMaterial: '',
        heating: '',
      });
    },
  });

  useEffect(() => {
    if (userData && userData.users && userData.users.length > 0 && inputValues.sellerId === 0) {
      setInputValues(prevState => ({
        ...prevState,
        sellerId: parseInt(localStorage.getItem('userId') || 0), // Update sellerId with current user's ID from localStorage
      }));
    }
  }, [userData, inputValues.sellerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image file if available
    let uploadedImageUrl = '';
    if (inputValues.imageFile) {
      uploadedImageUrl = await uploadImage(inputValues.imageFile);
    }

    createApartment({
      variables: {
        input: {
          title: inputValues.title,
          description: inputValues.description,
          price: parseFloat(inputValues.price),
          imageUrl: uploadedImageUrl, // Use the uploaded image URL
          sellerId: parseInt(inputValues.sellerId),
          locality: inputValues.locality,
          floorInApartment: parseInt(inputValues.floorInApartment),
          numberOfRooms: parseInt(inputValues.numberOfRooms),
          square: parseFloat(inputValues.square),
          wallMaterial: inputValues.wallMaterial,
          heating: inputValues.heating,
        },
      },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setInputValues({
      ...inputValues,
      imageFile: file,
      imageUrl: file.name, // Display the filename in the input field (optional)
    });
  };

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  // Function to upload image file and return the uploaded image URL
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.imageUrl; // Assuming API returns the URL where the image is stored
    } catch (error) {
      console.error('Error uploading image:', error);
      return ''; // Handle error gracefully
    }
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (usersError) return <p>Error loading users: {usersError.message}</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Додати нову квартиру
      </button>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Додати нову квартиру</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Назва</label>
                  <input type="text" className="form-control" id="title" name="title" value={inputValues.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Опис</label>
                  <textarea className="form-control" id="description" name="description" value={inputValues.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Ціна</label>
                  <input type="number" className="form-control" id="price" name="price" value={inputValues.price} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">Зображення на головній сторінці</label>
                  <input type="file" className="form-control" id="imageUrl" name="imageUrl" onChange={handleImageUpload} />
                </div>
                <div className="mb-3">
                  <label htmlFor="locality" className="form-label">Місцезнаходження</label>
                  <input type="text" className="form-control" id="locality" name="locality" value={inputValues.locality} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="floorInApartment" className="form-label">Поверх</label>
                  <input type="number" className="form-control" id="floorInApartment" name="floorInApartment" value={inputValues.floorInApartment} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfRooms" className="form-label">Кількість кімнат</label>
                  <input type="number" className="form-control" id="numberOfRooms" name="numberOfRooms" value={inputValues.numberOfRooms} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="square" className="form-label">Площа (кв. м)</label>
                  <input type="number" className="form-control" id="square" name="square" value={inputValues.square} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="wallMaterial" className="form-label">Матеріал стін</label>
                  <input type="text" className="form-control" id="wallMaterial" name="wallMaterial" value={inputValues.wallMaterial} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="heating" className="form-label">Тип опалення</label>
                  <input type="text" className="form-control" id="heating" name="heating" value={inputValues.heating} onChange={handleChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Закрити</button>
                <button type="submit" className="btn btn-primary" disabled={createLoading}>Зберегти</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>
  );
};

export default AdminPanel;
