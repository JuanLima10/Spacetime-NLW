'use client'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { FileDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from './MediaPicker'

export function NewMemoryForm() {
  const router = useRouter()
  async function HandleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)
      coverUrl = uploadResponse.data.fileUrl
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get('spacetime_session')}`,
        },
      },
    )
    router.push('/')
  }

  return (
    <form onSubmit={HandleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="mb-4 flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <FileDown />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 cursor-pointer rounded border-gray-400 bg-gray-700 text-gray-200 outline-none"
          />
          Tornar memória publica
        </label>
      </div>
      <MediaPicker />
      <textarea
        name="content"
        placeholder="Fique livre para descrever algo sobre essa experiência que você quer lembrar aqui"
        className="w-full flex-1 resize-none rounded border-0 bg-gray-700 bg-opacity-50 p-4 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
      />

      <button
        type="submit"
        className="mt-4 inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black transition-colors hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
