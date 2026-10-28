<script lang="ts" module>
  import AspectRatio from '$lib/components/AspectRatio.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Components/AspectRatio',
    component: AspectRatio,
    args: {
      aspectRatio: 1.5
    },
    argTypes: {
      aspectRatio: { control: { type: 'number', min: 0.1, step: 0.1 } }
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <div style="width: 50vw">
      <AspectRatio {...args}>
        <div style="background: var(--cui-bg-highlight)"></div>
      </AspectRatio>
    </div>
  {/snippet}
</Story>

<Story name="Ratios">
  {#snippet template()}
    <div style="display: flex; gap: 1rem; align-items: flex-start; width: 75vw">
      {#each [{ label: '1 / 1', ratio: 1 }, { label: '16 / 9', ratio: 16 / 9 }, { label: '3 / 4', ratio: 3 / 4 }] as { label, ratio } (label)}
        <div style="flex: 1">
          <AspectRatio aspectRatio={ratio}>
            <div
              style="display: flex; align-items: center; justify-content: center; background: var(--cui-bg-highlight); color: var(--cui-fg-subtle)"
            >
              {label}
            </div>
          </AspectRatio>
        </div>
      {/each}
    </div>
  {/snippet}
</Story>
