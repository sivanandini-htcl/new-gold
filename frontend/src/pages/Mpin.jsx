import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const MpinPage = ({ onSuccess, onBack }) => {

  const [pin, setPin] = useState([])
  const [status, setStatus] = useState('idle')
  const [shake, setShake] = useState(false)
  const navigate=useNavigate();

  const CORRECT_MPIN = '123456'

  const handleKey = (val) => {

    if (status === 'loading' || status === 'success') return

    if (val === 'del') {
      setPin((prev) => prev.slice(0, -1))
      setStatus('idle')
      return
    }

    if (pin.length >= 6) return

    const next = [...pin, val]
    setPin(next)
  }

  const handleVerify = () => {

  if (pin.length < 6) return

  setStatus('loading')

  setTimeout(() => {

    if (pin.join('') === CORRECT_MPIN) {

      navigate('/wallet')

    } else {

      setStatus('error')
      setShake(true)

      setTimeout(() => {
        setShake(false)
        setPin([])
        setStatus('idle')
      }, 700)
    }

  }, 800)
}

  const keys = [
    '1','2','3',
    '4','5','6',
    '7','8','9',
    'del','0','check'
  ]

  return (

    <div className=' bg-[#0a0a12] flex flex-col items-center justify-between py-3  px-6 z-50 overflow-hidden'>

      {/* Glow */}
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none' />

      {/* Back */}
      <div className='relative w-full max-w-xs flex items-center'>

        <button
          onClick={onBack}
          className='w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 active:scale-90 transition-all'
        >
          <svg
            width='16'
            height='16'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2.5'
          >
            <path d='M19 12H5M12 5l-7 7 7 7' />
          </svg>
        </button>

      </div>

      {/* Title */}
      <div className='relative flex flex-col items-center gap-10'>

        <div className='flex flex-col items-center gap-2'>

          <div className='w-12 h-12 rounded-2xl bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-1'>

            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#c9a84c'
              strokeWidth='2'
            >
              <rect x='3' y='11' width='18' height='11' rx='2' />
              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
            </svg>

          </div>

          <h1 className='text-2xl font-bold text-white tracking-tight'>
            Enter your PIN
          </h1>

          <p className='text-xs text-white/30 tracking-wide'>
{status === 'error'
  ? 'Incorrect PIN. Try again.'
  : 'Enter your 6-digit MPIN'}

          </p>

        </div>

        {/* Dots */}
        <div
          className={`flex gap-4 ${shake ? 'animate-bounce' : ''}`}
        >

          {[...Array(6)].map((_, i) => {

            const filled = pin[i] !== undefined

            return (

              <div
                key={i}
                className={`
                  w-5 h-5 rounded-full border-2 transition-all duration-200 mb-10
                  ${status === 'error'
                    ? 'border-red-500 bg-red-500'

                    : filled
                    ? 'border border-background bg-white/70 shadow-[0_0_10px_rgba(201,168,76,0.45)] scale-110'
                    : 'border-white/15 bg-transparent'
                  }
                `}
              />

            )
          })}

        </div>

        {/* Loading */}
        {status === 'loading' && (

          <div className='w-5 h-5 rounded-full border-2 border-[#c9a84c]/20 border-t-[#c9a84c] animate-spin' />

        )}

      </div>

      {/* Numpad */}
      <div className='relative w-full max-w-xs mb-10'>

        <div className='grid grid-cols-3 gap-3'>

          {keys.map((key, idx) => {

            if (key === 'del') {

              return (

                <button
                  key={idx}
                  onPointerDown={() => handleKey('del')}
                  className='h-16 rounded-2xl flex items-center justify-center bg-white/[0.04] hover:bg-white/10 active:scale-90 transition-all border border-white/5'
                >

                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='rgba(255,255,255,0.5)'
                    strokeWidth='2'
                  >
                    <path d='M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z' />
                    <line x1='18' y1='9' x2='12' y2='15' />
                    <line x1='12' y1='9' x2='18' y2='15' />
                  </svg>

                </button>
              )
            }

            if (key === 'check') {

              return (

                <button
                  key={idx}
                  onPointerDown={handleVerify}
                  disabled={
                    pin.length < 6 ||
                    status === 'loading' ||
                    status === 'success'
                  }
                  className={`
                    h-16 rounded-2xl flex items-center justify-center
                    transition-all border active:scale-90
                    ${pin.length === 6 && status === 'idle'
                      ? 'bg-[#c9a84c] border-[#c9a84c]'
                      : 'bg-white/[0.04] border-white/5'
                    }
                    ${pin.length < 6
                      ? 'opacity-40 cursor-not-allowed'
                      : ''
                    }
                  `}
                >

                  {status === 'success' ? (

                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='#22c55e'
                      strokeWidth='2.5'
                      className='animate-pulse'
                    >
                      <path d='M20 6L9 17l-5-5' />
                    </svg>

                  ) : (

                    <svg
                      width='22'
                      height='22'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke={
                        pin.length === 6 && status === 'idle'
                          ? '#0a0a12'
                          : 'rgba(255,255,255,0.3)'
                      }
                      strokeWidth='2.5'
                    >
                      <path d='M20 6L9 17l-5-5' />
                    </svg>

                  )}

                </button>
              )
            }

            return (

              <button
                key={idx}
                onPointerDown={() => handleKey(key)}
                className='h-16 rounded-2xl flex items-center justify-center bg-white/[0.04] hover:bg-white/10 active:scale-90 active:bg-[#c9a84c]/10 transition-all border border-white/5 hover:border-white/10'
              >

                <span className='text-xl font-semibold text-white'>
                  {key}
                </span>

              </button>
            )
          })}

        </div>

        <p className='text-center text-[10px] text-white/20 mt-5 tracking-widest uppercase'>

          Forgot MPIN?{' '}

          <span className='text-[#c9a84c]/50 cursor-pointer hover:text-[#c9a84c] transition-colors'>
            Reset
          </span>

        </p>

      </div>

    </div>
  )
}

export default MpinPage