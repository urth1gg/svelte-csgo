<script lang="ts">
    export let title: string;
    export let timer = false;
    export let timerValue = 20;
    export let divider = true;
    export let classProp = ""; 
</script>
<h3 class="text-white text-center font-bold text-lg m-0 tracking-wider mt-1 {classProp}">{title}</h3>
{#if divider}<hr class="mt-2 mb-2" />{/if}