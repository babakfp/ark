import { useEnvironmentContext } from '$lib/providers/environment'
import { useLocaleContext } from '$lib/providers/locale'
import type { Accessor, Optional } from '$lib/types'
import { createId } from '$lib/utils/create-id'
import * as qrcode from '@zag-js/qr-code'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/svelte'

export interface UseQrCodeProps
  extends Optional<Omit<qrcode.Context, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseQrCodeReturn extends Accessor<qrcode.Api<PropTypes>> {}

export const useQrCode = (props: UseQrCodeProps = {}) => {
  const id = createId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext()

  const context = $derived({
    id,
    dir: locale.dir,
    getRootNode: env.getRootNode,
    ...props,
  })

  const [state, send] = useMachine(qrcode.machine(context), { context })
  const api = $derived(() => qrcode.connect(state, send, normalizeProps))
  return api
}