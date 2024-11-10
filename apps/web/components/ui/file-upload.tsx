import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export function FileUpload({ onChange, accept, multiple = false }:{
    onChange: (file: File | File[]) => void
    accept: any
    multiple?: boolean
}) {
  const onDrop = useCallback((acceptedFiles:any) => {
    onChange(multiple ? acceptedFiles : acceptedFiles[0])
  }, [onChange, multiple])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple })

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-gray-500 transition-colors">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}