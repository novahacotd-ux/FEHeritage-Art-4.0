import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AUTO_ROTATE_MS = 5000

const defaultCtaHref = (item) => (item?.id ? `/events/${item.id}` : null)

const HeroCarousel = ({ items = [], getCtaHref = defaultCtaHref, ctaLabel = 'Xem chi tiết' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 1) {
      return undefined
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, AUTO_ROTATE_MS)

    return () => clearInterval(timer)
  }, [items.length])

  if (!items.length) {
    return null
  }

  const currentItem = items[currentIndex]

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-brand-brown-900 text-white shadow-2xl">
      {items.map((event, index) => (
        <div
          key={event.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/65 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-[65vh] max-w-6xl flex-col justify-center gap-8 px-6 py-14 md:px-12">
        <div className="space-y-6 md:max-w-2xl">
          <h1 className="text-3xl font-serif font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
            {currentItem.title}
          </h1>
          <p className="text-base text-white/85 md:text-lg">
            {currentItem.description}
          </p>
        </div>
        <div className="flex gap-4">
          {(() => {
            const ctaHref = getCtaHref?.(currentItem)
            if (!ctaHref) return null
            return (
              <Link
                to={ctaHref}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#ffd54f] to-[#ffb84d] px-8 py-3 font-bold text-[#3b2412] shadow-md transition hover:from-[#ffe082] hover:to-[#ffc961] hover:shadow-lg hover:shadow-[#ffd54f]/30 hover:scale-105"
              >
                {ctaLabel}
              </Link>
            )
          })()}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,214,173,0.25),_transparent_55%)]" aria-hidden />

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={`indicator-${index}`}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Chuyển đến sự kiện ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroCarousel
