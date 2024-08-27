<script context="module">
  import Spacer from '$lib/components/Spacer.svelte';

  export const meta = {
    title: 'Layout/Spacer',
    component: Spacer,
    argTypes: {
      size: {
        control: { type: 'radio', defaultValue: 'm' },
        options: ['s', 'm', 'l', 'xl']
      }
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
</script>

<Story name="Base" let:args>
  <div style="background-color: #f0f0f0; padding: 10px;">
    <div style="background-color: #d0d0d0; padding: 10px;">Content above spacer</div>
    <Spacer {...args} />
    <div style="background-color: #d0d0d0; padding: 10px;">Content below spacer</div>
  </div>
</Story>

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
