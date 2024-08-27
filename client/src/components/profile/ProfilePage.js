import React, { useState, useEffect } from 'react';
import { Button, Upload, message, Spin, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AVATAR_BY_USER_ID } from '../../apollo/get-base'; 
import { UPDATE_USER_AVATAR } from '../../apollo/mutation-base';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
`;

const ProfileCard = styled.div`
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  background: #fff;
  border-radius: 8px;
  text-align: center;
`;

const AvatarContainer = styled.div`
  margin-bottom: 16px;
`;

const ProfilePage = () => {
  const [file, setFile] = useState(null);
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState('');

  const { data, loading } = useQuery(GET_AVATAR_BY_USER_ID, {
    variables: { id: user ? user.id : null },
    skip: !user,
  });

  const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR);

  useEffect(() => {
    if (data && data.user) {
      setAvatarUrl(data.user.avatar);
    }
  }, [data]);

  const handleAvatarChange = async () => {
    if (!file) {
      message.error('Будь ласка, виберіть файл для завантаження.');
      return;
    }

    if (!user || !user.id) {
      message.error('Користувача не знайдено.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadResponse = await fetch('http://localhost:4000/api/upload/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Завантаження файлу не вдалося.');
      }

      const uploadData = await uploadResponse.json();
      console.log('Відповідь сервера:', uploadData);

      const updateResponse = await updateUserAvatar({
        variables: {
          id: user.id,
          avatar: uploadData.imageUrl,
        },
      });

      if (!updateResponse.data.updateUser) {
        throw new Error('Оновлення аватарки в базі даних не вдалося.');
      }

      message.success('Аватарка успішно оновлена.');
      setAvatarUrl(uploadData.imageUrl);
    } catch (error) {
      console.error('Помилка при оновленні аватарки:', error);
      message.error('Не вдалося оновити аватарку. Спробуйте пізніше.');
    }
  };

  const handleFileChange = ({ file }) => {
    setFile(file);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        {loading ? (
          <Spin size="large" />
        ) : (
          <AvatarContainer>
            <Avatar
              size={128}
              icon={<UserOutlined />}
              src={avatarUrl}
            />
          </AvatarContainer>
        )}
        <Upload beforeUpload={() => false} onChange={handleFileChange}>
          <Button icon={<UploadOutlined />}>Виберіть аватар</Button>
        </Upload>
        <Button type="primary" onClick={handleAvatarChange} style={{ marginTop: 16 }}>
          Завантажити аватар
        </Button>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
