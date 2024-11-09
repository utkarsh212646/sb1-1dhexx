export interface User {
  id: string
  username: string
  avatar: string
}

export interface Post {
  id: number
  content: string
  author: User
  likes: number
  comments: number
  createdAt: string
}