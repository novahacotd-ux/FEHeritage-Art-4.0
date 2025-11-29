import React from 'react'

const ToggleSwitch = ({ id, name, checked, onChange, label, description, showLabel = true }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        {label && (
          <h3 className="font-medium text-brand-brown-900">{label}</h3>
        )}
        {description && (
          <p className="text-sm text-brand-brown-600">{description}</p>
        )}
      </div>

      {/* Setting Control */}
      <div className="flex items-center gap-3">
        <label
          htmlFor={id}
          className="relative inline-block w-[60px] h-[30px] bg-white/20 rounded-[15px] cursor-pointer transition-all duration-300 ease-in-out hover:bg-white/30"
          style={{
            background: checked ? 'rgba(122, 90, 66, 0.3)' : 'rgba(255, 255, 255, 0.2)',
            border: checked ? '1px solid var(--brand-brown-600, #7a5a42)' : '1px solid rgba(122, 90, 66, 0.2)'
          }}
        >
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          {/* Toggle Slider */}
          <div
            className="absolute top-[3px] w-6 h-6 bg-white rounded-full transition-all duration-300 ease-in-out shadow-md"
            style={{
              left: checked ? 'calc(100% - 27px)' : '3px',
              background: checked ? 'var(--brand-brown-600, #7a5a42)' : 'white'
            }}
          />
        </label>
        {showLabel && (
          <span className={`text-sm font-medium transition-colors duration-300 ${checked ? 'text-brand-brown-600' : 'text-gray-500'
            }`}>
            {checked ? 'Bật' : 'Tắt'}
          </span>
        )}
      </div>
    </div>
  )
}

export default ToggleSwitch