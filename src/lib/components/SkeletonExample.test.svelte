<script lang="ts">
  import SkeletonContainer from './SkeletonContainer.svelte';
  import Skeleton from './Skeleton.svelte';

  let { isLoading, circle = false }: { isLoading: boolean; circle?: boolean } = $props();
</script>

<SkeletonContainer {isLoading}>
  <Skeleton {circle}><p>content</p></Skeleton>
</SkeletonContainer>
