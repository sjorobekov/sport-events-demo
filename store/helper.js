import imageCompression from 'browser-image-compression'

const extensions = {
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
}

export const getters = {
  compressionOptions: () => ({
    maxSizeMB: 2,
    maxWidthOrHeight: 4032,
    useWebWorker: true,
  }),
  extension: () => (mimeType) => {
    return extensions[mimeType]
  },
}

export const actions = {
  readBlob (_, blob) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.readAsDataURL(blob)
    })
  },

  compressImage ({ getters }, { file, ...options }) {
    return imageCompression(file, {
      ...getters.compressionOptions,
      ...options,
    })
  },
}
