import React from 'react'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`bg-gray-800 border border-gray-700 text-white rounded-md p-2 w-full focus:ring focus:ring-blue-500 focus:outline-none resize-none ${className}`}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'
