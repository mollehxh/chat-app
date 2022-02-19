import { signUpClicked } from 'features/auth/model';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

export const SignUpPage: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    signUpClicked({ username, email, password });
  };

  return (
    <div>
      <input
        type='text'
        onChange={(evt) => setUsername(evt.currentTarget.value)}
        value={username}
        placeholder='username'
      />
      <br />
      <input
        type='text'
        onChange={(evt) => setEmail(evt.currentTarget.value)}
        value={email}
        placeholder='email'
      />
      <br />
      <input
        type='text'
        onChange={(evt) => setPassword(evt.currentTarget.value)}
        value={password}
        placeholder='password'
      />
      <br />
      <button style={{ marginRight: 20 }} onClick={submit}>
        sign up
      </button>
      <Link to='/sign-in'>sign in</Link>
    </div>
  );
};
