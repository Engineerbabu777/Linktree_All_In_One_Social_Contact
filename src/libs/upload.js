import toast from 'react-hot-toast'

export async function upload (ev, callbackFn, name) {
  const file = ev.target.files?.[0]

  if (file) {
    const url = 'http://api.cloudinary.com/v1_1/djo2k58eq/image/upload'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'new-data')

    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData()
      data.set('file', file)
      fetch(url, {
        method: 'POST',
        body: formData
      }).then(response => {
        if (response.ok) {
          response.json().then(data => {
            if (name === 'links') {
              callbackFn(data.secure_url)
              resolve(data.secure_url)
              return
            }
            fetch('/api/upload', {
              method: 'POST',
              body: JSON.stringify({ name: name, value: data.secure_url })
            })
              .then(result => {
                callbackFn(data.secure_url)
                resolve(data.secure_url)
              })
              .catch(err => console.log({ err }))
          })
        } else {
          reject()
        }
      })
    })

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Uploaded!',
      error: 'Upload error!'
    })
  }
}
