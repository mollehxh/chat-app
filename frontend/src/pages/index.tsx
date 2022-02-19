import { FC } from 'react';
import { useStore } from 'effector-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SignInPage } from './sign-in-page';
import { ChatPage } from './chat-page';
import { SignUpPage } from './sign-up-page';
import { $isAuthenticated } from 'features/auth/model';

type Props = FC<{}>;

export const Routing: Props = ({}) => {
  const isAuthenticated = useStore($isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <Routes>
          <Route path='/chat' element={<ChatPage />} />
          <Route path='*' element={<Navigate replace to='/chat' />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='*' element={<Navigate replace to='/sign-in' />} />
        </Routes>
      )}
    </>
  );
};
