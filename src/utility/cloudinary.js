// src/utils/cloudinaryUpload.js

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.secure_url
  } catch (err) {
    console.error('Cloudinary upload error:', err)
    throw err
  }
}
