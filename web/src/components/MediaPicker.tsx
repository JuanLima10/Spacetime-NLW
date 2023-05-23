'use client'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)
  const [type, setType] = useState(false)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }

    const fileType = files[0].type
    setType(fileType.includes('video'))

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*,video/mp4"
        className="invisible h-0 w-0"
      />
      {preview && (
        <>
          {type ? (
            <video
              className="mb-4 aspect-video w-full cursor-pointer rounded-lg object-cover"
              src={preview}
              muted
              autoPlay
              controls
            />
          ) : (
            <a href={preview} target="_blank" rel="noreferrer">
              <Image
                src={preview}
                alt="Imagem Preview"
                className="mb-4 aspect-video w-full rounded-lg object-cover"
                width={854}
                height={480}
              />
            </a>
          )}
        </>
      )}
    </>
  )
}
