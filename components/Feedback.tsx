import { WebchatProvider, useClient } from '@botpress/webchat'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'


export const Feedback = () => {
  const client = useClient({
    clientId: 'bf6e2073-8c26-4bb8-88fb-bf9c48ee5b76',
    apiUrl: 'https://webchat.botpress.cloud',
    mode: 'pushpin'
  })

  return (
    <WebchatProvider client={client}>
      <div className='flex flex-col items-start'>
        <div className='text-gray-500 text-xs mb-2'>Give us feedback!</div>
        <div className="flex justify-center space-x-3">
          <HandThumbUpIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer" />
          <HandThumbDownIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer" />
        </div>
      </div>
    </WebchatProvider>
  )
}
