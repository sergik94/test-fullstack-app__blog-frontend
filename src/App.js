import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserDataMe } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDataMe());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:postId' element={<FullPost />} />
          <Route path='/posts/:postId/edit' element={<AddPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
