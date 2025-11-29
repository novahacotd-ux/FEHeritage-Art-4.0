import { Link } from 'react-router-dom'

const NewsCard = ({ article }) => {
  if (!article) {
    return null
  }

  return (
    <Link
      to={`/news/${article.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-b from-white via-white to-[#fff2e6] shadow-[0_26px_55px_rgba(83,48,33,0.16)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_36px_70px_rgba(83,48,33,0.2)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-7 pb-8 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-brown-500">
          {article.date} • {article.author}
        </p>
        <h3 className="text-2xl font-serif font-semibold leading-tight text-brand-brown-900 transition-colors group-hover:text-brand-brown-700">
          {article.title}
        </h3>
        <p className="text-sm leading-relaxed text-brand-brown-700">
          {article.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-brown-500 transition group-hover:text-brand-brown-700">
          Đọc chi tiết
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}

export default NewsCard
