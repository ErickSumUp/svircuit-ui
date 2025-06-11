<script lang="ts" module>
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { screen } from '@testing-library/svelte';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Components/ProgressBar',
    component: ProgressBar,
    argTypes: {
      size: {
        control: { type: 'radio', defaultValue: 'm' },
        options: ['s', 'm', 'l']
      }
    },
    parameters: {
      layout: 'centered'
    }
  });
</script>

<Story name="Base" args={{ value: 0, max: 0, size: 'm' }}>
  {#snippet template({ ...args }: ComponentProps<typeof ProgressBar>)}
    <div style="width: 500px">
      <ProgressBar {...args} />
    </div>
  {/snippet}
</Story>

<Story name="Labelled">
  {#snippet template()}
    <div style="width: 500px">
      <ProgressBar label="3/10" value={3} max={10} />
      <ProgressBar label="30%" value={3} max={10} />
    </div>
  {/snippet}
</Story>

<Story name="Steps">
  {#snippet template()}
    <div style="width: 500px">
      <ProgressBar label="30%" value={3} max={10} />
    </div>
  {/snippet}
</Story>

<Story name="Timer">
  {#snippet template()}
    <div style="width: 500px">
      <ProgressBar
        label="A time-based progressbar"
        hideLabel={true}
        duration={3000}
        paused={false}
        loop={true}
      />
    </div>
  {/snippet}
</Story>

<Story name="Sizes">
  {#snippet template()}
    <div style="width: 500px">
      <ProgressBar label="A small progressbar" size="s" value={3} max={10} />
      <ProgressBar label="A medium progressbar" size="m" value={3} max={10} />
      <ProgressBar label="A large progressbar" size="l" value={3} max={10} />
    </div>
  {/snippet}
</Story>
