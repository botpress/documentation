import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import hotToast from 'react-hot-toast'
export type ToastConfig = {
  message: string
}
type ToastVariant = 'success' | 'error'
type ToastConfigOrMessage = ToastConfig | string

const TOAST_VARIANT_CLASSNAMES: Record<ToastVariant, string> = {
  success: 'bg-green-300 text-green-800 dark:bg-green-900 dark:text-zinc-50',
  error: 'bg-red-300 text-red-800 dark:bg-red-900 dark:text-zinc-50',
}
const TOAST_VARIANT_ICONS: Record<ToastVariant, typeof ExclamationCircleIcon> = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
}
function getToastVariant(toastConfigOrMessage: ToastConfigOrMessage, variant: ToastVariant) {
  return hotToast.custom((_toast) => {
    const Icon = TOAST_VARIANT_ICONS[variant]
    return (
      <div className={classNames('flex rounded-md py-2 pr-4', TOAST_VARIANT_CLASSNAMES[variant])}>
        <Icon className="mx-2 h-6 w-6" />
        {typeof toastConfigOrMessage === 'string' ? toastConfigOrMessage : toastConfigOrMessage.message}
      </div>
    )
  })
}

/**
 * To update default toast behaviour, go to `src/_app.mdx`
 */
export const toast: Record<ToastVariant, (toastConfigOrMessage: ToastConfigOrMessage) => void> = {
  success: (toastConfig) => getToastVariant(toastConfig, 'success'),
  error: (toastConfig) => getToastVariant(toastConfig, 'error'),
}
