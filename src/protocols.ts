export type ApplicationError = {
  name: string;
  message: string;
};

export type UserAccount = {
  name: string,
  email: string,
  password: string,
  imgUrl: string
}

export type UserSignIn = {
  email: string, 
  password: string
}

export type UserCredentials = {
  user: number;
  email: string;
  name: string;
  imgUrl: string;
  token: string;
};