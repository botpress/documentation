import Construction from '@assets/construction.svg'

type Props = {}

export const ComingSoon = ({}: Props) => {
  return (
    <div className='flex justify-center items-center flex-col mt-10'>
      <h3 className='text-3xl'>Coming Soon</h3>
      <p className='text-gray-400'>This section is under construction.</p>
      <div>
        <Construction className='h-40 w-40' />
      </div>
    </div>
  )
}
