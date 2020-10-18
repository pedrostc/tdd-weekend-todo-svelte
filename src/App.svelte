<script>

	import NewItem from './new-item/NewItem.svelte';

	let toDos = [];
	let yes = false;

	function handleItem(event){
		toDos = [...toDos, event.detail.item];
	}

</script>

<main>
	<h1>ToDos</h1>
	<NewItem on:addItem={handleItem}/>

	<fieldset>
		<ul>
			{#each toDos as toDo, id}
				<li>
					<input type="checkbox" id={`todo-${id}`} bind:checked={yes}>
					{#if yes}					
						<label for={`todo-${id}`} class="completed">{toDo}</label>					
					{:else}
						<label for={`todo-${id}`} >{toDo}</label>					
					{/if}
				</li>
			{/each}
		</ul>
	</fieldset>

</main>

<style>

</style>