import { Home as HomeIcon, Search, Library, PlusSquare, Heart, ChevronLeft, ChevronRight, Play, Shuffle, SkipBack, SkipForward, Repeat, Mic2, LayoutList, Server, Volume, Maximize2 } from 'lucide-react'
import Image from "next/image"


export default function Home() {
  return (
    <div className='h-screen flex flex-col'>
      <div className='flex flex-1'>
        <aside className='w-72  bg-zinc-950 p-6'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <div className='w-3 h-3 bg-green-500 rounded-full'></div>
          </div>
          <nav className='space-y-5 mt-10'>
            <a href="" className='flex items-center gap-5 text-sm font-semibold text-zinc-200'>
              <HomeIcon />
              Home
            </a>
            <a href="" className='flex items-center gap-5 text-sm font-semibold text-zinc-200'>
              <Search />
              Search
            </a>
            <a href="" className='flex items-center gap-5 text-sm font-semibold text-zinc-200'>
              <Library />
              Library
            </a>
          </nav>

          <nav className='space-y-5 mt-10'>
            <a href="" className='flex items-center gap-5 text-sm font-semibold text-zinc-200'>
              <PlusSquare /> Create Playlist
            </a>
            <a href="" className='flex items-center gap-5 text-sm font-semibold text-zinc-200'>
              <Heart /> Liked Songs</a>
          </nav>
          <h5 className='flex flex-col mt-6 border-t border-zinc-800 pt-6'>ANIVERSÁRIO</h5>
          <nav className='mt-6 flex flex-col gap-3'>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>Anos 80 preferidas</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>This is A-ha</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>As minhas preferidas</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>Hot 100 Rock</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>The best of U2</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>No Pain No Gain</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>DJ Quirino</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>Summer Eletro Hits</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>Forró Anos 90</a>
            <a href="" className='text-sm text-zinc-400 hover:text-zink-100'>Clássicas do Axé</a>
          </nav>
        </aside>
        <main className='flex-1 p-6'>
          <div className='flex items-center gap-3'>
            <button className='rounded-full bg-black/40 p-3'>
              <ChevronLeft />
            </button>
            <button className='rounded-full bg-black/40 p-3'>
              <ChevronRight />
            </button>
          </div>
          <h1 className='font-semibold text-3xl mt-10'>
            Good Aftenoon
          </h1>

          <div className='grid grid-cols-3 gap-4 mt-4'>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={95} height={95} />
              <strong> This is U2</strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3 invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={90} height={90} />
              <strong> This is Duran Duran</strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3 invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={90} height={90} />
              <strong> This is Metallica</strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3 invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={90} height={90} />
              <strong> This is Muse</strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3 invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={90} height={90} />
              <strong> This is Barão Vermelho </strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3   invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
            <a className='bg-white/10 group flex gap-4 items-center rounded overflow-hidden hover:bg-white/20 transition-colors'>
              <Image src="/album.jpg" alt="Imagem do Album" width={90} height={90} />
              <strong> This is Depeche Mode</strong>
              <button className={`
                          w-12 h-12
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-green-400
                          text-black ml-auto mr-3 invisible
                          group-hover:visible
                    
                    `}>
                <Play />
              </button>
            </a>
          </div>
          <div className='flex justify-between w-full items-center mt-10 mb-6' >
            <h2 className='font-semibold text-2xl' >Feito para Antonio Quirino</h2>
            <a href="">Mostrar tudo</a>
          </div>
          <div className='grid grid-cols-6 gap-4 mt-4'>
            <a className='bg-white/5 flex flex-col gap-2 p-3 rounded-md hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong className='font-semibold'>Daily Mix 1</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
            <a className='bg-white/5 flex flex-col gap-2 p-3 rounded-md hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong>Daily Mix 2</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
            <a className='bg-white/5 flex flex-col gap-2 p-3 rounded-md hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong>Daily Mix 3</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
            <a className='bg-white/5 flex flex-col p-3 rounded hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong>Daily Mix 4</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
            <a className='bg-white/5 flex flex-col gap-2 p-3 rounded-md hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong>Daily Mix 5</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
            <a className='bg-white/5 flex flex-col gap-2 p-3 rounded-md hover:bg-white/10'>
              <Image src="/album.jpg" alt="Imagem do Album" width={156} height={156} />
              <strong>Daily Mix 6</strong>
              <span className='text-sm text-zinc-500'>Red Hot Chilli pepers</span>
            </a>
          </div>
        </main>
      </div>
      <footer className='bg-zinc-800 border-t border-zinc-700 p-3 flex items-center justify-between fixed bottom-0 w-full'>
        <div className='flex itemns-center gap-3'>
          <Image src="/album.jpg" alt="Imagem do Album" width={56} height={56} />
          <div className='flex flex-col '>
            <strong className='font-normal text-zinc-500'>Walk On</strong>
            <span className='text-xs text-zinc-400'>U2</span>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-4'>
            <Shuffle className='text-zinc-200' size={20} />
            <SkipBack className='text-zinc-200' size={20} />
            <button className={`
                          w-8 h-8
                          flex  items-center
                          justify-center pl-1
                          rounded-full bg-white
                          text-black
                    `}>
              <Play />
            </button>
            <SkipForward className='text-zinc-200' size={20} />
            <Repeat className='text-zinc-200' size={20} />
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-zinc-400'>0:31</span>
            <div className='h-1 rounded-full w-96 bg-zinc-400'>
              <div className='bg-zinc-200 w-40'></div>
            </div>
            <span className='text-xs text-zinc-400'>4:02</span>
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Mic2 size={20} />
          <LayoutList size={20} />
          <Server size={20} />
          <div className='flex items-center gap-2'>
            <Volume size={20} />
          </div>
          <Maximize2 size={20} />
        </div>
      </footer>
    </div>
  )
}