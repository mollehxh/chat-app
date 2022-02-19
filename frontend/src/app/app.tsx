import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useGate, useStore } from 'effector-react';
import { Routing } from 'pages';

import 'shared/api/axios/interceptors';
import { $isSessionLoading, AuthGate } from 'features/auth/model';

export const App: FC = () => {
  useGate(AuthGate);
  const isSessionLoading = useStore($isSessionLoading);

  return (
    <BrowserRouter>
      {isSessionLoading ? <h1>Loading...</h1> : <Routing />}
    </BrowserRouter>
  );
};
