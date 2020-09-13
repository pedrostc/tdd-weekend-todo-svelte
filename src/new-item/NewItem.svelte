<script>
import { type } from "os";
import { text } from "svelte/internal";

let isButtonDisabled = true;

function isEmpty(event){
    if (event.target.value) ? isButtonDisabled = false  
        isButtonDisabled = true
    }
}

</script>

<input
    type='text'
    placeholder="O que precisa ser feito?"
    on:change={isEmpty}
    >
<button disabled={isButtonDisabled}>Add</button>

<style>

</style>