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
  id: number;
  name: string;
  imgUrl: string;
  token: string;
};

export type UserCreated = {
  id: number;
  name: string;
  email: string;
  imgUrl: string;
};

export type Search = {
  search: string;
};

export type ThemeTitle = {
  title: string;
};

export type PostSong = {
  user_id?: number;
  theme_id: number;
  title: string;
  performer: string;
};

export type PostSerie = {
  user_id?: number;
  title: string;
  streaming: string;
  theme_id: number;
};

export type PostMovie = {
  user_id?: number;
  title: string;
  streaming: string;
  theme_id: number;
};

export type PostBook = {
  user_id?: number;
  title: string;
  author: string;
  theme_id: number;
};

export type ThemeReferences = {
  User: {
    name: string;
  };
  Song: {
    id: number;
    title: string;
    performer: string;
  }[];
  Serie: {
    id: number;
    title: string;
    streaming: string;
  }[];
  Movie: {
    id: number;
    title: string;
    streaming: string;
  }[];
  Book: {
    id: number;
    title: string;
    author: string;
  }[];
};

export type ThemeParams = {
  id: number;
  title: string;
};
