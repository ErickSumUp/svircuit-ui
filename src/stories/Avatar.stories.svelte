<script lang="ts" module>
  import Avatar from '$lib/components/Avatar.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import coffeeImage from './assets/illustration-coffee.jpg';

  const { Story } = defineMeta({
    title: 'Components/Avatar',
    component: Avatar,
    args: { src: coffeeImage, alt: 'A cup of coffee on a table', variant: 'object', size: 'm' },
    argTypes: {
      variant: { control: 'select', options: ['object', 'business', 'person'] },
      size: { control: 'select', options: ['s', 'm'] }
    }
  });

  const variants = ['object', 'business', 'person'] as const;
  const sizes = ['s', 'm'] as const;
</script>

<Story name="Base" />

<Story name="Variants">
  {#snippet template()}
    <div
      style="display: grid; grid-template-columns: repeat(3, auto); gap: 1.5rem; align-items: center; justify-content: start;"
    >
      {#each sizes as size (size)}
        {#each variants as variant (variant)}
          <Avatar alt="" {variant} {size} />
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>

<Story name="Initials">
  {#snippet template()}
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <Avatar alt="Jane Doe" variant="person" initials="JD" size="s" />
      <Avatar alt="Jane Doe" variant="person" initials="JD" />
    </div>
  {/snippet}
</Story>
