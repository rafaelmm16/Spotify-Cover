import { HomeIcon, Search, Library, ChevronLeft, ChevronRight, PlayIcon } from 'lucide-react'
import { Play } from 'next/font/google'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="h-screen flex flex-col">
        <div className="flex flex-1">
          <aside className="w-72 bg-zinc-950 p-6">
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 bg-red-500 rounded-full' />
              <div className='w-3 h-3 bg-yellow-500 rounded-full' />
              <div className='w-3 h-3 bg-green-500 rounded-full' />
            </div>

            <nav className='space-y-5 mt-10'>
              <a href="" className='flex items-center gap-3 text-ms font-semibold text-zinc-200'>
                <HomeIcon />
                Home
              </a>
              <a href="" className='flex items-center gap-3 text-ms font-semibold text-zinc-200'>
                <Search />
                Search
              </a>
              <a href="" className='flex items-center gap-3 text-ms font-semibold text-zinc-200'>
                <Library />
                Your Library
              </a>


            </nav>
            <nav className='mt-6 pt-6 border-t border-zinc-800 flex flex-col gap-3'>
              <a href="" className='text-sm text-zinc-400 hover:text-zinc-100'>Playlist 1</a>

            </nav>

          </aside>
          <main className="flex-1 p-6">
            <div className='flex items-center gap-4'>
              <button className='rounded-full bg-black/40 p-1'>
                <ChevronLeft />
              </button>
              <button className='rounded-full bg-black/40 p-1'>
                <ChevronRight />
              </button>
            </div>

            <h1 className='text-semibold text-3xl mt-10'>Good Afternoon</h1>

            <div className='grid grid-cols-3 gap-4 mt-4'>
              <a href='#' className='bg-white/5 group rounded flex items-center gap-4 overflow-hidden hover:bg-white/10 transition-colors'>
                <Image src="/Capa.webp" width={104} height={104} alt='Capa do ÁLbum'/>
                <strong>1989</strong>
                <button className='w-12 h-12 flex items-center justify-center pl-1 rounded-full bg-green-600 text-black ml-auto mr-8 invisible group-hover:visible'>
                  <PlayIcon />
                </button>
              </a>
            </div>
          </main>
        </div>
      </div>
      <footer className="gg-zinc-800 border-t border-zinc-700 p-6">
        footer
      </footer>
    </main>
  )
}
