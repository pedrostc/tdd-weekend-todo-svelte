<script>

	import NewItem from './new-item/NewItem.svelte';

	let text = '';

	function handleItem(event){
		text = event.detail.item;
	}

</script>

<main>
	<h1>ToDos</h1>
	<NewItem on:addItem={handleItem}/>

	<ul>
		<li>{text}</li>
	</ul>

</main>

<style>

</style>