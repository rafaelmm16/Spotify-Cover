'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Home as HomeIcon,
  Search,
  Library,
  PlusSquare,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Mic2,
  ListMusic,
  Laptop2,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  Sparkles,
  Music,
  SlidersHorizontal,
  X
} from 'lucide-react'

interface Track {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: number
  color: string
}

const ALL_TRACKS: Track[] = [
  {
    id: 'glee',
    title: "Don't Stop Believin'",
    artist: 'Glee Cast',
    album: 'This is Glee',
    cover: '/Spotify-Cover/glee.jpg',
    duration: 230,
    color: 'from-blue-700/40',
  },
  {
    id: 'sabrina',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: 'Short n\' Sweet',
    cover: '/Spotify-Cover/sabrina.jpg',
    duration: 175,
    color: 'from-amber-700/40',
  },
  {
    id: 'billie',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    cover: '/Spotify-Cover/billie.jpg',
    duration: 183,
    color: 'from-indigo-700/40',
  },
  {
    id: 'yung',
    title: 'Aquário',
    artist: 'YUNG LI',
    album: 'This is YUNG LI',
    cover: '/Spotify-Cover/yung.jpg',
    duration: 165,
    color: 'from-purple-700/40',
  },
  {
    id: 'matue',
    title: 'Máquina do Tempo',
    artist: 'Matuê',
    album: '333',
    cover: '/Spotify-Cover/matue4.webp',
    duration: 195,
    color: 'from-rose-700/40',
  },
  {
    id: 'katseye',
    title: 'Touch',
    artist: 'KATSEYE',
    album: 'SIS (Soft Is Strong)',
    cover: '/Spotify-Cover/katseye.jpg',
    duration: 138,
    color: 'from-pink-700/40',
  },
  {
    id: 'daily1',
    title: 'Daily Mix 1',
    artist: 'Lady Gaga, Dua Lipa, Katy Perry',
    album: 'Mix Pop',
    cover: '/Spotify-Cover/daily1.jpg',
    duration: 215,
    color: 'from-emerald-700/40',
  },
  {
    id: 'daily2',
    title: 'Daily Mix 2',
    artist: 'Lana Del Rey, Lorde, Mitski',
    album: 'Indie Vibes',
    cover: '/Spotify-Cover/daily2.jpg',
    duration: 245,
    color: 'from-teal-700/40',
  },
  {
    id: 'daily3',
    title: 'Daily Mix 3',
    artist: 'Taylor Swift, Olivia Rodrigo, Gracie Abrams',
    album: 'Heartbreak Hits',
    cover: '/Spotify-Cover/daily3.jpg',
    duration: 222,
    color: 'from-sky-700/40',
  },
  {
    id: 'daily4',
    title: 'Daily Mix 4',
    artist: 'The Weeknd, Post Malone, Drake',
    album: 'R&B / Hip-hop',
    cover: '/Spotify-Cover/daily4.jpg',
    duration: 210,
    color: 'from-violet-700/40',
  },
  {
    id: 'daily5',
    title: 'Daily Mix 5',
    artist: 'Billie Eilish, Finneas, girl in red',
    album: 'Chill Alt',
    cover: '/Spotify-Cover/daily5.jpg',
    duration: 192,
    color: 'from-cyan-700/40',
  },
  {
    id: 'daily6',
    title: 'Daily Mix 6',
    artist: 'Eminem, 50 Cent, Dr. Dre',
    album: 'Classic Hip-Hop',
    cover: '/Spotify-Cover/daily6.jpg',
    duration: 284,
    color: 'from-orange-700/40',
  },
  {
    id: 'u2',
    title: 'Walk On',
    artist: 'U2',
    album: 'All That You Can\'t Leave Behind',
    cover: '/Spotify-Cover/U2.jpg',
    duration: 242,
    color: 'from-yellow-700/40',
  },
]

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<Track>(ALL_TRACKS[12]) // U2 default
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(31)
  const [volume, setVolume] = useState<number>(0.75)
  const [previousVolume, setPreviousVolume] = useState<number>(0.75)
  const [isShuffle, setIsShuffle] = useState<boolean>(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(new Set(['glee', 'sabrina', 'u2']))
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'library'>('home')
  const [filterCategory, setFilterCategory] = useState<'all' | 'music' | 'podcasts'>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [playlists, setPlaylists] = useState<string[]>([
    'Anos 80 preferidas',
    'This is A-ha',
    'As minhas preferidas',
    'Hot 100 Rock',
    'The best of Glee',
    'No Pain No Gain',
    'DJ Juninho',
    'Summer Eletro Hits',
    'Forró Anos 90',
    'Clássicas do Forró',
  ])

  // Web Audio Context reference for pleasant Lo-Fi chord synth sound
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const synthTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Dynamic greeting based on current local hour
  const [greeting, setGreeting] = useState<string>('Boa tarde')
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting('Bom dia')
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde')
    } else {
      setGreeting('Boa noite')
    }
  }, [])

  // Web Audio Synthesizer initializer
  const startSynth = () => {
    if (typeof window === 'undefined') return
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
        const gainNode = audioCtxRef.current.createGain()
        gainNode.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime)
        gainNode.connect(audioCtxRef.current.destination)
        gainNodeRef.current = gainNode
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      // Pleasant chord progression simulation (Lo-Fi soothing tones)
      const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ]
      let chordIndex = 0

      const playChord = () => {
        if (!audioCtxRef.current || !gainNodeRef.current || !isPlaying) return
        const ctx = audioCtxRef.current
        const now = ctx.currentTime
        const notes = chords[chordIndex % chords.length]
        chordIndex++

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator()
          const noteGain = ctx.createGain()

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
          osc.frequency.setValueAtTime(freq, now)

          noteGain.gain.setValueAtTime(0.001, now)
          noteGain.gain.exponentialRampToValueAtTime(0.04 * (volume || 0.1), now + 0.1)
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8)

          osc.connect(noteGain)
          noteGain.connect(gainNodeRef.current!)

          osc.start(now)
          osc.stop(now + 2.0)
        })
      }

      playChord()
      if (synthTimerRef.current) clearInterval(synthTimerRef.current)
      synthTimerRef.current = setInterval(playChord, 2000)
    } catch {
      // AudioContext not permitted without interaction or unsupported
    }
  }

  const stopSynth = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current)
      synthTimerRef.current = null
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime)
    }
  }

  // Update master volume on gain node
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime)
    }
  }, [volume])

  // Playback timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      startSynth()
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            if (repeatMode === 'one') {
              return 0
            } else if (repeatMode === 'all' || isShuffle) {
              handleNextTrack()
              return 0
            } else {
              setIsPlaying(false)
              stopSynth()
              return 0
            }
          }
          return prev + 1
        })
      }, 1000)
    } else {
      stopSynth()
    }

    return () => {
      clearInterval(interval)
      stopSynth()
    }
  }, [isPlaying, currentTrack, repeatMode, isShuffle])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playTrack = (track: Track) => {
    if (currentTrack.id === track.id) {
      togglePlay()
    } else {
      setCurrentTrack(track)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }

  const handleNextTrack = () => {
    const currentIndex = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id)
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * ALL_TRACKS.length)
      setCurrentTrack(ALL_TRACKS[randomIndex])
    } else {
      const nextIndex = (currentIndex + 1) % ALL_TRACKS.length
      setCurrentTrack(ALL_TRACKS[nextIndex])
    }
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const handlePrevTrack = () => {
    if (currentTime > 3) {
      setCurrentTime(0)
      return
    }
    const currentIndex = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + ALL_TRACKS.length) % ALL_TRACKS.length
    setCurrentTrack(ALL_TRACKS[prevIndex])
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const toggleLike = (trackId: string) => {
    setLikedTrackIds((prev) => {
      const next = new Set(prev)
      if (next.has(trackId)) {
        next.delete(trackId)
      } else {
        next.add(trackId)
      }
      return next
    })
  }

  const toggleMute = () => {
    if (volume > 0) {
      setPreviousVolume(volume)
      setVolume(0)
    } else {
      setVolume(previousVolume > 0 ? previousVolume : 0.75)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleCreatePlaylist = () => {
    const playlistName = prompt('Nome da nova playlist:', `Minha Playlist #${playlists.length + 1}`)
    if (playlistName && playlistName.trim()) {
      setPlaylists((prev) => [playlistName.trim(), ...prev])
    }
  }

  // Filtered tracks
  const quickMixTracks = ALL_TRACKS.slice(0, 6)
  const dailyMixTracks = ALL_TRACKS.slice(6, 12)

  const matchesSearch = (track: Track) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      track.title.toLowerCase().includes(q) ||
      track.artist.toLowerCase().includes(q) ||
      track.album.toLowerCase().includes(q)
    )
  }

  const filteredQuickMixes = quickMixTracks.filter(matchesSearch)
  const filteredDailyMixes = dailyMixTracks.filter(matchesSearch)

  const isCurrentLiked = likedTrackIds.has(currentTrack.id)

  return (
    <div className="h-screen w-screen bg-black text-zinc-100 flex flex-col select-none overflow-hidden p-2 gap-2 font-sans">
      {/* Top Application Area (Sidebar + Main Content) */}
      <div className="flex flex-1 gap-2 min-h-0 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-64 md:w-72 bg-[#121212] rounded-lg flex flex-col shrink-0 p-4 overflow-hidden border border-white/5 shadow-2xl">
          {/* Mac window action dots */}
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-3 h-3 bg-[#ff5f57] rounded-full border border-black/20 hover:opacity-80 transition cursor-pointer" />
            <div className="w-3 h-3 bg-[#febc2e] rounded-full border border-black/20 hover:opacity-80 transition cursor-pointer" />
            <div className="w-3 h-3 bg-[#28c840] rounded-full border border-black/20 hover:opacity-80 transition cursor-pointer" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 px-2">
            <button
              onClick={() => {
                setActiveTab('home')
                setSearchQuery('')
              }}
              className={`flex items-center gap-4 text-sm font-semibold transition-all w-full text-left ${
                activeTab === 'home' && !searchQuery ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <HomeIcon className={activeTab === 'home' && !searchQuery ? 'text-[#1ed760]' : ''} size={22} />
              <span>Início</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-4 text-sm font-semibold transition-all w-full text-left ${
                activeTab === 'search' || searchQuery ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Search className={activeTab === 'search' || searchQuery ? 'text-[#1ed760]' : ''} size={22} />
              <span>Buscar</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-4 text-sm font-semibold transition-all w-full text-left ${
                activeTab === 'library' ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Library className={activeTab === 'library' ? 'text-[#1ed760]' : ''} size={22} />
              <span>Sua Biblioteca</span>
            </button>
          </nav>

          {/* Action Links */}
          <div className="mt-8 space-y-4 px-2 pt-4 border-t border-zinc-800/80">
            <button
              onClick={handleCreatePlaylist}
              className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition group w-full text-left"
            >
              <div className="w-7 h-7 bg-zinc-800 group-hover:bg-zinc-700 rounded-sm flex items-center justify-center text-zinc-300 group-hover:text-white transition">
                <PlusSquare size={18} />
              </div>
              <span>Criar playlist</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('library')
                setSearchQuery('')
              }}
              className="flex items-center gap-4 text-sm font-medium text-zinc-400 hover:text-white transition group w-full text-left"
            >
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-emerald-500 rounded-sm flex items-center justify-center text-white shadow-sm">
                <Heart size={16} fill="white" />
              </div>
              <div className="flex flex-col">
                <span>Músicas Curtidas</span>
                <span className="text-[11px] text-zinc-500">{likedTrackIds.size} músicas</span>
              </div>
            </button>
          </div>

          {/* Playlists Title */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/60 px-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            <span>Playlists</span>
            <span className="text-[10px] text-zinc-600 font-normal">{playlists.length}</span>
          </div>

          {/* Scrollable Playlist List */}
          <div className="mt-3 flex-1 overflow-y-auto space-y-2 pr-2 text-sm text-zinc-400">
            {playlists.map((playlist, idx) => (
              <div
                key={idx}
                className="group flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-white/5 hover:text-zinc-100 transition cursor-pointer"
              >
                <span className="truncate">{playlist}</span>
                <Music size={12} className="opacity-0 group-hover:opacity-60 text-zinc-400 shrink-0" />
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[#121212] rounded-lg flex flex-col min-w-0 overflow-hidden relative border border-white/5 shadow-2xl">
          {/* Ambient dynamic background gradient that reflects the playing song's color */}
          <div
            className={`absolute top-0 left-0 right-0 h-96 bg-gradient-to-b ${currentTrack.color} to-transparent pointer-events-none transition-all duration-700 opacity-70`}
          />

          {/* Top Bar Navigation */}
          <header className="relative z-10 flex items-center justify-between p-4 md:px-8 bg-black/20 backdrop-blur-md border-b border-white/5">
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/90 transition text-zinc-300 hover:text-white"
                title="Voltar"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/90 transition text-zinc-300 hover:text-white"
                title="Avançar"
              >
                <ChevronRight size={20} />
              </button>

              {/* Top search input */}
              <div className="relative ml-2 w-48 sm:w-64 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                <input
                  type="text"
                  placeholder="O que você quer ouvir?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/90 text-sm text-white placeholder-zinc-400 rounded-full pl-9 pr-8 py-2 border border-white/10 focus:outline-none focus:border-[#1ed760] focus:ring-1 focus:ring-[#1ed760] transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Profile badge and pill buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-full py-1 px-3 text-xs font-bold text-white border border-white/10 cursor-pointer">
                <Sparkles size={13} className="text-[#1ed760]" />
                <span>Explorar Premium</span>
              </div>

              <div className="flex items-center gap-2 bg-black/60 hover:bg-black/90 transition rounded-full p-1 pr-3 border border-white/10 cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1ed760] to-emerald-300 text-black font-bold text-xs flex items-center justify-center shadow">
                  R
                </div>
                <span className="text-xs font-semibold text-zinc-200">Rafael</span>
              </div>
            </div>
          </header>

          {/* Main Content Body */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-8 relative z-10 pb-10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  filterCategory === 'all'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Tudo
              </button>
              <button
                onClick={() => setFilterCategory('music')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  filterCategory === 'music'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Música
              </button>
              <button
                onClick={() => setFilterCategory('podcasts')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  filterCategory === 'podcasts'
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Podcasts
              </button>
            </div>

            {/* Greeting Header */}
            <div>
              <h1 className="font-bold text-2xl md:text-3xl text-white tracking-tight">
                {greeting}
              </h1>
            </div>

            {/* Quick Mix Cards (Grid 3 cols) */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredQuickMixes.map((track) => {
                  const isTrackActive = currentTrack.id === track.id
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className={`group flex items-center gap-4 bg-white/5 hover:bg-white/15 rounded-md overflow-hidden cursor-pointer transition-all duration-300 relative border border-white/5 hover:border-white/20 shadow-md ${
                        isTrackActive ? 'bg-white/15 border-white/20' : ''
                      }`}
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-zinc-800">
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <p className={`font-bold text-sm truncate ${isTrackActive ? 'text-[#1ed760]' : 'text-white'}`}>
                          {track.album || track.title}
                        </p>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">{track.artist}</p>
                      </div>

                      {/* Equalizer or Play Button on hover */}
                      <div className="mr-4 shrink-0">
                        {isTrackActive && isPlaying ? (
                          <div className="flex items-end gap-1 h-5 w-5 justify-center">
                            <span className="w-1 bg-[#1ed760] rounded-full equalizer-bar-1" />
                            <span className="w-1 bg-[#1ed760] rounded-full equalizer-bar-2" />
                            <span className="w-1 bg-[#1ed760] rounded-full equalizer-bar-3" />
                            <span className="w-1 bg-[#1ed760] rounded-full equalizer-bar-4" />
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              playTrack(track)
                            }}
                            className={`w-11 h-11 flex items-center justify-center rounded-full bg-[#1ed760] text-black shadow-xl drop-shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
                              isTrackActive
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                            }`}
                          >
                            {isTrackActive && isPlaying ? (
                              <Pause size={20} fill="currentColor" />
                            ) : (
                              <Play size={20} fill="currentColor" className="ml-0.5" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredQuickMixes.length === 0 && (
                <div className="py-8 text-center text-zinc-400 text-sm">
                  Nenhuma música encontrada para &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Section 2: Feito para Rafael */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl text-white tracking-tight">
                    Feito para Rafael
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Sua trilha sonora diária personalizada
                  </p>
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-zinc-400 hover:text-white transition tracking-wider hover:underline"
                >
                  Mostrar tudo
                </button>
              </div>

              {/* Daily Mixes Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredDailyMixes.map((track) => {
                  const isTrackActive = currentTrack.id === track.id
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className={`group bg-[#181818]/80 hover:bg-[#282828] p-3.5 rounded-lg flex flex-col gap-3 cursor-pointer transition-all duration-300 border border-white/5 hover:border-white/10 shadow-lg relative ${
                        isTrackActive ? 'bg-[#282828] border-white/20 ring-1 ring-[#1ed760]/30' : ''
                      }`}
                    >
                      {/* Album Cover */}
                      <div className="relative aspect-square w-full rounded-md overflow-hidden bg-zinc-800 shadow-md">
                        <Image
                          src={track.cover}
                          alt={track.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />

                        {/* Floating Play Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            playTrack(track)
                          }}
                          className={`absolute bottom-2 right-2 w-11 h-11 flex items-center justify-center rounded-full bg-[#1ed760] text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ${
                            isTrackActive && isPlaying
                              ? 'opacity-100 translate-y-0 scale-100 shadow-black/80'
                              : 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 shadow-black/60'
                          }`}
                        >
                          {isTrackActive && isPlaying ? (
                            <Pause size={20} fill="currentColor" />
                          ) : (
                            <Play size={20} fill="currentColor" className="ml-0.5" />
                          )}
                        </button>
                      </div>

                      {/* Card Info */}
                      <div className="flex flex-col min-w-0">
                        <strong
                          className={`font-bold text-sm truncate ${
                            isTrackActive ? 'text-[#1ed760]' : 'text-zinc-100'
                          }`}
                        >
                          {track.title}
                        </strong>
                        <span className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-snug">
                          {track.artist}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredDailyMixes.length === 0 && (
                <div className="py-8 text-center text-zinc-400 text-sm">
                  Nenhum mix encontrado para &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Section 3: Tocadas Recentemente */}
            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="font-bold text-xl md:text-2xl text-white tracking-tight">
                    Tocadas recentemente
                  </h2>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg border border-white/5 overflow-hidden">
                <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2.5 text-xs font-semibold text-zinc-400 border-b border-white/5 uppercase tracking-wider">
                  <span className="w-6 text-center">#</span>
                  <span>Título</span>
                  <span className="hidden md:inline">Álbum</span>
                  <span className="text-right">Duração</span>
                </div>

                <div className="divide-y divide-white/5">
                  {ALL_TRACKS.slice(0, 6).map((track, index) => {
                    const isTrackActive = currentTrack.id === track.id
                    const isLiked = likedTrackIds.has(track.id)
                    return (
                      <div
                        key={track.id}
                        onClick={() => playTrack(track)}
                        className={`group grid grid-cols-[auto_1fr_1fr_auto] gap-4 px-4 py-2.5 items-center hover:bg-white/10 transition cursor-pointer text-sm ${
                          isTrackActive ? 'bg-white/10 text-[#1ed760]' : 'text-zinc-300'
                        }`}
                      >
                        <div className="w-6 flex items-center justify-center text-xs">
                          {isTrackActive && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 bg-[#1ed760] equalizer-bar-1" />
                              <span className="w-0.5 bg-[#1ed760] equalizer-bar-2" />
                              <span className="w-0.5 bg-[#1ed760] equalizer-bar-3" />
                            </div>
                          ) : (
                            <>
                              <span className="group-hover:hidden text-zinc-500">{index + 1}</span>
                              <Play size={12} fill="currentColor" className="hidden group-hover:inline text-white" />
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden bg-zinc-800">
                            <Image src={track.cover} alt={track.title} fill className="object-cover" unoptimized />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`font-semibold truncate ${isTrackActive ? 'text-[#1ed760]' : 'text-white'}`}>
                              {track.title}
                            </span>
                            <span className="text-xs text-zinc-400 truncate">{track.artist}</span>
                          </div>
                        </div>

                        <span className="hidden md:inline text-xs text-zinc-400 truncate">
                          {track.album}
                        </span>

                        <div className="flex items-center gap-3 justify-end text-xs text-zinc-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(track.id)
                            }}
                            className={`transition ${isLiked ? 'text-[#1ed760]' : 'opacity-0 group-hover:opacity-100 hover:text-white'}`}
                          >
                            <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                          </button>
                          <span>{formatTime(track.duration)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Persistent Bottom Player Bar */}
      <footer className="h-20 bg-[#181818] rounded-lg px-4 flex items-center justify-between border border-white/5 shrink-0 shadow-2xl relative z-20">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3.5 w-1/4 min-w-[180px]">
          <div className="relative w-14 h-14 rounded-md overflow-hidden bg-zinc-800 shrink-0 shadow-md">
            <Image
              src={currentTrack.cover}
              alt={currentTrack.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex flex-col min-w-0 justify-center">
            <span className="font-semibold text-sm text-white truncate hover:underline cursor-pointer">
              {currentTrack.title}
            </span>
            <span className="text-xs text-zinc-400 truncate hover:underline cursor-pointer hover:text-zinc-200">
              {currentTrack.artist}
            </span>
          </div>

          <button
            onClick={() => toggleLike(currentTrack.id)}
            className={`transition ml-2 p-1 ${
              isCurrentLiked ? 'text-[#1ed760]' : 'text-zinc-400 hover:text-white'
            }`}
            title={isCurrentLiked ? 'Remover das Músicas Curtidas' : 'Salvar nas Músicas Curtidas'}
          >
            <Heart size={18} fill={isCurrentLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Center: Controls & Seek Bar */}
        <div className="flex flex-col items-center gap-2 max-w-[45%] w-full">
          {/* Action buttons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`transition relative ${
                isShuffle ? 'text-[#1ed760]' : 'text-zinc-400 hover:text-white'
              }`}
              title="Ordem aleatória"
            >
              <Shuffle size={18} />
              {isShuffle && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />}
            </button>

            <button
              onClick={handlePrevTrack}
              className="text-zinc-400 hover:text-white transition"
              title="Voltar música"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition shadow-md"
              title={isPlaying ? 'Pausar' : 'Tocar'}
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNextTrack}
              className="text-zinc-400 hover:text-white transition"
              title="Avançar música"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={() => {
                if (repeatMode === 'off') setRepeatMode('all')
                else if (repeatMode === 'all') setRepeatMode('one')
                else setRepeatMode('off')
              }}
              className={`transition relative ${
                repeatMode !== 'off' ? 'text-[#1ed760]' : 'text-zinc-400 hover:text-white'
              }`}
              title="Repetir"
            >
              <Repeat size={18} />
              {repeatMode !== 'off' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1ed760] rounded-full" />
              )}
            </button>
          </div>

          {/* Progress Seek Bar */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-[11px] text-zinc-400 tabular-nums w-8 text-right">
              {formatTime(currentTime)}
            </span>

            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const ratio = (e.clientX - rect.left) / rect.width
                setCurrentTime(Math.floor(ratio * currentTrack.duration))
              }}
              className="group h-1 hover:h-1.5 rounded-full flex-1 bg-zinc-600/60 relative cursor-pointer transition-all"
            >
              <div
                className="h-full bg-white group-hover:bg-[#1ed760] rounded-full relative transition-colors"
                style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
              </div>
            </div>

            <span className="text-[11px] text-zinc-400 tabular-nums w-8">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Right: Sound & Secondary Controls */}
        <div className="flex items-center gap-3 w-1/4 justify-end text-zinc-400">
          <button className="hover:text-white transition p-1" title="Letra">
            <Mic2 size={17} />
          </button>
          <button className="hover:text-white transition p-1" title="Fila">
            <ListMusic size={17} />
          </button>
          <button className="hover:text-white transition p-1" title="Dispositivos">
            <Laptop2 size={17} />
          </button>

          {/* Interactive Volume Slider */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="hover:text-white transition p-1" title="Mudo">
              {volume === 0 ? (
                <VolumeX size={18} />
              ) : volume < 0.5 ? (
                <Volume1 size={18} />
              ) : (
                <Volume2 size={18} />
              )}
            </button>

            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const val = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
                setVolume(val)
              }}
              className="group h-1 hover:h-1.5 w-20 md:w-24 bg-zinc-600/60 rounded-full relative cursor-pointer transition-all"
            >
              <div
                className="h-full bg-white group-hover:bg-[#1ed760] rounded-full relative transition-colors"
                style={{ width: `${volume * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow" />
              </div>
            </div>
          </div>

          <button className="hover:text-white transition p-1 hidden sm:inline" title="Tela cheia">
            <Maximize2 size={17} />
          </button>
        </div>
      </footer>
    </div>
  )
}