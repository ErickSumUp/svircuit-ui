<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';
	import TD from '$lib/TD.svelte';
	import TR from '$lib/TR.svelte';
	import TH from '$lib/TH.svelte';
	import Table from '$lib/Table.svelte';
	import THead from '$lib/THead.svelte';
	import TBody from '$lib/TBody.svelte';

	export let Hst: Hst;

	let condensed = false;
	let align: 'left' | 'center' | 'right' = 'left';
</script>

<Hst.Story title="Stories/Table" layout={{ type: 'grid', width: '100%' }}>
	<Hst.Variant title="Default">
		<Table>
			<THead>
				<TR>
					<TH {condensed} {align}>Name</TH>
					<TH {condensed} {align}>Created at</TH>
					<TH {condensed} {align}>Permissions</TH>
					<TH {condensed} {align}>Status</TH>
				</TR>
			</THead>
			<TBody>
				<TR>
					<TD {condensed} {align}>Lorem ipsum</TD>
					<TD {condensed} {align}>12/01/2017</TD>
					<TD {condensed} {align}>-</TD>
					<TD {condensed} {align}>Disabled</TD>
				</TR>
				<TR>
					<TD {condensed} {align}>Consectetur adipiscing</TD>
					<TD {condensed} {align}>13/01/2017</TD>
					<TD {condensed} {align}>Virtual Terminal</TD>
					<TD {condensed} {align}>Enabled</TD>
				</TR>
				<TR>
					<TD {condensed} {align}>Dolor sit amet</TD>
					<TD {condensed} {align}>14/01/2017</TD>
					<TD {condensed} {align}>-</TD>
					<TD {condensed} {align}>Disabled</TD>
				</TR>
			</TBody>
		</Table>
	</Hst.Variant>
	<svelte:fragment slot="controls">
		<Hst.Checkbox bind:value={condensed} title="Condensed" />
		<Hst.Select bind:value={align} title="Align" options={['left', 'center', 'right']} />
	</svelte:fragment>
</Hst.Story>
