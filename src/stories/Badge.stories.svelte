<script context="module" lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import { defineMeta, setTemplate } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/Badge',
    component: Badge,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      variant: {
        control: { type: 'radio', defaultValue: 'neutral' },
        options: ['neutral', 'success', 'warning', 'danger', 'promo']
      },
      children: {
        control: { type: 'text', default: 'Badge' }
      }
    }
  });
</script>

<script>
  setTemplate(myTemplate);
</script>

{#snippet myTemplate({ children, ...args })}
  <Badge {...args}>{children || 'Badge'}</Badge>
{/snippet}

<Story name="Base" args={{ variant: 'neutral', children: 'Badge', circle: false }} />

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
