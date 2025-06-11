<script lang="ts" module>
  import Badge from '$lib/components/Badge.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: {
        control: { type: 'text', defaultValue: 'Badge' }
      }
    }
  });

  type Args = ComponentProps<typeof Badge>;
</script>

<script>
  import Stack from '$lib/components/Stack.svelte';
</script>

<Story name="Base" args={{ variant: 'neutral', circle: false }}>
  {#snippet template({ children, ...args }: Args)}
    <Badge {...args}>{children || 'Badge'}</Badge>
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    <Stack>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="promo">Promo</Badge>
    </Stack>
  {/snippet}
</Story>

<Story name="Circular">
  {#snippet template()}
    <Stack>
      <Badge variant="neutral" circle>1</Badge>
      <Badge variant="neutral" circle>42</Badge>
      <Badge variant="neutral" circle>99</Badge>
    </Stack>
  {/snippet}
</Story>
