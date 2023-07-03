import Link from 'next/link'
import * as React from 'react'
import BpLogo from '@assets/bp-logo.inline.svg'
import Linkedin from '@assets/linkedin.inline.svg'
import Github from '@assets/github.inline.svg'
import Discord from '@assets/discord.inline.svg'
import Twitter from '@assets/twitter.inline.svg'
import Youtube from '@assets/youtube.inline.svg'

export function Footer() {
  return (
    <footer className="w-full">
      <div className=" flex w-full flex-col px-4 py-14">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-5">
          <div className="flex flex-col gap-2">
            <Link href="https://botpress.com" className="mb-5">
              <BpLogo className="hover:opacity-75 dark:opacity-50 dark:invert dark:hover:opacity-100" />
            </Link>
            <div className="flex gap-2">
              {[
                [Github, 'https://github.com/botpress'],
                [Youtube, 'https://www.youtube.com/botpress'],
                [Linkedin, 'https://www.linkedin.com/company/botpress/'],
                [Twitter, 'https://twitter.com/getbotpress/'],
                [Discord, 'https://discord.gg/botpress'],
              ].map(([Icon, href]) => (
                <Link href={href} target="_blank" className="ml-1 flex items-center" key={href}>
                  <Icon className="h-6 w-6 hover:opacity-75 dark:opacity-50 dark:invert dark:hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          {[
            [
              'Product',
              [
                ['https://botpress.com/pricing', 'Pricing'],
                ['https://botpress.com/features/gpt-native-engine', 'NLU'],
                ['https://botpress.com/features/conversation-studio', 'Studio'],
                ['https://botpress.com/hub', 'Hub'],
              ],
            ],
            [
              'Hub',
              [
                ['https://botpress.com/hub', 'Channels'],
                ['https://botpress.com/hub', 'Integrations'],
                ['https://botpress.com/hub', 'Languages'],
                ['https://botpress.com/hub', 'Templates'],
              ],
            ],
            [
              'Resources',
              [
                ['https://botpress.com/docs/', 'Documentation'],
                ['https://botpress.com/contact-us', 'Talk to Sales'],
                ['https://discord.gg/botpress', 'Discord Community'],
                ['https://botpress.com/find-a-partner', 'Find a Partner'],
                ['https://botpress.com/experts', 'Become a Partner'],
                ['https://botpress.com/docs/api/', 'API Reference'],
                ['https://www.youtube.com/botpress', 'Videos'],
                ['https://status.botpress.com/', 'Status'],
                ['https://v12.botpress.com/', 'v12 Resources'],
              ],
            ],
            [
              'Company',
              [
                ['https://botpress.com/company/about', 'About'],
                ['https://botpress.com/careers', 'Careers'],
                ['https://botpress.com/news', 'News & Press'],
                ['https://botpress.com/company/terms', 'Terms'],
                ['https://botpress.com/privacy', 'Privacy'],
              ],
            ],
          ].map(([title, links]) => (
            <div className="flex flex-col gap-3" key={title as string}>
              <div className="font-bold">{title}</div>
              {(links as string[][]).map(([href, text]) => (
                <Link href={href} target="_blank" className="link" key={text}>
                  {text}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-20">Copyright &copy; {new Date().getFullYear()} Botpress, Inc.</div>
      </div>
    </footer>
  )
}
