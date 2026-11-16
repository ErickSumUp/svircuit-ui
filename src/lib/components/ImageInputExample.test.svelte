<script lang="ts">
  import ImageInput from './ImageInput.svelte';

  let {
    src,
    onchange = () => {},
    onclear = () => {},
    ...props
  }: {
    src?: string;
    onchange?: (file: File) => void | Promise<void>;
    onclear?: (event: MouseEvent) => void | Promise<void>;
    invalid?: boolean;
    validationHint?: string;
    disabled?: boolean;
    hideLabel?: boolean;
    optionalLabel?: string;
  } = $props();
</script>

<ImageInput
  label="Upload an image"
  clearButtonLabel="Clear"
  loadingLabel="Uploading"
  {src}
  {onchange}
  {onclear}
  {...props}
>
  {#snippet image({ src, ...attributes })}
    <img {src} alt="" {...attributes} />
  {/snippet}
</ImageInput>
