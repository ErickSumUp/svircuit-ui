<script lang="ts" module>
  import Spacer from '$lib/components/Spacer.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Layout/Spacer',
    component: Spacer,
    argTypes: {
      size: {
        control: { type: 'radio', defaultValue: 'm' },
        options: ['s', 'm', 'l', 'xl']
      }
    }
  });
</script>

<Story name="Base" args={{ size: 'm' }}>
  {#snippet template({ ...args }: ComponentProps<typeof Spacer>)}
    <div class="grey-box">Content above spacer</div>
    <Spacer {...args} />
    <div class="grey-box">Content below spacer</div>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <div style="background-color: #f0f0f0; padding: 10px;">
      <div style="background-color: #d0d0d0; padding: 10px;">Content above small spacer</div>
      <Spacer size="s" />
      <div style="background-color: #d0d0d0; padding: 10px;">Content above medium spacer</div>
      <Spacer size="m" />
      <div style="background-color: #d0d0d0; padding: 10px;">Content above large spacer</div>
      <Spacer size="l" />
      <div style="background-color: #d0d0d0; padding: 10px;">Content above extra large spacer</div>
      <Spacer size="xl" />
      <div style="background-color: #d0d0d0; padding: 10px;">Content at the bottom</div>
    </div>
  {/snippet}
</Story>

<style>
  .grey-box {
    background-color: #d0d0d0;
    padding: 10px;
  }
</style>
