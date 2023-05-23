import { Plus } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="space-y-5 text-center responsive:text-left">
      <div className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          colecione momentos marcantes da sua jornada e compatilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        href="/memories/new"
        className="hidden rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black transition-colors hover:bg-green-600 responsive:inline-block"
      >
        Cadastrar lembrança
      </Link>
      <div className="flex items-center justify-center gap-4">
        <a
          href="/#Timeline"
          className="z-10 inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm leading-none text-black transition-colors hover:bg-green-600 responsive:hidden"
        >
          Minhas Lembranças
        </a>
        <a
          href="/memories/new/#FormNewMemory"
          className="z-10 inline-block cursor-pointer rounded-full bg-green-500 px-2 py-2 font-alt text-sm leading-none text-black transition-colors hover:bg-green-600 responsive:hidden"
        >
          <Plus />
        </a>
      </div>
    </div>
  )
}
