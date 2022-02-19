import { createEffect, createEvent } from 'effector';
import { io } from 'socket.io-client';

export const createSocket = (url: string) => {
  const socket = io(url);

  return {
    in<T>(eventType: string) {
      const event = createEvent<T>();

      socket.on(eventType, event);

      return event;
    },
    out<T>(eventType: string) {
      return createEffect<T, void>((data) => {
        socket.emit(eventType, data);
      });
    },
  };
};
