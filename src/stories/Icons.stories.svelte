<script lang="ts" module>
  import type { Component } from 'svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import Select from '$lib/components/Select.svelte';

  const { Story } = defineMeta({
    title: 'Icons/Overview',
    parameters: {
      layout: 'padded',
      controls: { disable: true }
    }
  });

  const components = import.meta.glob<Component<Record<string, unknown>>>('../lib/icons/*.svelte', {
    eager: true,
    import: 'default'
  });
  const sources = import.meta.glob<string>('../lib/icons/*.svelte', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  type Icon = { name: string; size: string; props: Record<string, unknown>; component: Component };

  // Reads the sizes from the `size` prop type (`size?: '16' | '24'`), or from
  // its default and branches (`size = '16'`, `size === '24'`) when typed as `string`.
  function getSizes(source: string) {
    const type = source.match(/size\??:\s*([^;=\n]+)/)?.[1];
    if (!type) {
      const size = source.match(/viewBox="0 0 (\d+)/)?.[1] ?? '';
      return [{ size, props: { width: size, height: size } }];
    }
    const sizes =
      type.match(/\d+/g) ?? [...source.matchAll(/size(?: ===|: \w+ =) '(\d+)'/g)].map((m) => m[1]);
    const isNumeric = !type.includes("'") && !type.includes('string');
    return [...new Set(sizes)].map((size) => ({
      size,
      props: { size: isNumeric ? Number(size) : size }
    }));
  }

  const icons: Icon[] = Object.entries(components)
    .flatMap(([path, component]) => {
      const name = path.split('/').pop()!.replace('.svelte', '');
      return getSizes(sources[path]).map(({ size, props }) => ({ name, size, props, component }));
    })
    .sort((a, b) => a.name.localeCompare(b.name) || Number(a.size) - Number(b.size));

  const sizeOptions = ['all', ...new Set(icons.map((icon) => icon.size).filter(Boolean))].sort();

  const colorOptions = [
    { label: 'Normal', value: 'var(--cui-fg-normal)' },
    { label: 'Subtle', value: 'var(--cui-fg-subtle)' },
    { label: 'Accent', value: 'var(--cui-fg-accent)' },
    { label: 'Success', value: 'var(--cui-fg-success)' },
    { label: 'Warning', value: 'var(--cui-fg-warning)' },
    { label: 'Danger', value: 'var(--cui-fg-danger)' }
  ];
</script>

<script lang="ts">
  let search = $state('');
  let size = $state('all');
  let color = $state(colorOptions[0].value);

  let visibleIcons = $derived(
    icons.filter(
      (icon) =>
        icon.name.toLowerCase().includes(search.trim().toLowerCase()) &&
        (size === 'all' || icon.size === size)
    )
  );
</script>

<Story name="Overview">
  <fieldset class="filters">
    <legend class="hide-visually">Icon filters</legend>
    <SearchInput
      id="icon-search"
      label="Search by name"
      placeholder="Search..."
      bind:value={search}
    />
    <Select id="icon-size" label="Size" bind:value={size}>
      {#each sizeOptions as option (option)}
        <option value={option}>{option === 'all' ? 'All sizes' : option}</option>
      {/each}
    </Select>
    <Select id="icon-color" label="Color" bind:value={color}>
      {#each colorOptions as option (option.value)}
        <option value={option.value}>{option.label}</option>
      {/each}
    </Select>
  </fieldset>

  {#if visibleIcons.length === 0}
    <p class="empty">No icons found</p>
  {:else}
    <ul class="list" style:color>
      {#each visibleIcons as icon (`${icon.name}-${icon.size}`)}
        <li class="item">
          <div class="icon">
            <icon.component aria-hidden="true" {...icon.props} />
          </div>
          <span class="name">{icon.name}</span>
          <span class="size">{icon.size}</span>
        </li>
      {/each}
    </ul>
  {/if}
</Story>

<style>
  .filters {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: var(--cui-spacings-giga);
    padding: 0;
    margin: 0 0 var(--cui-spacings-tera);
    border: none;
  }

  .hide-visually {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  .list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr));
    gap: var(--cui-spacings-mega);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--cui-body-s-font-size);
    line-height: var(--cui-body-s-line-height);
    text-align: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
  }

  .name {
    max-width: 100%;
    overflow: hidden;
    color: var(--cui-fg-normal);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .size {
    font-style: italic;
    color: var(--cui-fg-subtle);
  }

  .empty {
    color: var(--cui-fg-subtle);
  }
</style>
