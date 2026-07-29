<script lang="ts" module>
  import Numeral from '$lib/components/Numeral.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Numeral',
    component: Numeral,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: { control: { type: 'text' } },
      as: { control: { type: 'text' } }
    }
  });

  type Args = Omit<ComponentProps<typeof Numeral>, 'children'> & {
    children: string;
  };

  const content = '$ 1,009.95';
</script>

<Story name="Base" args={{ children: content }}>
  {#snippet template({ children, ...args }: Args)}
    <Numeral {...args}>{children || content}</Numeral>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['xl', 'l', 'm', 's'] as const as size (size)}
      <Numeral {size}>{content} in size {size}</Numeral>
    {/each}
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    {#each ['normal', 'subtle', 'placeholder', 'on-strong', 'on-strong-subtle', 'accent', 'success', 'warning', 'danger', 'promo'] as const as color (color)}
      <Numeral
        {color}
        style={color.startsWith('on-strong') ? 'background: var(--cui-bg-strong)' : undefined}
      >
        {content} in the {color} color.
      </Numeral>
    {/each}
  {/snippet}
</Story>

<Story name="Decorations">
  {#snippet template()}
    <Numeral decoration="strikethrough">{content}</Numeral>
  {/snippet}
</Story>
