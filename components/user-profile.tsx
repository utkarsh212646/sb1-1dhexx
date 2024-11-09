"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/use-toast'

export function UserProfile() {
  const [username, setUsername] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleUpdateUsername = () => {
    if (username.trim()) {
      // TODO: Update username in Supabase
      toast({
        title: "Username updated",
        description: "Your username has been successfully updated.",
      })
      setIsEditing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
        <div>
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                />
                <Button onClick={handleUpdateUsername}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">@{username || 'anonymous_user'}</h2>
              <Button variant="link" onClick={() => setIsEditing(true)}>Edit username</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}