import { SearchUsers } from '@/components/search-users'

export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Search Users</h1>
      <SearchUsers />
    </div>
  )
}