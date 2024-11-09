"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User } from '@/lib/types'

const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'anonymous_owl',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=owl'
  },
  {
    id: '2',
    username: 'midnight_thinker',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=midnight'
  },
  {
    id: '3',
    username: 'tech_enthusiast',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech'
  }
]

export function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<User[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const filtered = MOCK_USERS.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }

  return (
    <div className="w-full">
      <Input
        placeholder="Search users by username..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="mb-4"
      />
      {searchQuery && (
        <ScrollArea className="h-[300px] rounded-md border p-4">
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-accent rounded-lg">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">@{user.username}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No users found</p>
          )}
        </ScrollArea>
      )}
    </div>
  )
}