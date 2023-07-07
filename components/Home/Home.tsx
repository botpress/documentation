import { NavigationCardList } from '@components/NavigationCardList'
import Link from 'next/link'
import { API_DOCS_CARD, HERO_CARDS, OTHER_RESOURCES_CARDS } from './Home.constants'
import { toggler, useFeature } from '@utils/FeatureToggle'

export function Home() {
  const [isApiDocsEnabled] = useFeature('apiDocs', toggler)

  return (
    <div className="flex justify-center pb-20 pt-10 md:pb-8 md:pt-5">
      <div className="mx-4 flex w-full max-w-5xl flex-col">
        <div className="pt-2 text-3xl font-bold md:text-5xl">Get to know Botpress</div>
        <div className="pt-6 text-base">Learn the ins and outs of chatbot building using the Botpress platform.</div>
        <NavigationCardList cards={isApiDocsEnabled ? [...HERO_CARDS, API_DOCS_CARD] : HERO_CARDS} />
        <Link href="https://discord.gg/botpress" className="mt-4 text-sm text-bpBlue">
          Questions? Let us know
        </Link>
        <div className="my-10"></div>
        <div className="pt-2 text-lg font-medium md:text-2xl">Other Resources</div>
        <div className="pt-2 text-base">Explore other resources</div>
        <NavigationCardList isSmallGrid cards={OTHER_RESOURCES_CARDS} />
        <Link href="https://discord.gg/botpress" className="mt-4 text-sm text-bpBlue">
          Questions? Let us know
        </Link>
      </div>
    </div>
  )
}
