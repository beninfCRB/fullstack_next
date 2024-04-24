"use client"

import { useEffect, useState } from 'react'

export default function useScrollProgress() {
    const [completion, setCompletion] = useState(0)

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY
            const scrollheight = document.body.scrollHeight - window.innerHeight

            if (scrollheight) {
                setCompletion(Number(currentProgress / scrollheight) * 100)
            }

        }
        window.addEventListener('scroll', updateScrollCompletion)
        return () => window.removeEventListener('scroll', updateScrollCompletion)
    }, [])

    return completion
}