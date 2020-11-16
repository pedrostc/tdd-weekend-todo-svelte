<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let toDo;
    let isEditMode = false;

    const ESC_KEY_CODE = 27

    function switchToEditMode() {
        isEditMode = true;
    }

    function exitEditMode() {
        isEditMode = false;
    }

    function focus(el) {
        el.focus();
    }

    function handleKeyPress(event) {
        if(event.keyCode === ESC_KEY_CODE)
            exitEditMode();
    }

    function deleteClick(){
        emitEvent();
    }

    function emitEvent(){
        dispatch('deleteItem', {id: toDo.id});
    }
</script>

<input type="checkbox" id={`todo-${toDo.id}`} bind:checked={toDo.done}>
{#if isEditMode}
<input type="text" bind:value={toDo.text} on:blur={exitEditMode} on:keydown={handleKeyPress} use:focus>
{:else}
<label data-testid="itemLabel" for={`todo-${toDo.id}`} class:completed={toDo.done} on:dblclick={switchToEditMode}>{toDo.text}</label>					
{/if}
<button on:click={deleteClick}>Delete</button>