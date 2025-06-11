<script lang="ts" module>
  import Table from '$lib/components/Table.svelte';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import type { ComponentProps } from 'svelte';

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

  const headers = ['Name', 'Created At', 'Permissions', 'Status'];
  const rows = [
    ['Lorem ipsum', '13 Abr 2024', '-', 'Disabled'],
    ['Dolor sit amet', '1 May 2024', '-', 'Disabled'],
    ['Consectetur adipiscing', '2 May 2024', 'Virtual Terminal', 'Enabled']
  ];

  type Args = Omit<ComponentProps<typeof Table>, 'children'>;
</script>

<Story name="Base">
  {#snippet template({ ...args }: Args)}
    <Table {...args}>
      <THead>
        <TR>
          {#each headers as header, i (i)}
            <TH>{header}</TH>
          {/each}
        </TR>
      </THead>
      <TBody>
        {#each rows as row, i (i)}
          <TR>
            {#each row as cell, j (j)}
              <TD>{cell}</TD>
            {/each}
          </TR>
        {/each}
      </TBody>
    </Table>
  {/snippet}
</Story>

<Story name="Condensed">
  <Table>
    <THead>
      <TR>
        {#each headers as header, i (i)}
          <TH condensed>{header}</TH>
        {/each}
      </TR>
    </THead>
    <TBody>
      {#each rows as row, i (i)}
        <TR>
          {#each row as cell, j (j)}
            <TD condensed>{cell}</TD>
          {/each}
        </TR>
      {/each}
    </TBody>
  </Table>
</Story>
