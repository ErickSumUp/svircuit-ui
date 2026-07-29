<script lang="ts" module>
  import Compact from '$lib/components/Compact.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Compact',
    component: Compact,
    parameters: {
      layout: 'centered'
    },
    argTypes: {
      children: { control: { type: 'text' } },
      as: { control: { type: 'text' } }
    }
  });

  type Args = Omit<ComponentProps<typeof Compact>, 'children'> & {
    children: string;
  };

  const content =
    'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';
</script>

<Story name="Base" args={{ children: content }}>
  {#snippet template({ children, ...args }: Args)}
    <Compact {...args}>{children || content}</Compact>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['l', 'm', 's'] as const as size (size)}
      <Compact {size}>This is size {size}. {content}</Compact>
    {/each}
  {/snippet}
</Story>

<Story name="Weights">
  {#snippet template()}
    {#each ['regular', 'semibold', 'bold'] as const as weight (weight)}
      <Compact {weight}>This is the {weight} weight. {content}</Compact>
    {/each}
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    {#each ['normal', 'subtle', 'placeholder', 'on-strong', 'on-strong-subtle', 'accent', 'success', 'warning', 'danger', 'promo'] as const as color (color)}
      <Compact
        {color}
        style={color.startsWith('on-strong') ? 'background: var(--cui-bg-strong)' : undefined}
      >
        This is the {color} color. {content}
      </Compact>
    {/each}
  {/snippet}
</Story>
