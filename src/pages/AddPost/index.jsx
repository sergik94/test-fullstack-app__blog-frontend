import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { isUserAuth } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../features/axios';

export const AddPost = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(isUserAuth);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const inputFileRef = useRef(null);
  const { postId } = useParams();
  const isEditing = Boolean(postId);

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.currentTarget.files[0];

      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);

      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      window.alert('Error during file uploading');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        text,
        tags: tags.split(', '),
        imgUrl: imageUrl,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${postId}`, fields)
        : await axios.post('/posts', fields);

      const id = isEditing ? postId : data._id;
      navigate(`/posts/${id}`);
    } catch (error) {
      console.warn(error);
      window.alert('Error during post uploading');
    } finally {
      setLoading(false);
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  useEffect(() => {
    if (postId) {
      axios.get(`/posts/${postId}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(', '));
        setImageUrl(data.imgUrl);
      });
    }
  }, []);

  if (!isAuth) {
    return <Navigate to={'/'} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant='outlined'
        size='large'
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type='file'
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant='contained'
            color='error'
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:5000${imageUrl}`}
            alt='Uploaded'
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant='standard'
        placeholder='Заголовок статьи...'
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant='standard'
        placeholder='Тэги'
        value={tags}
        onChange={(e) => setTags(e.currentTarget.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size='large' variant='contained'>
          {isEditing ? 'Save' : 'Опубликовать'}
        </Button>
        <a href='/'>
          <Button size='large'>Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
