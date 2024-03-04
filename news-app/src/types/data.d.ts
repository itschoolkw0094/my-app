// ユーザー
export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  profileImageUrl: string;
  description: string;
};

// API Context
export type ApiContext = {
  apiRootUrl: string;
};

export type PostDataType = {
  name: string;
  email: string;
  password: string;
};

export type CommentPropsType = {
  userIconUrl: string;
  userName: string;
  userId: string;
  content: string;
  goodCount: number;
  badCount: number;
};

export type ArticleType = {
  id: string;
  image: string | null;
  date: Date | null;
  title: string | null;
  content: string | null;
  article_url: string | null;
};
