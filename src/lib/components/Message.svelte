<script lang="ts">
    import { pushMessage, setMessage } from "$lib/store/pushMessage";

    let successClass = 'scale-0';
    let errorClass = 'scale-0';

    $: {
        if($pushMessage){
            switch ($pushMessage.type) {
                case 'success':
                    successClass = 'scale-1';
                    break;
                case 'error':
                    errorClass = 'scale-1';
                    break;
                default:
                    successClass = 'scale-0';
                    errorClass = 'scale-0';
                    break;
            }
        }
    }

</script>

<div class="{successClass} bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute w-full transation-all duration-700" role="alert">
    <strong class="font-bold">&#10003;</strong>
    <span class="block sm:inline">{$pushMessage.message}</span>
</div>

<div class="{errorClass} bg-red-400 text-white px-4 py-3 rounded absolute w-full transation-all duration-700" role="alert">
    <strong class="font-bold">&#10006;</strong>
    <span class="block sm:inline">{$pushMessage.message}</span>
</div>