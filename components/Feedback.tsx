import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'
import { getUserData } from '@utils/userData'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-use';

export const Feedback = () => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setFeedbackGiven(false)
  }, [location])

  const sendFeedback = async ({ feedback }: { feedback: 'positive' | 'negative' }) => {
    setFeedbackGiven(true)
    await fetch(process.env.NEXT_PUBLIC_BOT_URL ?? '', {
      method: 'POST',
      body: JSON.stringify({
        feedback,
        userData: getUserData()
      }),
    }).catch(err => {
      console.error(err)
    })
  }

  return (
      <div className='flex flex-col items-start'>
        {
          feedbackGiven ? (
            <div className='text-gray-500 text-xs mb-2 animate-[fadein_500ms_ease-in-out]'>Thank you for your feedback!</div>) : (
            <>
              <div className='text-gray-500 text-xs mb-2'>Was this helpful?</div>
              <div className="flex justify-center space-x-3">
                <HandThumbUpIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer" onClick={() => sendFeedback({ feedback: 'positive' })} />
                <HandThumbDownIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 cursor-pointer" onClick={() => sendFeedback({ feedback: 'negative' })} />
              </div>
            </>
          )
        }
      </div>
  )
}
