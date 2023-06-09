export type ApplicationError = {
  name: string;
  message: string;
};

export type UserAccount = {
  name: string;
  email: string;
  password: string;
  imgUrl: string;
};

export type UserSignIn = {
  email: string;
  password: string;
};

export type UserCredentials = {
  user: number;
  email: string;
  name: string;
  imgUrl: string;
  token: string;
};

export type Search = {
  search: string;
};

export type PostSong = {
  user_id: number;
  theme_id: number;
  title: string;
  performer: string;
};

export type SongParams = {
  title: string;
  performer: string;
}

export type SerieParams = {
  title: string;
  streaming: string;
}

export type MovieParams = {
  title: string;
  streaming: string;
}

export type BookParams = {
  title: string;
  author: string;
}
