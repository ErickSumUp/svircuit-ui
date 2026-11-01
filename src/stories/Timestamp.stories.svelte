<script lang="ts" module>
  import Timestamp from '$lib/components/Timestamp.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

  const MINUTE = 60 * 1000;
  const DAY = 24 * 60 * MINUTE;

  function fromNow(offset: number) {
    return new Date(Date.now() + offset).toISOString();
  }

  const relativeDatetimes = [
    fromNow(120 * DAY),
    fromNow(64 * 1000),
    fromNow(-7 * MINUTE),
    fromNow(-DAY),
    fromNow(-35 * DAY)
  ];
  const absoluteDatetimes = [
    '2020-07-15T10:00:00+02:00[Europe/Berlin]',
    '2020-03-15T10:01:04+01:00[Europe/Berlin]',
    '2020-03-15T09:53:00+01:00[Europe/Berlin]',
    '2020-03-14T10:00:00+01:00[Europe/Berlin]',
    '2020-02-09T10:00:00+01:00[Europe/Berlin]'
  ];
  const locales = ['en-US', 'de-DE', 'pt-BR'];
  const variants = ['absolute', 'relative'] as const;
  const formatStyles = ['long', 'short', 'narrow'] as const;

  const { Story } = defineMeta({
    title: 'Components/Timestamp',
    component: Timestamp,
    args: {
      datetime: relativeDatetimes[2]
    },
    argTypes: {
      variant: { control: 'select', options: ['auto', 'relative', 'absolute'] },
      formatStyle: { control: 'select', options: formatStyles }
    }
  });
</script>

{#snippet localeColumns(args: ComponentProps<typeof Timestamp>, datetimes: string[])}
  <div style="display: flex; gap: 2rem;">
    {#each locales as locale (locale)}
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        {#each datetimes as datetime (datetime)}
          <Timestamp {...args} {datetime} formattingLocale={locale} />
        {/each}
      </div>
    {/each}
  </div>
{/snippet}

<Story name="Base">
  {#snippet template(args)}
    <Timestamp {...args} />
  {/snippet}
</Story>

<Story name="Relative" args={{ variant: 'relative' }}>
  {#snippet template(args)}
    {@render localeColumns(args, relativeDatetimes)}
  {/snippet}
</Story>

<Story name="Absolute" args={{ variant: 'absolute' }}>
  {#snippet template(args)}
    {@render localeColumns(args, absoluteDatetimes)}
  {/snippet}
</Story>

<Story name="Format styles" args={{ includeTime: true }}>
  {#snippet template(args)}
    <div
      style="display: grid; grid-template-columns: repeat({variants.length +
        1}, auto); gap: 0.5rem 2rem; justify-content: start;"
    >
      <span></span>
      {#each variants as variant (variant)}<strong>{variant}</strong>{/each}
      {#each formatStyles as formatStyle (formatStyle)}
        <strong>{formatStyle}</strong>
        {#each variants as variant (variant)}
          <Timestamp {...args} {variant} {formatStyle} />
        {/each}
      {/each}
    </div>
  {/snippet}
</Story>
