import Link from 'next/link'
import * as React from 'react'
import BpLogo from '../assets/bp-logo.inline.svg'
import Linkedin from '../assets/linkedin.inline.svg'
import Twitter from '../assets/twitter.inline.svg'
import Youtube from '../assets/youtube.inline.svg'

export function Footer() {
  return (
    <footer className='w-full' >
      <div className=" flex w-full max-w-5xl flex-col px-4 py-14">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="grid grid-rows-5 gap-2 md:gap-6">
              <Link href="https://botpress.com" className="flex items-center ">
                <BpLogo className="dark:invert" />
              </Link>
              <Link href="https://www.youtube.com/botpress" target="_blank" className="ml-1 flex items-center">
                <Youtube className="mr-3 h-6 w-6 dark:invert dark:opacity-50" />
                YouTube
              </Link>
              <Link
                href="https://www.linkedin.com/company/botpress/"
                target="_blank"
                className="ml-1 flex items-center"
              >
                <Linkedin className="mr-3 h-6 w-6 dark:invert dark:opacity-50" />
                LinkedIn
              </Link>
              <Link href="https://twitter.com/getbotpress/" target="_blank" className="ml-1 flex items-center">
                <Twitter className="mr-3 h-6 w-6 dark:invert dark:opacity-50" />
                Twitter
              </Link>
            </div>
            <div className="grid grid-rows-5 gap-2 md:gap-6">
              <div className="font-bold">Learn</div>
              <Link href="https://botpress.com/features/overview" target="_blank">
                Quickstart
              </Link>
              <Link href="https://botpress.com/features/supported-platforms" target="_blank">
                Messaging Channels
              </Link>
              <Link href="https://v12.botpress.com/" target="_blank">
                v12 Docs
              </Link>
            </div>
            <div className="grid grid-rows-5 gap-2 md:gap-6">
              <div className="font-bold">Community</div>
              <Link href="https://community.botpress.com/" target="_blank">
                Botpress Community
              </Link>
              <Link href="https://botpress.com/blog" target="_blank">
                Blog
              </Link>
            </div>
            <div className="grid grid-rows-5 gap-2 md:gap-6">
              <div className="font-bold">Company</div>
              <Link href="https://botpress.com/company/about" target="_blank">
                About
              </Link>
              <Link href="https://botpress.com/news" target="_blank">
                News & Press
              </Link>
              <Link href="https://botpress.com/privacy" target="_blank">
                Privacy
              </Link>
              <Link href="https://botpress.com/company/terms" target="_blank">
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-20">Copyright &copy; {new Date().getFullYear()} Botpress, Inc.</div>
        </div>
      </div>
    </footer>
  )
}
