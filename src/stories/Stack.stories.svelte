<script lang="ts" module>
  import Stack from '$lib/components/Stack.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const { Story } = defineMeta({
    title: 'Layout/Stack',
    component: Stack
  });
</script>

<Story name="Base" args={{}}>
  {#snippet template({ ...args }: ComponentProps<typeof Stack>)}
    <Stack {...args}>
      <div class="grey-box" style="width: 70px; padding-left: 30px; padding-top: 30px">First</div>
      <div class="grey-box" style="width: 100px; height: 100px; text-align: center">Second</div>
    </Stack>
  {/snippet}
</Story>

<Story name="All Sizes">
  {#snippet template()}
    <Stack>
      <Stack gap="s" vertical>
        <div class="grey-box">One</div>
        <div class="grey-box">Two</div>
        <div class="grey-box">Three</div>
        <div class="grey-box">Four</div>
        <div class="grey-box">Five</div>
      </Stack>
      <Stack gap="m" vertical>
        <div class="grey-box">One</div>
        <div class="grey-box">Two</div>
        <div class="grey-box">Three</div>
        <div class="grey-box">Four</div>
        <div class="grey-box">Five</div>
      </Stack>
      <Stack gap="l" vertical>
        <div class="grey-box">One</div>
        <div class="grey-box">Two</div>
        <div class="grey-box">Three</div>
        <div class="grey-box">Four</div>
        <div class="grey-box">Five</div>
      </Stack>
      <Stack gap="xl" vertical>
        <div class="grey-box">One</div>
        <div class="grey-box">Two</div>
        <div class="grey-box">Three</div>
        <div class="grey-box">Four</div>
        <div class="grey-box">Five</div>
      </Stack>
      <Stack gap="xxl" vertical>
        <div class="grey-box">One</div>
        <div class="grey-box">Two</div>
        <div class="grey-box">Three</div>
        <div class="grey-box">Four</div>
        <div class="grey-box">Five</div>
      </Stack>
    </Stack>
  {/snippet}
</Story>

<style>
  .grey-box {
    background-color: #d0d0d0;
    padding: 10px;
  }
</style>
