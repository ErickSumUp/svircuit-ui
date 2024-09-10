<script context="module" lang="ts">
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

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

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <div style="width: 500px">
    <ProgressBar {...args} />
  </div>
{/snippet}

<Story name="Base" args={{ value: 0, max: 0, size: 'm' }} />

<Story name="Labelled">
  <div style="width: 500px">
    <ProgressBar label="3/10" value={3} max={10} />
    <ProgressBar label="30%" value={3} max={10} />
  </div>
</Story>

<Story name="Steps">
  <div style="width: 500px">
    <ProgressBar label="30%" value={3} max={10} />
  </div>
</Story>

<Story name="Timer">
  <div style="width: 500px">
    <ProgressBar
      label="A time-based progressbar"
      hideLabel={true}
      duration={3000}
      paused={false}
      loop={true}
    />
  </div>
</Story>

<Story name="Sizes">
  <div style="width: 500px">
    <ProgressBar label="A small progressbar" size="s" value={3} max={10} />
    <ProgressBar label="A medium progressbar" size="m" value={3} max={10} />
    <ProgressBar label="A large progressbar" size="l" value={3} max={10} />
  </div>
</Story>
