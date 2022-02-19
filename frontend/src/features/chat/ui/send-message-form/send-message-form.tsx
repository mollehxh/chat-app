import { useStore } from 'effector-react';
import { $session } from 'entities/session';
import { sendMessage } from 'features/chat';
import { FC, useState } from 'react';

export const SendMessageForm: FC = () => {
  const [messageValue, setMessageValue] = useState('');
  const session = useStore($session);

  const submit = () => {
    sendMessage({ username: session!.username, messageValue });
  };

  return (
    <>
      <input
        type='text'
        onChange={(evt) => setMessageValue(evt.currentTarget.value)}
        value={messageValue}
        placeholder='message'
      />
      <button style={{ marginRight: 300 }} onClick={submit}>
        send
      </button>
    </>
  );
};
