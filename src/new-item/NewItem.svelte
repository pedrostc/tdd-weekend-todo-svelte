<script>
import { type } from "os";
import { text } from "svelte/internal";

let isButtonDisabled = true;

function isEmpty(event){
    isButtonDisabled = event.target.value ? false : true
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