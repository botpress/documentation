import DotGridBackground from '@assets/dot-grid.background.svg'
import classNames from 'classnames'
import Link from 'next/link'
import { NavigationCardListProps } from './NavigationCardList.types'

export function NavigationCardList(props: NavigationCardListProps) {
  return (
    <div
      className={classNames('grid w-full grid-cols-1 gap-4 pt-12 md:grid-cols-2 md:gap-5', {
        'md-gap-5 md:grid-cols-4': props.isSmallGrid,
      })}
    >
      {props.cards.map((card) => (
        <Link className="group" href={card.link} key={card.heading}>
          <div className="flex h-full cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-sm  outline outline-transparent transition-all hover:shadow-lg group-hover:outline-bpBlueLight dark:border dark:border-slate-700 dark:bg-slate-950 group-hover:dark:bg-slate-900">
            <div
              className={classNames(
                'relative flex h-56 items-center justify-center bg-button-link group-hover:bg-button-link-hover dark:bg-button-link-dark group-hover:dark:bg-button-link-dark-hover',
                { 'h-48': props.isSmallGrid }
              )}
            >
              <DotGridBackground className={'absolute'} />
              <div className="position-absolute absolute flex h-14 w-14 items-center justify-center rounded-full border border-indigo-400 bg-indigo-500 shadow-inner-xl group-hover:bg-indigo-600 dark:border-indigo-900 dark:bg-button-link-dark-2 group-hover:dark:bg-button-link-dark-2-hover md:h-24 md:w-24">
                <card.Icon />
              </div>
            </div>
            <div className="flex flex-col p-6  dark:border-t dark:border-slate-700 ">
              <div className="text-md pb-1 font-bold text-slate-900 dark:text-slate-100">{card.heading}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{card.subHeading}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
