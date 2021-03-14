<script>

	import ToDo from '../to-do/ToDo.svelte';

	export let toDos;

</script>



    <fieldset>
		<ul class="todo-list">
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



<style>		

    .todo-list {
        display: flex;
        flex-direction: column;
		list-style: none;
		padding: 0px;
    }

	.todo-list > li {
		padding-top: 6px;
		padding-bottom: 6px;
	}

	fieldset {
		margin: 0;
		border-radius: 0.3rem;
	}
</style>