<script lang="ts" module>
  import Image from '$lib/components/Image.svelte';
  import AspectRatio from '$lib/components/AspectRatio.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';

  /** A self-contained 3:2 illustration, so the stories need no image files. */
  const example =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
        <rect width="1200" height="800" fill="#e7e6df"/>
        <circle cx="900" cy="220" r="110" fill="#ff61f2"/>
        <path d="M0 800 L380 360 L640 620 L860 420 L1200 800 Z" fill="#46423d"/>
      </svg>`
    );

  const { Story } = defineMeta({
    title: 'Components/Image',
    component: Image,
    args: {
      src: example,
      alt: 'Dark mountains below a pink sun on a pale background'
    },
    argTypes: {
      src: { control: 'text' },
      alt: { control: 'text' }
    }
  });
</script>

<Story name="Base">
  {#snippet template(args)}
    <Image {...args} />
  {/snippet}
</Story>

<Story name="Fixed ratio">
  {#snippet template(args)}
    <div style="width: 50vw">
      <AspectRatio aspectRatio={1}>
        <Image {...args} />
      </AspectRatio>
    </div>
  {/snippet}
</Story>
