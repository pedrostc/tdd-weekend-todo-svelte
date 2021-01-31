<script>

	import NewItem from './new-item/NewItem.svelte';
	import ToDoList from './to-do-list/ToDoList.svelte';
	import TodoModel from './model/todo-model.js';

	const DEFAULT_FILTER = "all";

	let toDos = [];
	let filter = DEFAULT_FILTER;

	let filterDelegatesMap = new Map([
		['all', () => true],
		['completed', item => item.done],
		['active', item => !item.done]
	])

	$: filteredTodos = toDos.filter((item) => {
		if(!filterDelegatesMap.has(filter)) {
			console.error(`Invalid filter option: ${filter}`);
			return;
		}

		return filterDelegatesMap.get(filter)(item);
	});

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

	function applyFilter(event) {
		filter = event.target.value;
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
			<input id="all" type="radio" value="all" name="filter" on:click={applyFilter}>
			<label for="all">All</label>
			
			<input id="active" type="radio" value="active" name="filter" on:click={applyFilter}>
			<label for="active">Active</label>

			<input id="completed" type="radio" value="completed" name="filter" on:click={applyFilter}>
			<label for="completed">Completed</label>
		</div>
	{/if}

</main>

<style>

</style>