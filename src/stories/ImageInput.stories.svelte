<script lang="ts" module>
  import ImageInput from '$lib/components/ImageInput.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';
  import coffeeImage from './assets/illustration-coffee.jpg';

  const { Story } = defineMeta({
    title: 'Forms/ImageInput',
    component: ImageInput,
    parameters: {
      layout: 'centered'
    },
    args: {
      label: 'Upload an image',
      clearButtonLabel: 'Clear',
      loadingLabel: 'Uploading',
      onchange: () => Promise.resolve(),
      onclear: () => {},
      disabled: false
    }
  });

  type Args = ComponentProps<typeof ImageInput>;
</script>

<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte';

  const sizeError =
    'The uploaded image exceeds the maximum allowed size. Please use an image with a size below 20MB.';

  let imageUrl = $state('');
  let error = $state('');

  /** Fakes a network request that fails 30% of the time. */
  function uploadFile() {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.3) {
          reject(new Error('Failed to upload file'));
        } else {
          resolve(coffeeImage);
        }
      }, 2000);
    });
  }

  function onchange() {
    error = '';
    imageUrl = '';
    return uploadFile()
      .then((remoteImageUrl) => {
        imageUrl = remoteImageUrl;
      })
      .catch(() => {
        error = sizeError;
      });
  }

  function onclear() {
    error = '';
    imageUrl = '';
  }

  const placeholder = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"></svg>';
</script>

{#snippet avatar({ src, ...attributes }: { src: string | undefined; 'aria-hidden': 'true' })}
  <Avatar {src} alt="" {...attributes} />
{/snippet}

<Story name="Base">
  {#snippet template(args: Args)}
    <ImageInput {...args} image={avatar} />
  {/snippet}
</Story>

<Story name="With image">
  {#snippet template(args: Args)}
    <ImageInput {...args} src={coffeeImage} image={avatar} />
  {/snippet}
</Story>

<Story name="Invalid">
  {#snippet template(args: Args)}
    <ImageInput {...args} src={coffeeImage} invalid validationHint={sizeError} image={avatar} />
  {/snippet}
</Story>

<Story name="Disabled">
  {#snippet template(args: Args)}
    <ImageInput {...args} disabled hideLabel={false} image={avatar} />
  {/snippet}
</Story>

<Story name="Stateful">
  {#snippet template(args: Args)}
    <ImageInput
      {...args}
      src={imageUrl}
      {onchange}
      {onclear}
      invalid={!!error}
      validationHint={error}
      image={avatar}
    />
  {/snippet}
</Story>

<Story name="Custom Component (with an img element)">
  {#snippet template(args: Args)}
    <ImageInput {...args}>
      {#snippet image({ src, ...attributes })}
        <img
          class="custom"
          src={src || placeholder}
          alt=""
          {...attributes}
          style="object-fit: cover;"
        />
      {/snippet}
    </ImageInput>
  {/snippet}
</Story>

<Story name="Custom Component (with a div element)">
  {#snippet template(args: Args)}
    <ImageInput {...args}>
      {#snippet image({ src, ...attributes })}
        <div
          class="custom"
          {...attributes}
          style:background-image={src ? `url(${src})` : undefined}
          style="background-size: cover; background-position: center;"
        ></div>
      {/snippet}
    </ImageInput>
  {/snippet}
</Story>

<style>
  .custom {
    display: block;
    width: 400px;
    height: 100px;
    background-color: lightgrey;
  }
</style>
