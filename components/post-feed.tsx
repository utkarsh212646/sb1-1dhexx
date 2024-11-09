"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle, Share } from 'lucide-react'
import { AuthDialog } from '@/components/auth-dialog'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Post } from '@/lib/types'

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    content: "Just discovered this amazing anonymous platform! Love the freedom to express myself without judgment.",
    author: {
      id: '1',
      username: "anonymous_owl",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=owl"
    },
    likes: 42,
    comments: 12,
    createdAt: "2024-02-20T10:00:00Z"
  },
  {
    id: 2,
    content: "Sometimes the most profound thoughts come when we're free to speak without the weight of our identity.",
    author: {
      id: '2',
      username: "midnight_thinker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=midnight"
    },
    likes: 28,
    comments: 5,
    createdAt: "2024-02-20T09:30:00Z"
  }
]

export function PostFeed() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [replyContent, setReplyContent] = useState('')
  const { toast } = useToast()

  const handleLike = (postId: number) => {
    if (!likedPosts.includes(postId)) {
      setLikedPosts(prev => [...prev, postId])
      toast({
        title: "Post liked!",
        description: "Your like has been recorded.",
      })
    } else {
      setLikedPosts(prev => prev.filter(id => id !== postId))
      toast({
        title: "Like removed",
        description: "Your like has been removed.",
      })
    }
  }

  const handleShare = async (post: Post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${post.author.username}'s Whispr`,
          text: post.content,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(`${post.content} - shared from Whispr`)
        toast({
          title: "Link copied!",
          description: "The post link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: "Couldn't share post",
          description: "The post link has been copied to your clipboard instead.",
          variant: "destructive",
        })
        await navigator.clipboard.writeText(`${post.content} - shared from Whispr`)
      }
    }
  }

  return (
    <div className="space-y-4">
      {MOCK_POSTS.map((post) => (
        <Card key={post.id} className="p-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">@{post.author.username}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 break-words">{post.content}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <AuthDialog>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={likedPosts.includes(post.id) ? "text-red-500" : ""}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </Button>
                </AuthDialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {post.comments}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Reply to @{post.author.username}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <div className="mb-4 pl-4 border-l-2 border-muted">
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                      </div>
                      <AuthDialog>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end">
                            <Button 
                              type="button"
                              onClick={() => {
                                toast({
                                  title: "Reply posted!",
                                  description: "Your reply has been added to the conversation.",
                                })
                                setReplyContent('')
                              }}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </AuthDialog>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleShare(post)}
                >
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}