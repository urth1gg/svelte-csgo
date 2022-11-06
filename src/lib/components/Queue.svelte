<script lang="ts">
    import { userData } from '$lib/store/userData';
    import Party from "$lib/components/Party.svelte";
	import SectionHeader from './SectionHeader.svelte';
</script>

<div class="section grid grid-cols-1 w-9/12 flex text-white p-3">
    <div>
        <SectionHeader title="Queue" />
        <Party />
    </div>
</div>    
