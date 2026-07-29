<script lang="ts" module>
  import Body from '$lib/components/Body.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { type ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Typography/Body',
    component: Body,
    argTypes: {
      children: {
        control: { type: 'text' }
      },
      as: {
        control: { type: 'text' }
      }
    },
    parameters: {
      layout: 'centered'
    }
  });

  type Args = Omit<ComponentProps<typeof Body>, 'children'> & {
    children: string;
  };

  const content =
    'An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.';
</script>

<Story name="Base" args={{ children: content }}>
  {#snippet template({ children, ...args }: Args)}
    <Body {...args}>{children || content}</Body>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    {#each ['l', 'm', 's'] as const as size (size)}
      <Body {size}>This is size {size}. {content}</Body>
    {/each}
  {/snippet}
</Story>

<Story name="Weights">
  {#snippet template()}
    {#each ['regular', 'semibold', 'bold'] as const as weight (weight)}
      <Body {weight}>This is the {weight} weight. {content}</Body>
    {/each}
  {/snippet}
</Story>

<Story name="Decorations">
  {#snippet template()}
    <Body decoration="strikethrough">{content}</Body>
  {/snippet}
</Story>

<Story name="Colors">
  {#snippet template()}
    {#each ['normal', 'subtle', 'placeholder', 'on-strong', 'on-strong-subtle', 'accent', 'success', 'warning', 'danger', 'promo'] as const as color (color)}
      <Body
        {color}
        style={color.startsWith('on-strong') ? 'background: var(--cui-bg-strong)' : undefined}
      >
        This is the {color} color. {content}
      </Body>
    {/each}
  {/snippet}
</Story>

<Story name="Variants">
  {#snippet template()}
    {#each ['highlight', 'quote', 'confirm', 'alert', 'subtle'] as const as variant (variant)}
      <Body {variant}>This is a {variant} body</Body>
    {/each}
  {/snippet}
</Story>

<Story name="Semantic">
  {#snippet template()}
    <Body>
      An electronic circuit <strong>is</strong> composed of individual electronic components, such as
      resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces
      through which electric current can flow.
    </Body>
  {/snippet}
</Story>
