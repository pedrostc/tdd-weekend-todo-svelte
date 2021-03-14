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

	function hasCompleted(toDoList){
		return toDoList.some((todo) => todo.done);
	}

	function clearCompleted(event){
		toDos = toDos.filter((todo) => !todo.done);
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
		<div class="filter">
			<span class="item-counter">{formatTotalText(toDos)}</span>
			<div class="all filter-option">
				<input id="all" type="radio" value="all" name="filter" on:click={applyFilter}>
				<label for="all">All</label>
			</div>
			<div class="active filter-option">
				<input id="active" type="radio" value="active" name="filter" on:click={applyFilter}>
				<label for="active">Active</label>
			</div>
			<div class="completed filter-option">
				<input id="completed" type="radio" value="completed" name="filter" on:click={applyFilter}>
				<label for="completed">Completed</label>
			</div>
			<div class="clear-completed" >
			{#if hasCompleted(toDos)}
				<button on:click={clearCompleted}>Clear Completed</button>
			{/if}
			</div>
		</div>
	{/if}



</main>

<style>
	
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
	@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

	main {
		display: flex;
		margin-left: 2rem;
		margin-right: 2rem;
		flex-direction: column;
		font-family: 'Roboto', sans-serif;
	}

	.filter {
		display: flex;
		align-content: space-around;
		margin-top: 0.8rem;
		flex-wrap: wrap;
		min-height: 35px;
	}
	.filter > * {
		display: flex;		
		align-items: center;
	}
	.item-counter {
		margin-right: auto;
		width: 100px;
	}
	.filter-option {
	}
	.filter-option > *{
		margin: 0px;
		padding-left: 5px;
		padding-right: 5px;
	}
	.clear-completed {
		margin-left: auto;
		width: 140px;
		justify-content: flex-end;
	}
	button {
        border:none;
		background-color: transparent;		    
    }

	button:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.filter {
			flex-direction: column;
			align-content: flex-start;
		}
		.filter > * {
			width: 100%;
    		align-items: flex-start;
		}
		.clear-completed {
			justify-content: flex-start;
		}
		.clear-completed > button {
			width: 100%; 
		}
	}

	@media (min-width: 600px) {
		.filter {
			flex-direction: row;
		}
	}

</style>