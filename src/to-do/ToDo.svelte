<script>
    export let id;
    export let text;
    let yes = false;
    let isEditMode = false;

    function switchToEditMode() {
        isEditMode = true;
    }

    function exitEditMode(){
        isEditMode = false;
    }
</script>

<input type="checkbox" id={`todo-${id}`} bind:checked={yes}>
{#if isEditMode}
<input type="text" bind:value={text} on:blur={exitEditMode}>
{:else}
<label data-testid="itemLabel" for={`todo-${id}`} class:completed={yes} on:dblclick={switchToEditMode}>{text}</label>					
{/if}
