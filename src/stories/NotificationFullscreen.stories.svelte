<script lang="ts" module>
  import NotificationFullscreen from '$lib/components/NotificationFullscreen.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import updateImage from './assets/illustration-update.svg';

  const { Story } = defineMeta({
    title: 'Notification/NotificationFullscreen',
    component: NotificationFullscreen,
    parameters: { layout: 'centered' },
    args: {
      image: { src: updateImage, alt: '' },
      headline: "The browser you're using is no longer supported",
      body: 'You need a more up-to-date browser to continue using SumUp.',
      actions: { primary: { label: 'Update now', onclick: () => console.log('primary') } }
    },
    argTypes: {
      headlineAs: { control: 'select', options: ['h1', 'h2'] }
    }
  });
</script>

<Story name="Base" />

<Story
  name="With two actions"
  args={{
    actions: {
      primary: { label: 'Update now', onclick: () => console.log('primary') },
      secondary: { label: 'Not now', onclick: () => console.log('secondary') }
    }
  }}
/>

<Story name="With heading 1" args={{ headline: 'I am an h1', headlineAs: 'h1' }} />
