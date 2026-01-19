import { useCallback, useEffect, useMemo, useState } from 'react'
import SpeakerCard from '../cards/SpeakerCard'

const AUTO_PLAY_INTERVAL = 7000

const BREAKPOINTS = [
  { query: '(min-width: 1280px)', slides: 3 },
  { query: '(min-width: 1024px)', slides: 2 },
]

const SpeakerCarousel = ({ speakers = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  const items = useMemo(() => (speakers?.length ? speakers.filter(Boolean) : []), [speakers])
  const maxIndex = useMemo(
    () => Math.max(0, items.length - slidesPerView),
    [items.length, slidesPerView],
  )
  const isMultiSlide = maxIndex > 0
  const slideWidthPercent = useMemo(() => 100 / slidesPerView, [slidesPerView])
  const pageCount = maxIndex + 1

  useEffect(() => {
    const updateSlidesPerView = () => {
      const matched = BREAKPOINTS.find((bp) => window.matchMedia(bp.query).matches)
      setSlidesPerView(matched?.slides || 1)
    }

    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    return () => window.removeEventListener('resize', updateSlidesPerView)
  }, [])

  useEffect(() => {
    if (activeIndex > maxIndex) setActiveIndex(maxIndex)
  }, [maxIndex, activeIndex])

  useEffect(() => {
    if (!isMultiSlide) return undefined

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, AUTO_PLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [isMultiSlide, maxIndex])

  const goTo = useCallback(
    (index) => {
      if (!isMultiSlide) return
      setActiveIndex(Math.max(0, Math.min(index, maxIndex)))
    },
    [isMultiSlide, maxIndex],
  )

  const next = useCallback(() => {
    if (!isMultiSlide) return
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [isMultiSlide, maxIndex])

  const prev = useCallback(() => {
    if (!isMultiSlide) return
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [isMultiSlide, maxIndex])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="relative" aria-live="polite">
      <div className="overflow-hidden rounded-[32px] px-2 py-6 shadow-[0_26px_60px_rgba(83,48,33,0.14)] sm:px-4">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * slideWidthPercent}%)` }}
        >
          {items.map((speaker) => (
            <div
              key={speaker.id}
              className="box-border w-full flex-shrink-0 px-2 sm:px-3"
              style={{ width: `${slideWidthPercent}%` }}
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
      </div>

      {isMultiSlide ? (
        <>
          <div className="absolute inset-y-0 left-0 hidden items-center pl-2 lg:flex">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-brown-700 text-2xl shadow-[0_8px_16px_rgba(83,48,33,0.12)] transition duration-200 hover:bg-brand-brown-50"
              aria-label="Diễn giả trước"
            >
              ‹
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 hidden items-center pr-2 lg:flex">
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-brown-700 text-2xl shadow-[0_8px_16px_rgba(83,48,33,0.12)] transition duration-200 hover:bg-brand-brown-50"
              aria-label="Diễn giả kế tiếp"
            >
              ›
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={`speaker-indicator-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={`h-2.5 w-8 rounded-full transition duration-200 ${
                  index === activeIndex
                    ? 'bg-brand-brown-700'
                    : 'bg-brand-brown-200/60 hover:bg-brand-brown-300'
                }`}
                aria-label={`Chuyển tới nhóm diễn giả ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-between gap-3 lg:hidden">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown-200/70 bg-white text-brand-brown-700 text-2xl shadow-[0_8px_16px_rgba(83,48,33,0.12)] transition duration-200 hover:bg-brand-brown-50"
              aria-label="Diễn giả trước"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-brown-200/70 bg-white text-brand-brown-700 text-2xl shadow-[0_8px_16px_rgba(83,48,33,0.12)] transition duration-200 hover:bg-brand-brown-50"
              aria-label="Diễn giả kế tiếp"
            >
              ›
            </button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default SpeakerCarousel
