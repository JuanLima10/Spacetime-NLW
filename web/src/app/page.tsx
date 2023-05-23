/* eslint-disable @next/next/no-img-element */
import { cookies } from 'next/headers'

import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ChevronsRight } from 'lucide-react'
import Link from 'next/link'

dayjs.locale(ptBr)

interface MemoryProps {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('spacetime_session')
  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('spacetime_session')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: MemoryProps[] = await response.data
  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div
      id="Timeline"
      className="-mt-8 flex flex-col gap-10 p-4 responsive:p-0"
    >
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-6">
          <time className="-ml-16 -mt-0.5 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[ de ]YYYY')}
          </time>
          {memory.coverUrl.includes('.mp4') ? (
            <video
              className="aspect-video w-full cursor-pointer rounded-lg object-cover"
              src={memory.coverUrl}
              controls
            />
          ) : (
            <img
              src={memory.coverUrl}
              alt="Imagem da Lembrança"
              className="aspect-video w-full rounded-lg object-cover"
            />
          )}
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 transition-colors hover:text-gray-100"
          >
            Ler mais
            <ChevronsRight />
          </Link>
        </div>
      ))}
    </div>
  )
}
