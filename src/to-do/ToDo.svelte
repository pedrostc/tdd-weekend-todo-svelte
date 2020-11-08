<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let id;
    export let text;
    let yes = false;
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
        dispatch('deleteItem', {id});
    }
</script>

<input type="checkbox" id={`todo-${id}`} bind:checked={yes}>
{#if isEditMode}
<input type="text" bind:value={text} on:blur={exitEditMode} on:keydown={handleKeyPress} use:focus>
{:else}
<label data-testid="itemLabel" for={`todo-${id}`} class:completed={yes} on:dblclick={switchToEditMode}>{text}</label>					
{/if}
<button on:click={deleteClick}>Delete</button>