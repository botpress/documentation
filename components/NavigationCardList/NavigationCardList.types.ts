import { LinkProps } from 'next/link'

export type NavigationCard = {
  heading: string
  subHeading: string
  link: LinkProps['href']
  Icon: React.FC
}

export type NavigationCardListProps = {
  cards: NavigationCard[]
  isSmallGrid?: boolean
}
