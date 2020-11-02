<script>

	import NewItem from './new-item/NewItem.svelte';
	import ToDo from './to-do/ToDo.svelte';

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
					<ToDo id={id} text={toDo} />
				</li>
			{/each}
		</ul>
	</fieldset>

</main>

<style>

</style>