<script lang="ts" module>
  import SecondaryNavigation, { type Group } from '$lib/components/SecondaryNavigation.svelte';
  import { defineMeta, setTemplate, type Args } from '@storybook/addon-svelte-csf';

  const { Story } = defineMeta({
    title: 'Navigation/SecondaryNavigation',
    component: SecondaryNavigation,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  });
</script>

<script lang="ts">
  import Select from '$lib/components/Select.svelte';

  let groups: Group[] = [
    {
      label: 'clothes',
      links: [
        {
          label: 'Shirts',
          isActive: false,
          href: '/shirts',
          badge: {
            label: 'New',
            variant: 'promo'
          }
        },
        {
          isActive: false,
          href: '/pants',
          label: 'Pants'
        },
        {
          isActive: true,
          href: '/socks',
          label: 'Socks'
        }
      ]
    },
    {
      label: 'For kids',
      links: [
        {
          isActive: false,
          href: '/toys',
          label: 'Toys'
        },
        {
          isActive: false,
          href: '/books',
          label: 'Books'
        }
      ]
    }
  ];

  setTemplate(template);
</script>

{#snippet template({ ...args }: Args<typeof Story>)}
  <SecondaryNavigation {groups} {...args}>
    {#snippet footerContent()}
      <div style="padding: 10px;">
        <Select id="options" ariaDescribedBy="options" value="0">
          <option value="0" disabled selected>Select</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Select>
      </div>
    {/snippet}
  </SecondaryNavigation>
{/snippet}

<Story name="Base" />
