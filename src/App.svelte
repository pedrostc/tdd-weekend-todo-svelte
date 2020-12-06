<script>

	import NewItem from './new-item/NewItem.svelte';
	import ToDoList from './to-do-list/ToDoList.svelte';
	import TodoModel from './model/todo-model.js';

	let toDos = [];

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

</script>

<main>
	<h1>ToDos</h1>
	<NewItem on:addItem={handleItem}/>
	<ToDoList 
		toDos={toDos} 
		on:deleteItem={handleDelete} 
		on:updateItem={handleUpdate}
	></ToDoList>
	
	{#if showTotalText(toDos)}
		<div>
			{formatTotalText(toDos)}
			
		</div>
	{/if}

</main>

<style>

</style>