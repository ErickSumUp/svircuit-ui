<script context="module" lang="ts">
  import Table from '$lib/components/Table.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Stories/Table',
    component: Table,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import TH from '$lib/components/TH.svelte';
  import TD from '$lib/components/TD.svelte';
  import TR from '$lib/components/TR.svelte';
  import THead from '$lib/components/THead.svelte';
  import TBody from '$lib/components/TBody.svelte';

  setTemplate(template);

  const headers = ['Name', 'Created At', 'Permissions', 'Status'];
  const rows = [
    ['Lorem ipsum', '13 Abr 2024', '-', 'Disabled'],
    ['Dolor sit amet', '1 May 2024', '-', 'Disabled'],
    ['Consectetur adipiscing', '2 May 2024', 'Virtual Terminal', 'Enabled']
  ];
</script>

{#snippet template({ children, ...args }: Args<typeof Story>)}
  <Table {...args}>
    {#if children}
      {children}
    {:else}
      <THead>
        <TR>
          {#each headers as header}
            <TH>{header}</TH>
          {/each}
        </TR>
      </THead>
      <TBody>
        {#each rows as row}
          <TR>
            {#each row as cell}
              <TD>{cell}</TD>
            {/each}
          </TR>
        {/each}
      </TBody>
    {/if}
  </Table>
{/snippet}

<Story name="Base" />

<Story name="Condensed">
  <Table>
    <THead>
      <TR>
        {#each headers as header}
          <TH condensed>{header}</TH>
        {/each}
      </TR>
    </THead>
    <TBody>
      {#each rows as row}
        <TR>
          {#each row as cell}
            <TD condensed>{cell}</TD>
          {/each}
        </TR>
      {/each}
    </TBody>
  </Table>
</Story>
