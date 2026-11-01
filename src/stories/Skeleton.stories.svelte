<script lang="ts" module>
  import Skeleton from '$lib/components/Skeleton.svelte';
  import SkeletonContainer from '$lib/components/SkeletonContainer.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Skeleton',
    component: SkeletonContainer,
    args: {
      isLoading: true
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <SkeletonContainer
      isLoading={args.isLoading}
      style="display: flex; align-items: flex-start; gap: 1rem; max-width: 24rem;"
    >
      <Skeleton circle>
        <div style="width: 48px; height: 48px; border-radius: 50%; background: currentColor;"></div>
      </Skeleton>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <Skeleton><Headline as="h2" size="s">Jane Doe</Headline></Skeleton>
        <Skeleton>
          <Body>Merchant since 2019. Sells handmade ceramics at weekend markets.</Body>
        </Skeleton>
      </div>
    </SkeletonContainer>
  {/snippet}
</Story>
