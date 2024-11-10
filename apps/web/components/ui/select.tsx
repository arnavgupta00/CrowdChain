import React, { useState } from 'react'

export const Select = ({
  options,
  placeholder = 'Select an option',
  value,
  onChange,
}: {
  options: { label: string; value: string }[]
  placeholder?: string
  value: string
  onChange: (value: string) => void
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-gray-800 border border-gray-700 text-white rounded-md w-full py-2 px-3 text-left flex justify-between items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        {value || placeholder}
        <span className="ml-2">&#9662;</span>
      </button>
      {open && (
        <div className="absolute bg-gray-900 border border-gray-700 rounded-md mt-1 z-10 w-full">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              className="block w-full text-left px-3 py-2 hover:bg-gray-700"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export const SelectTrigger = ({
    children,
    className = '',
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className={`bg-gray-800 border border-gray-700 text-white rounded-md w-full py-2 px-3 text-left flex justify-between items-center ${className}`}
        {...props}
      >
        {children}
        <span className="ml-2">&#9662;</span>
      </button>
    )
  }

  

export const SelectContent = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`absolute bg-gray-900 border border-gray-700 rounded-md mt-1 z-10 w-full ${className}`}
    >
      {children}
    </div>
  )
}

export const SelectItem = ({
    children,
    onClick,
    className = '',
  }: {
    children: React.ReactNode
    onClick: () => void
    className?: string
  }) => {
    return (
      <button
        type="button"
        className={`block w-full text-left px-3 py-2 hover:bg-gray-700 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  export const SelectValue = ({
    value,
    placeholder = 'Select an option',
  }: {
    value: string
    placeholder?: string
  }) => {
    return <span>{value || placeholder}</span>
  }
  