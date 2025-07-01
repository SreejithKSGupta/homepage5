<script lang="ts">
	import TodoItem from '../components/todoitem.svelte';
	import type { Todo } from '../interfaces/todoitem';

	let isOpen = false;
	let todos: Todo[] = [];
	let newTodo = '';
	let nextId = 1;

  if (typeof localStorage === 'undefined') {
  } else {
    loadAndSetTodos();
  }

	function loadAndSetTodos() {
		const saved = localStorage?.getItem('todos');
		if (saved) {
			try {
				const data = JSON.parse(saved);
				todos = data.todos || [];
				nextId = data.nextId || 1;
			} catch (e) {
				console.error('Failed to load todos:', e);
			}
		}
	}

	function saveTodos() {
		localStorage.setItem('todos', JSON.stringify({ todos, nextId }));
	}

	function togglePlugin() {
		isOpen = !isOpen;
	}

	function closePlugin() {
		isOpen = false;
	}

	function addTodo() {
		if (!newTodo.trim()) return;
		todos = [...todos, { id: nextId++, text: newTodo.trim(), completed: false }];
		newTodo = '';
		saveTodos();
	}

	function handleToggleTodo(id: number) {
		todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
		saveTodos();
	}
	
	function handleDeleteTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
		saveTodos();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') addTodo();
		if (event.key === 'Escape') closePlugin();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) closePlugin();
	}

	$: completedCount = todos.filter((todo) => todo.completed).length;
	$: totalCount = todos.length;
</script>

<!-- Floating Action Button -->
<button class="fab" on:click={togglePlugin} aria-label="Toggle Todo Plugin">
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
	>
		<path d="M9 11l3 3L22 4"></path>
		<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
	</svg>
</button>

{#if isOpen}
	<div
		class="backdrop"
		on:click={handleBackdropClick}
		tabindex="0"
		role="button"
		aria-label="Close plugin"
		on:keydown={(e) => ['Escape', 'Enter'].includes(e.key) && closePlugin()}
	>
		<div class="plugin-container">
			<div class="plugin-header">
				<input
					class="todo-input"
					bind:value={newTodo}
					on:keydown={handleKeydown}
					placeholder="Add a todo..."
				/>
				<button class="add-btn" on:click={addTodo}>Add</button>
				<button class="close-btn" on:click={closePlugin}>×</button>
			</div>

			<div class="plugin-content">
				{#if totalCount > 0}
					<div class="stats">{completedCount} / {totalCount} completed</div>
				{/if}

				{#if todos.length === 0}
					<div class="empty-state">No todos yet</div>
				{:else}
					<div class="todo-list">
						{#each todos as todo (todo.id)}
							<TodoItem {todo} onToggle={handleToggleTodo} onDelete={handleDeleteTodo} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.fab {
		position: fixed;
		bottom: 12vh;
		right: 0.5vw;
		height: 8vh;
		width: 8vh;
		background: #2563eb;
		color: white;
		border: none;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
		transition: 0.3s;
		z-index: 999;
	}
	.fab:hover {
		transform: scale(1.1);
	}

	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1001;
		animation: fadeIn 0.2s ease;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.plugin-container {
		position: absolute;
		bottom: 100px;
		right: 24px;
		width: clamp(300px, 90%, 600px);
		background: var(--tooltipbgcol, #fff);
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		animation: slideUp 0.3s ease;
	}
	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.plugin-header {
		display: flex;
		gap: 8px;
		padding: 16px;
		border-bottom: 1px solid #e2e8f0;
	}

	.todo-input {
		flex: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 6px;
		font-size: 14px;
	}
	.add-btn,
	.close-btn {
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.add-btn {
		background: #2563eb;
		color: white;
	}
	.close-btn {
		background: #eb2525;
		color: white;
	}

	.plugin-content {
		padding: 20px;
		max-height: 400px;
		overflow-y: auto;
	}
	.stats {
		text-align: center;
		color: #6b7280;
		font-size: 12px;
		margin-bottom: 16px;
	}

	.todo-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.empty-state {
		text-align: center;
		color: #9ca3af;
		padding: 40px 20px;
		font-size: 14px;
	}

	.plugin-content::-webkit-scrollbar {
		width: 4px;
	}
	.plugin-content::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 2px;
	}
</style>
