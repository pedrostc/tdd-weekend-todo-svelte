<script>

import { createEventDispatcher } from 'svelte';

let todoText = '';
$: isButtonDisabled = !todoText;

const dispatch = createEventDispatcher();

function sendItem(){
    dispatch('addItem', {
        item: todoText
    })
}

</script>

<input
    type='text'
    placeholder="O que precisa ser feito?"
    bind:value={todoText}
    >

<button 
    disabled={isButtonDisabled}
    on:click={sendItem}
    >Add
</button>

<style>

</style>