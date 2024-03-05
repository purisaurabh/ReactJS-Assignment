import React, { useCallback, useEffect, useState } from 'react'

const useCopyToClipboard = (text:string) => {
    const [copiedValue , setCopiedValue] = useState(false)

    const copyToClipboard = useCallback(() =>{
        navigator.clipboard.writeText(text)
        .then(() => setCopiedValue(true))
        .catch((err) => console.log("Some error occured : " , err))
    } , [text])

    // cancel the copy value after some time

    useEffect(() =>{
        const timeOut = setTimeout(() => {
            setCopiedValue(false)
        }, 3000);

        return () => clearTimeout(timeOut)
    }, [copiedValue])

    return [copiedValue , copyToClipboard]
}

export default useCopyToClipboard
