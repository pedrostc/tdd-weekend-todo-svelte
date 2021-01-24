<script>

	import NewItem from './new-item/NewItem.svelte';
	import ToDoList from './to-do-list/ToDoList.svelte';
	import TodoModel from './model/todo-model.js';

	let toDos = [];
	let filter = "all";

	let filterDelegates = {
		all: () => true,
		completed: item => item.done,
		active : item => !item.done
	};

	$: filteredTodos = toDos.filter(filterDelegates[filter]);

	function formatTotalText(toDoList) {
		const toDoFiltered = toDoList.filter(toDo => !toDo.done);

		return `${toDoFiltered.length} item${toDoFiltered.length !== 1 ? 's' : ''} left`;
	}

	function showTotalText(toDoList) {
		return toDoList.length;
	}

	function handleItem(event) {
		let id = toDos.length;
		let toDo = new TodoModel(id, event.detail.item);
		toDos = [...toDos, toDo];
	}

	function handleDelete(event) {
		toDos = toDos.filter((todo) => todo.id !== event.detail.id);
	}

	function handleUpdate(event){
		const { detail } = event;

		toDos.forEach((todo, index) => {
			if (todo.id === detail.id) {
				const todo = toDos[index];
				toDos[index] = todo.with(td => {
					td.done = detail.done;
					td.text = detail.text;
				});
			}
		});
	}

	function filterCompleted(event) {
		filter = 'completed';
	}

	function filterActive(event) {
		filter = 'active';
	}

	function filterAll(event) {
		filter = 'all';
	}

</script>

<main>
	<h1>ToDos</h1>
	<NewItem on:addItem={handleItem}/>
	<ToDoList 
		toDos={filteredTodos} 
		on:deleteItem={handleDelete} 
		on:updateItem={handleUpdate}
	></ToDoList>
	
	{#if showTotalText(toDos)}
		<div>
			{formatTotalText(toDos)}
			<br>
			<input id="all" type="radio" value="All" name="filter" on:click={filterAll}>
			<label for="all">All</label>
			
			<input id="active" type="radio" value="Active" name="filter" on:click={filterActive}>
			<label for="active">Active</label>

			<input id="completed" type="radio" value="Completed" name="filter" on:click={filterCompleted}>
			<label for="completed">Completed</label>

		</div>
	{/if}

</main>

<style>

</style>