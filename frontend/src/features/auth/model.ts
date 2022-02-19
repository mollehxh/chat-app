import { createEffect, createEvent, guard, sample } from 'effector';
import { createGate } from 'effector-react';
import { $session, setSession } from 'entities/session';
import { pending } from 'patronum';
import { SignInData, SignUpData } from 'shared/api/auth';
import { getMe, signIn, signUp } from 'shared/api/auth/auth';

export const AuthGate = createGate();

export const signInClicked = createEvent<SignInData>();
export const signUpClicked = createEvent<SignUpData>();
export const signOutClicked = createEvent();

export const getMeFx = createEffect(getMe);
export const signUpFx = createEffect<SignUpData, void>(
  async (signUpData: SignUpData) => {
    const data = await signUp(signUpData);
    localStorage.setItem('jwt', data.token);
  }
);
export const signInFx = createEffect<SignInData, void>(
  async (signInData: SignInData) => {
    const data = await signIn(signInData);
    localStorage.setItem('jwt', data.token);
  }
);
export const signOutFx = createEffect(() => {
  localStorage.removeItem('jwt');
  setSession(null);
});

export const $isSessionLoading = pending({
  effects: [getMeFx, signUpFx, signInFx],
});

export const $isAuthenticated = $session.map((user) => user !== null);

guard({
  clock: [AuthGate.open, signInFx.done, signUpFx.done],
  filter: () => !!localStorage.getItem('jwt'),
  target: getMeFx,
});

sample({
  clock: getMeFx.doneData,
  target: setSession,
});

sample({
  clock: signInClicked,
  target: signInFx,
});

sample({
  clock: signUpClicked,
  target: signUpFx,
});

sample({
  clock: signOutClicked,
  target: signOutFx,
});
