
export default function getDataUri(url, dontPerformConversion, callback) {

    if (dontPerformConversion) {
        callback(url)
    }

    const image = new Image();

    image.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = this.naturalWidth // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0)

        callback(canvas.toDataURL('image/png'))
    }

    image.crossOrigin = ''
    image.src = url + '?123'
}
