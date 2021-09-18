import {useEffect,useState} from 'react'

const useProgressiveImage = src => {
    const [sourceLoaded, setSourceLoaded] = useState(null)
    console.log(src);
    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => setSourceLoaded(src)
    }, [src])

    return sourceLoaded
}

export default useProgressiveImage;