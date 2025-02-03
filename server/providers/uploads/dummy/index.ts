import { Provider } from '../../../uploads/provider.js'

export default class DummyProvider implements Provider {
  // eslint-disable-next-line @typescript-eslint/require-await
  upload = async (): Promise<string> => ''
  // eslint-disable-next-line @typescript-eslint/require-await
  getUrl = async (): Promise<string|null> => null
}
