<script lang="ts">
    import { onDestroy } from 'svelte';

    export let seconds = 20; 

    let num = 100; 

    export let callback: Function = () => {} 
    let int = setInterval(() => {
        let dec = 100 / seconds;  
        num -= dec

        if(num <= 0){
            clearInterval(int)
            callback();
        }
    }, 1000)

    onDestroy(() => {
        clearInterval(int)
    })

</script>

<div class="timerbar" style="width: {num}%"></div>