<script>

import { createEventDispatcher } from 'svelte';

let todoText = '';
$: isButtonDisabled = !todoText;

const dispatch = createEventDispatcher();

function addClick(){
    emitEvent();
    clearText();
}

function emitEvent(){
    dispatch('addItem', {
        item: todoText
    });
}

function clearText(){
    todoText = '';
}

</script>

<input
    type='text'
    placeholder="O que precisa ser feito?"
    bind:value={todoText}
    >

<button 
    disabled={isButtonDisabled}
    on:click={addClick}
    >Add
</button>

<style>

</style>