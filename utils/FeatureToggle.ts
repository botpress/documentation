type Status = 'loading' | 'available'

import { useEffect, useState } from 'react'
import { UnleashClient } from 'unleash-proxy-client'
import * as config from './config'
import yn from 'yn'

type FeatureToggleProps = {
  url: string
  clientKey: string
  appName: string
  features: readonly FeatureToggles[]
}

const features = ['unreleasedDocs', 'apiDocs'] as const
type FeatureToggles = (typeof features)[number]

type IFeatureToggler = {
  isEnabled(featureName: FeatureToggles): Promise<boolean>
}

class FeatureToggler implements IFeatureToggler {
  private state: Status = 'loading'
  private readonly client: UnleashClient

  constructor(props: FeatureToggleProps) {
    this.client = new UnleashClient({
      ...props,
    })
  }

  public async isEnabled(featureName: FeatureToggles): Promise<boolean> {
    await this._ensureInitialized()
    return this.client.isEnabled(featureName)
  }

  private async _ensureInitialized() {
    if (this.state === 'loading') {
      await this._initialize()
    }
  }

  private async _initialize() {
    await this.client.start()
    this.state = 'available'
  }
}

class DummyToggler implements IFeatureToggler {
  public async isEnabled(): Promise<boolean> {
    return true
  }
}

const unleashEnabled = yn(config.find('UNLEASH_ENABLED')) ?? false
const toggler: IFeatureToggler = !unleashEnabled
  ? new DummyToggler()
  : new FeatureToggler({
      url: config.get('NEXT_PUBLIC_UNLEASH_URL'),
      clientKey: config.get('NEXT_PUBLIC_UNLEASH_CLIENT_KEY'),
      appName: config.get('NEXT_PUBLIC_UNLEASH_APP_NAME'),
      features,
    })

export function useFeature<FeatureName extends FeatureToggles>(featureName: FeatureName): [boolean] {
  const [enabled, setEnabled] = useState<boolean>(false)

  useEffect(() => {
    void toggler.isEnabled(featureName).then((isEnabled) => {
      setEnabled(isEnabled)
    })
  }, [])

  return [enabled]
}
