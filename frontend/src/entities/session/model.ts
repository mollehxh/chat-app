import { createEvent, createStore, sample } from 'effector';
import { SessionUser } from 'shared/api/auth';

export const setSession = createEvent<SessionUser | null>();

export const $session = createStore<SessionUser | null>(null);

sample({
  clock: setSession,
  target: $session,
});
