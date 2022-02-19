import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import { getAllMessages } from 'shared/api/messages';
import { createSocket } from 'shared/api/socket';

export type Message = {
  username: string;
  messageValue: string;
};

export const ChatGate = createGate();

const socket = createSocket('http://localhost:8000');

export const sendMessage = createEvent<Message>();
export const messageRecived = socket.in<Message>('SERVER:messageSent');

export const fetchMessagesFx = createEffect(getAllMessages);
export const sendMessageFx = socket.out<Message>('CLIENT:messageSent');

export const $chatMessages = createStore<Message[]>([]);
export const $isMessagesLoading = fetchMessagesFx.pending;

sample({
  clock: ChatGate.open,
  target: fetchMessagesFx,
});

sample({
  clock: fetchMessagesFx.doneData,
  target: $chatMessages,
});

sample({
  clock: sendMessage,
  target: sendMessageFx,
});

sample({
  clock: messageRecived,
  source: $chatMessages,
  fn: (messages, newMessage) => [...messages, newMessage],
  target: $chatMessages,
});
