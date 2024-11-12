import { useState, useEffect, useRef } from 'react'

function useScrollVisibility() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const sectionOffset = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight

      if (currentScroll > sectionOffset + sectionHeight * 0.15 - window.innerHeight) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return [isVisible, sectionRef]
}

export default useScrollVisibility
