<script lang="ts" module>
  import SkipLink from '$lib/components/SkipLink.svelte';
  import Anchor from '$lib/components/Anchor.svelte';
  import Body from '$lib/components/Body.svelte';
  import Headline from '$lib/components/Headline.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/SkipLink',
    component: SkipLink,
    args: {
      href: '#main-content'
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <div style="position: relative;">
      <nav style="display: flex; gap: 1rem;">
        <SkipLink href={args.href}>Skip to main content</SkipLink>
        <Anchor href="#">About</Anchor>
        <Anchor href="#">Join us</Anchor>
        <Anchor href="#">Contact</Anchor>
      </nav>
      <main id="main-content" style="padding: 1rem 0;">
        <Headline as="h2">Main content</Headline>
        <Body>Press the Tab key to reveal the skip link.</Body>
      </main>
    </div>
  {/snippet}
</Story>
