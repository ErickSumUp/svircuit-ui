<script context="module" lang="ts">
  import Spacer from '$lib/components/Spacer.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

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

<script lang="ts">
  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <div class="grey-box">Content above spacer</div>
  <Spacer {...args} />
  <div class="grey-box">Content above spacer</div>
{/snippet}

<Story name="Base" args={{ size: 'm' }} />

<Story name="All Sizes">
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
</Story>

<style>
  .grey-box {
    background-color: #d0d0d0;
    padding: 10px;
  }
</style>
