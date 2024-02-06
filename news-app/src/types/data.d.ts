// ユーザー
export type User = {
  id: number
  username: string
  displayName: string
  email: string
  profileImageUrl: string
  description: string
}

// API Context
export type ApiContext = {
  apiRootUrl: string
}
