import CodeIcon from '@assets/code.icon.svg'
import CommunityIcon from '@assets/community.icon.svg'
import DashboardIcon from '@assets/dashboard.icon.svg'
import DesktopIcon from '@assets/desktop.icon.svg'
import KeyboardIcon from '@assets/keyboard.icon.svg'
import RocketShipIcon from '@assets/rocket-ship.icon.svg'
import TerminalIcon from '@assets/terminal.icon.svg'
import YoutubeIcon from '@assets/youtube.icon.svg'
import { NavigationCard } from '@components/NavigationCardList'

export const HERO_CARDS: NavigationCard[] = [
  {
    heading: 'Cloud Studio',
    subHeading: 'Learn how to publish your very own Botpress chatbot',
    link: '/cloud',
    Icon: DashboardIcon,
  },
  {
    heading: 'For Developers',
    subHeading: 'Build your very own Botpress chat bot using our API',
    link: '/integration',
    Icon: KeyboardIcon,
  },
  {
    heading: 'Cloud Admin',
    subHeading: 'Deploy your bot to the cloud and start chatting',
    link: '/cloud/admin-dashboard/details',
    Icon: TerminalIcon,
  },
]

export const API_DOCS_CARD: NavigationCard = {
  heading: 'API Reference',
  subHeading: 'Complete documentation for the Botpress API',
  link: '/api-documentation',
  Icon: CodeIcon,
}

export const OTHER_RESOURCES_CARDS: NavigationCard[] = [
  {
    heading: 'Video Tutorials',
    subHeading: 'Watch our videos to learn how to build a bot with Botpress.',
    link: 'https://www.youtube.com/botpress',
    Icon: YoutubeIcon,
  },
  {
    heading: 'Partner Program',
    subHeading: 'Connect with Botpress Expert Builders and potential clients',
    link: 'https://botpress.com/experts',
    Icon: RocketShipIcon,
  },
  {
    heading: 'Blog',
    subHeading: 'Get the latest about features and updates to Botpress.',
    link: 'https://botpress.com/blog',
    Icon: DesktopIcon,
  },
  {
    heading: 'Community',
    subHeading: 'Get help from others in the Botpress community forum',
    link: 'https://discord.gg/botpress',
    Icon: CommunityIcon,
  },
]
