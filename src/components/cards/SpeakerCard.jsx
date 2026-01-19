const SpeakerCard = ({ speaker, onClick }) => {
  if (!speaker) {
    return null
  }

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-[26px] bg-gradient-to-b from-white via-white to-[#fff2e6] text-left shadow-[0_22px_50px_rgba(83,48,33,0.14)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_32px_65px_rgba(83,48,33,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6eadf]]"
      aria-label={`Xem chi tiết về ${speaker.name}`}
      type="button"
    >
      <div className="overflow-hidden rounded-t-[26px]">
        <img
          src={speaker.imageUrl}
          alt={speaker.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="px-6 pb-6 pt-5 text-center">
        <h3 className="text-xl font-serif font-semibold text-brand-brown-900 transition-colors group-hover:text-brand-brown-700">
          {speaker.name}
        </h3>
        <p className="mt-2 text-sm text-brand-brown-600">{speaker.title}</p>
      </div>
    </button>
  )
}

export default SpeakerCard
