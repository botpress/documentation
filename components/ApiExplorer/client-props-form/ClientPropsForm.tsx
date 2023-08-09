import { ClientProps } from '@botpress/client/dist/config'
import { useEffect, useState } from 'react'
import { CLIENT_PROPS_KEY } from '../code-executer'

type Props = {
  clientProps: Partial<ClientProps>
  onChange?: (clientProps: Partial<ClientProps>) => void
}

export function ClientPropsForm(props: Props) {
  useEffect(() => {
    setClientProps(JSON.parse(localStorage.getItem(CLIENT_PROPS_KEY) || '{}'))
  }, [])
  const [clientProps, setClientProps] = useState<Partial<ClientProps>>(props.clientProps)

  function setValue(key: keyof ClientProps, value: string) {
    setClientProps((previousClientProps) => {
      const newClientProps = { ...previousClientProps, [key]: value }
      localStorage.setItem('clientProps', JSON.stringify(newClientProps))

      return newClientProps
    })
  }

  function onSaveClick() {
    props.onChange?.(clientProps)
  }

  return (
    <div className="flex items-end justify-between rounded-xl border border-zinc-800 p-2">
      <div className="flex items-end justify-start">
        <div className="input-container">
          <label htmlFor="tokenField">Token</label>
          <input
            className="input"
            type="text"
            name=""
            id="tokenField"
            value={clientProps.token ?? ''}
            onChange={(e) => setValue('token', e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="workspaceIdField">Workspace ID</label>
          <input
            className="input"
            type="text"
            name=""
            value={clientProps.workspaceId ?? ''}
            id="workspaceIdField"
            onChange={(e) => setValue('workspaceId', e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="botIdField">Bot ID</label>
          <input
            className="input"
            type="text"
            name=""
            value={clientProps.botId ?? ''}
            id="botIdField"
            onChange={(e) => setValue('botId', e.target.value)}
          />
        </div>
      </div>
      <button className="button" onClick={onSaveClick}>
        Save
      </button>
    </div>
  )
}
