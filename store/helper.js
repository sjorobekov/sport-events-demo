
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
}
