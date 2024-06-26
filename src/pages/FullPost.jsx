import React, { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';

import axios from '../features/axios';

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    axios
      .get(`/posts/${postId}`)
      .then((res) => setData(res.data))
      .catch((e) => alert('Error', e))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={
          process.env.REACT_APP_API_URL + data.imgUrl ||
          `http://localhost:5000${data.imgUrl}`
        }
        user={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
