<script context="module">
  import SecondaryNavigation from '$lib/stories/SecondaryNavigation.svelte';

  export const meta = {
    title: 'Navigation/SecondaryNavigation',
    component: SecondaryNavigation,
    argTypes: {},
    parameters: {
      layout: 'centered'
    }
  };
</script>

<script lang="ts">
  import { Story } from '@storybook/addon-svelte-csf';
  import { Select } from '$lib';

  interface Group {
    label: string;
    links: {
      label: string;
      href: string;
      isActive: boolean;
      badge?: {
        label?: string;
        circle?: boolean;
        variant?: 'promo' | 'danger' | 'neutral' | 'success' | 'warning';
      };
    }[];
  }

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
</script>

<Story name="Base" let:args>
  <SecondaryNavigation {groups}>
    <div style="padding: 10px;">
      <Select value="0">
        <option value="0" disabled selected>Select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Select>
    </div>
  </SecondaryNavigation>
</Story>
