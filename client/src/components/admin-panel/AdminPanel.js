import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_NEW_APARTMENT } from '../../apollo/mutation-base';
import { GET_USERS } from '../../apollo/get-base';
import { useAuth } from '../../context/AuthContext';
import Modal from './Modal';
import ApartmentForm from './ApartmentForm';

const initialFormValues = {
  title: '',
  description: '',
  price: '',
  imageUrls: [],
  sellerId: null,
  locality: '',
  floorInApartment: '',
  numberOfRooms: '',
  square: '',
  wallMaterial: '',
  heating: '',
};

const AdminPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [inputValues, setInputValues] = useState(initialFormValues);

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setInputValues((prevState) => ({
        ...prevState,
        sellerId: user.id,
      }));
    }
  }, [user]);

  const { loading: usersLoading, error: usersError } = useQuery(GET_USERS);

  const [createApartment, { loading: createLoading, error: createError }] = useMutation(ADD_NEW_APARTMENT, {
    onCompleted: () => {
      resetForm();
      setShowModal(false);
    },
  });

  const resetForm = useCallback(() => {
    setInputValues((prevState) => ({
      ...initialFormValues,
      sellerId: prevState.sellerId,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let uploadedImages = [];
    if (inputValues.imageUrls && inputValues.imageUrls.length > 0) {
      try {
        const uploadPromises = inputValues.imageUrls.map(uploadImage);
        uploadedImages = await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Error uploading images:', error);
        return;
      }
    }

    try {
      await createApartment({
        variables: {
          input: {
            ...inputValues,
            price: parseFloat(inputValues.price),
            imageUrls: uploadedImages,
            floorInApartment: parseInt(inputValues.floorInApartment, 10),
            numberOfRooms: parseInt(inputValues.numberOfRooms, 10),
            square: parseFloat(inputValues.square),
          },
        },
      });
    } catch (error) {
      console.error('Error creating apartment:', error);
    }
  };

  const handleImageUpload = useCallback((acceptedFiles) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      imageUrls: [...prevValues.imageUrls, ...acceptedFiles],
    }));
  }, []);

  const handleImageDelete = useCallback((index) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      imageUrls: prevValues.imageUrls.filter((_, i) => i !== index),
    }));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:4000/api/upload/apartment', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const renderLoadingOrError = useMemo(() => {
    if (usersLoading) return <p>Loading users...</p>;
    if (usersError) return <p>Error loading users: {usersError.message}</p>;
    return null;
  }, [usersLoading, usersError]);

  return (
    <div>
      <h2>Admin Panel</h2>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Додати нову квартиру
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ApartmentForm
          inputValues={inputValues}
          handleChange={handleChange}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
          handleSubmit={handleSubmit}
          createLoading={createLoading}
          setShowModal={setShowModal}
        />
      </Modal>

      {renderLoadingOrError}
    </div>
  );
};

export default AdminPanel;
