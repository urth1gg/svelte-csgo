<script lang="ts">
    import { browser } from '$app/environment';
    import SectionHeader from '$lib/components/SectionHeader.svelte';
    import LoadableImage from '../inputs/LoadableImage.svelte';

    export let user: User;
    export let stats: Stats;

</script>

<div class="section w-full">
    <LoadableImage src="" />
</div>