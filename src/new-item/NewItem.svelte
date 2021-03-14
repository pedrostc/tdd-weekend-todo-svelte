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

<div class="new-item">
    <input class="inputbox"
        type='text'
        placeholder="O que precisa ser feito?"
        bind:value={todoText}
        >
    <button
        class="material-icons"
        disabled={isButtonDisabled}
        on:click={addClick}
        >add_task
    </button>
</div>
<style>


    .new-item {
        display: flex;
        justify-content: flex-start;
    }

    .inputbox {
        width: 100%;
        margin-right: 0.5rem;
        border-radius: 0.3rem;
        border: 1px solid;
    }

    button {
        border:none;   
        background-color: transparent;  
    }
    

</style>