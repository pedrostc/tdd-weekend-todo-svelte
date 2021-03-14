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

    function onBlur(event) {
        exitEditMode();
        onTextChanged(event.target.value);
    }

    function focus(el) {
        el.focus();
    }

    function handleKeyPress(event) {
        if(event.keyCode === ESC_KEY_CODE)
            exitEditMode();
            onTextChanged(event.target.value);
    }

    function deleteClick(){
        emitDeleteEvent();
    }

    function onCheckedToggle(event){
        const { checked } = event.target;

        const newValue = toDo.with((td) => td.done = checked);
        emitUpdateEvent(newValue);
    }

    function onTextChanged(newText) {
        const newValue = toDo.with((td) => td.text = newText);
        emitUpdateEvent(newValue);
    }

    function emitDeleteEvent(){
        dispatch('deleteItem', {id: toDo.id});
    }

    function emitUpdateEvent(newValue){
        dispatch('updateItem', newValue);
    }

</script>

<div class="todo">
    <input type="checkbox" id={`todo-${toDo.id}`} on:click={onCheckedToggle} checked={toDo.done}>
    {#if isEditMode}
    <input type="text" value={toDo.text} on:blur={onBlur} on:keydown={handleKeyPress} use:focus>
    {:else}
    <label data-testid="itemLabel" for={`todo-${toDo.id}`} class:completed={toDo.done} on:dblclick={switchToEditMode}>{toDo.text}</label>					
    {/if}
    <button class="material-icons" on:click={deleteClick}>delete</button>
</div>

<style>
    .todo {
        display: flex;
        align-items: center;
    }
    .todo > * {
        padding-left: 12px;
        padding-right: 12px;
        margin: 0px;
        margin-right: 1rem;
    }
    .todo > :is(label, input[type="text"]) {
        flex-grow: 2;
        border: none;
    }
    .completed {
        text-decoration: line-through;
    }

    button {
        border:none;   
        background-color: transparent;   
    }

</style>
