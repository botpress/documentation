import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
/**
 * Handles fallback redirections also since the website is exported as a static website and deployed on S3
 */
export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    if (router.asPath === '/api/') {
      router.push(`/api-documentation`)
    } else {
      router.push('/')
    }
  }, [])

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <h1 className="mb-4">Oops! Looks like the page you're trying to access doesn't exist.</h1>
      <Link href="/" className="mb-2 text-blue-500 hover:text-blue-800">
        Go to Documentation home
      </Link>
      <Link href="https://botpress.com" className="text-blue-500 hover:text-blue-800">
        Go to Botpress home
      </Link>
    </div>
  )
}
