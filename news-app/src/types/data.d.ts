// ユーザー
export type UserForApp = {
  id: string;
  name: string;
  email: string;
  image: string;
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

export type CommentType = {
  id: string;
  authorId: string;
  authorName: string | null;
  newsId: string;
  date: Date | null;
  title: string | null;
  type: boolean;
  content: string | null;
  goodCount: number;
  badCount: number;
}
