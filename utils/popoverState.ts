import { useEffect, useRef, useState } from 'react'

export function usePopoverState<T extends HTMLElement>(initialIsVisible?: boolean) {
  const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible ?? false)
  const ref = useRef<T | null>(null)

  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return { ref, isVisible, toggle: () => setIsVisible((prev) => !prev) }
}
