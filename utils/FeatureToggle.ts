type Status = 'loading' | 'available'

import { useEffect, useState } from 'react'
import { UnleashClient } from 'unleash-proxy-client'

type FeatureToggleProps<featureToggles extends string> = {
  url: string
  clientKey: string
  appName: string
  features: readonly featureToggles[]
}

const features = ['unreleasedDocs', 'apiDocs'] as const

export class FeatureToggler<featureToggles extends string> {
  private state: Status = 'loading'
  private readonly client: UnleashClient

  constructor(props: FeatureToggleProps<featureToggles>) {
    this.client = new UnleashClient({
      ...props,
    })
  }

  public async initialize() {
    await this.client.start()
    this.state = 'available'
  }

  private async ensureInitialized() {
    if (this.state === 'loading') {
      await this.initialize()
    }
  }

  public async isEnabled(featureName: featureToggles): Promise<boolean> {
    await this.ensureInitialized()
    return this.client.isEnabled(featureName)
  }

  public get Client() {
    return (async () => {
      await this.ensureInitialized()
      return this.client
    })()
  }
}

export function useFeature<featureToggles extends string, featureName extends featureToggles>(
  featureName: featureName,
  toggler: FeatureToggler<featureToggles>
): [boolean] {
  const [enabled, setEnabled] = useState<boolean>(false)

  useEffect(() => {
    void toggler.isEnabled(featureName).then((isEnabled) => {
      setEnabled(isEnabled)
    })
  }, [])

  return [enabled]
}

export const toggler = new FeatureToggler({
  url: process.env.NEXT_PUBLIC_UNLEASH_URL ?? '',
  clientKey: process.env.NEXT_PUBLIC_UNLEASH_CLIENT_KEY ?? '',
  appName: process.env.NEXT_PUBLIC_UNLEASH_APP_NAME ?? '',
  features,
})
