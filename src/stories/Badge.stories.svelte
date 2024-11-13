<script lang="ts" module>
  import Badge from '$lib/components/Badge.svelte';
  import { defineMeta, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: {
        control: { type: 'text', default: 'Badge' }
      }
    }
  });
</script>

<Story name="Base" args={{ variant: 'neutral', children: 'Badge', circle: false }}>
  {#snippet children({ ...args }: Args<typeof Story>)}
    <Badge variant={args.variant} circle={args.circle}>{args.children}</Badge>
  {/snippet}
</Story>

<Story name="Variants">
  <div style="display: flex; gap: 1rem;">
    <Badge variant="neutral">Neutral</Badge>
    <Badge variant="success">Success</Badge>
    <Badge variant="warning">Warning</Badge>
    <Badge variant="danger">Danger</Badge>
    <Badge variant="promo">Promo</Badge>
  </div>
</Story>

<Story name="Circular">
  <div style="display: flex; gap: 1rem;">
    <Badge variant="neutral" circle>1</Badge>
    <Badge variant="neutral" circle>42</Badge>
    <Badge variant="neutral" circle>99</Badge>
  </div>
</Story>
