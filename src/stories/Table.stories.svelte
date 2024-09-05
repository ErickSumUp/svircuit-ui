<script context="module">
  import Table from '$lib/components/Table.svelte';

  export const meta = {
    title: 'Stories/Table',
    component: Table,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
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
</script>

<Story name="Base" let:args>
  <Table {...args}>
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
  </Table>
</Story>

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
