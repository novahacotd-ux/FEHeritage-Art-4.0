import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * CitationModal - Reusable citation generator component
 * Supports APA, MLA, and Chicago citation formats
 */
const CitationModal = React.memo(({ title, author, date, period, url, onClose }) => {
  const [citationStyle, setCitationStyle] = useState('apa');
  const [copied, setCopied] = useState(false);

  const generateCitation = () => {
    const year = new Date(date).getFullYear();

    switch (citationStyle) {
      case 'apa':
        // APA Format: Author. (Year). Title. Period.
        return url
          ? `${author}. (${year}). ${title}. ${period}. Retrieved from ${url}`
          : `${author}. (${year}). ${title}. ${period}.`;

      case 'mla':
        // MLA Format: Author. "Title." Period, Year.
        return url
          ? `${author}. "${title}." ${period}, ${year}. Web. ${url}`
          : `${author}. "${title}." ${period}, ${year}.`;

      case 'chicago':
        // Chicago Format: Author. "Title." Period (Year).
        return url
          ? `${author}. "${title}." ${period} (${year}). ${url}`
          : `${author}. "${title}." ${period} (${year}).`;

      default:
        return '';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCitation());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            id="citation-modal-title"
            className="text-2xl font-serif font-bold text-stone-800 flex items-center"
          >
            <svg className="w-7 h-7 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Trích dẫn tài liệu
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-lg hover:bg-stone-100"
            aria-label="Đóng"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-3">
            Chọn định dạng trích dẫn:
          </label>
          <div className="flex gap-3">
            {['apa', 'mla', 'chicago'].map((style) => (
              <button
                key={style}
                onClick={() => setCitationStyle(style)}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${citationStyle === style
                    ? 'bg-purple-500 text-white shadow-lg scale-105'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                aria-pressed={citationStyle === style}
              >
                {style.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-stone-50 to-stone-100 border-2 border-stone-200 rounded-xl p-5 mb-6">
          <p className="text-stone-800 leading-relaxed text-sm font-mono">
            {generateCitation()}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border-2 border-stone-300 text-stone-700 font-semibold hover:bg-stone-50 transition-colors"
          >
            Đóng
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>{copied ? '✓ Đã sao chép!' : 'Sao chép'}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

CitationModal.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  url: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

CitationModal.displayName = 'CitationModal';

export default CitationModal;
