export type SignUpData = {
  username: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};

export type SessionUser = {
  id: string;
  email: string;
  username: string;
};
