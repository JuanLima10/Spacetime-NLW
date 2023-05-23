import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex flex-wrap items-center gap-3 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          src={avatarUrl}
          alt="Avatar Profile"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="max-w-[130px] text-sm leading-snug responsive:max-w-[195px]">
        Eae, {name} qual a memória de hoje?
      </p>
    </div>
  )
}
