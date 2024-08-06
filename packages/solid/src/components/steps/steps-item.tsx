import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/steps'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useStepsContext } from './use-steps-context'
import { StepsItemPropsProvider } from './use-steps-item-props-context'

export interface StepsItemBaseProps extends ItemProps, PolymorphicProps<'li'> {}
export interface StepsItemProps extends HTMLProps<'li'>, StepsItemBaseProps {}

export const StepsItem = (props: StepsItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['index'])
  const steps = useStepsContext()
  const mergedProps = mergeProps(() => steps().getItemProps(itemProps), localProps)

  return (
    <StepsItemPropsProvider value={itemProps}>
      <ark.li {...mergedProps} />
    </StepsItemPropsProvider>
  )
}
