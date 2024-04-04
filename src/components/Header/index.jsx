import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { isUserAuth, signout } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(isUserAuth);
  const dispatch = useDispatch();

  const onClickSignOut = () => {
    if (window.confirm('Do you want to signout?')) {
      dispatch(signout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/add-post'>
                  <Button variant='contained'>Написать статью</Button>
                </Link>
                <Button
                  onClick={onClickSignOut}
                  variant='contained'
                  color='error'
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to='/signin'>
                  <Button variant='outlined'>Войти</Button>
                </Link>
                <Link to='/signup'>
                  <Button variant='contained'>Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
