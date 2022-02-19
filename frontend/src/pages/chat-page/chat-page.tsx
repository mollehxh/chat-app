import { FC } from 'react';
import { useGate, useList, useStore } from 'effector-react';
import { signOutClicked } from 'features/auth/model';
import {
  $chatMessages,
  $isMessagesLoading,
  ChatGate,
  SendMessageForm,
} from 'features/chat';

export const ChatPage: FC = () => {
  useGate(ChatGate);
  const isMessagesLoading = useStore($isMessagesLoading);

  const messages = useList($chatMessages, (msg) => (
    <li>
      {msg.username}: {msg.messageValue}
    </li>
  ));

  return (
    <div>
      <SendMessageForm />
      <button onClick={() => signOutClicked()}>Sign out</button>
      {isMessagesLoading ? <p>Loading...</p> : messages}
    </div>
  );
};
