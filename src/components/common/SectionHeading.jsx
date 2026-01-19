const SectionHeading = ({ subtitle, title, description }) => {
    return (
        <div className="mx-auto max-w-3xl space-y-4 text-center">
            {subtitle && (
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-brown-400">
                    {subtitle}
                </p>
            )}
            {title && (
                <h2 className="text-3xl font-serif font-semibold text-brand-brown-900 sm:text-4xl">
                    {title}
                </h2>
            )}
            {description && (
                <p className="text-sm text-brand-brown-600 sm:text-base">
                    {description}
                </p>
            )}
        </div>
    )
}

export default SectionHeading
