<script>

	import NewItem from './new-item/NewItem.svelte';
	import ToDoList from './to-do-list/ToDoList.svelte';
	import TodoModel from './model/todo-model.js';

	let toDos = [];

	function handleItem(event) {

		let id = toDos.length;
		let toDo = new TodoModel(id, event.detail.item);
		toDos = [...toDos, toDo];
	}

	function handleDelete(event) {
		toDos = toDos.filter((todo) => todo.id !== event.detail.id);
	}

</script>

<main>
	<h1>ToDos</h1>
	<NewItem on:addItem={handleItem}/>
	<ToDoList toDos={toDos} on:deleteItem={handleDelete}></ToDoList>
	
</main>

<style>

</style>