"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AuthDialog } from '@/components/auth-dialog'

export function CreatePost() {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement post creation with Supabase
    setTimeout(() => {
      setContent('')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guest" />
            <AvatarFallback>GU</AvatarFallback>
          </Avatar>
          <AuthDialog>
            <div className="flex-1 cursor-pointer">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] cursor-pointer"
                readOnly
              />
            </div>
          </AuthDialog>
        </div>
        <div className="flex justify-end">
          <AuthDialog>
            <Button type="button" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post"}
            </Button>
          </AuthDialog>
        </div>
      </form>
    </Card>
  )
}