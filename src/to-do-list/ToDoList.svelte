<script>

	import ToDo from '../to-do/ToDo.svelte';

	export let toDos;

</script>

<main>

    <fieldset>
		<ul>
			{#each toDos as toDo, index}
				<li>
					<ToDo 
						toDo={toDo}
						on:deleteItem
						on:updateItem
					/>
				</li>
			{/each}
		</ul>
	</fieldset>

</main>