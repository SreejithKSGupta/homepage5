<script lang="ts">
	import type { Todo } from "../interfaces/todoitem";

	export let todo: Todo;
	export let onToggle: (id: number) => void;
	export let onDelete: (id: number) => void;

	function toggleTodo() {
		onToggle?.(todo.id);
	}

	function deleteTodo() {
		onDelete?.(todo.id);
	}

	function copyTodo() {
		navigator.clipboard
			.writeText(todo.text)
			.then(() => showToast('Todo copied to clipboard!'))
			.catch((err) => console.error('Failed to copy:', err));
	}

	function showToast(message: string) {
		const toast = document.createElement('div');
		toast.textContent = message;
		Object.assign(toast.style, {
			position: 'fixed',
			bottom: '20px',
			right: '20px',
			backgroundColor: '#2563eb',
			color: 'white',
			padding: '12px 20px',
			borderRadius: '8px',
			zIndex: '1000',
			boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
			opacity: '0',
			transition: 'opacity 0.3s'
		});
		document.body.appendChild(toast);
		requestAnimationFrame(() => {
			toast.style.opacity = '1';
		});
		setTimeout(() => {
			toast.style.opacity = '0';
			setTimeout(() => document.body.removeChild(toast), 300);
		}, 2000);
	}

	function isUrl(text: string): boolean {
		try {
			const url = new URL(text);
			return url.protocol === 'http:' || url.protocol === 'https:';
		} catch (_) {
			return false;
		}
	}
</script>

<div class="todo-item {todo.completed ? 'completed' : ''}">
	<label class="todo-label">
<input type="checkbox" checked={todo.completed} on:change={toggleTodo} />
		{#if isUrl(todo.text)}
			<a href={todo.text} class="todo-text link" target="_blank" rel="noopener noreferrer">{todo.text}</a>
		{:else}
			<span class="todo-text">{todo.text}</span>
		{/if}
	</label>
	<div class="todo-actions">
		<button class="action-btn copy-btn" on:click={copyTodo} title="Copy">📋</button>
		<button class="action-btn delete-btn" on:click={deleteTodo} title="Delete">❌</button>
	</div>
</div>



<style>
	.todo-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
        background-color: var(--bgcol);
		padding: 14px 16px;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.61);
		transition: box-shadow 0.2s, transform 0.2s;
		margin-bottom: 10px;
	}

	.todo-item:hover {
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
	}

	.todo-item.completed .todo-text {
		text-decoration: line-through;
		opacity: 0.6;
	}


	.todo-label {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.todo-label input[type="checkbox"] {
		width: 18px;
		height: 18px;
		cursor: pointer;
		accent-color: #2563eb;
		transition: transform 0.1s;
	}

	.todo-label input[type="checkbox"]:active {
		transform: scale(1.2);
	}

	.todo-text,
	.todo-text.link {
		flex: 1;
		font-size: 15px;
		color: var(--textcolor, #111);
		overflow-wrap: anywhere;
	}

	.todo-text.link {
		color: #2563eb;
		text-decoration: underline;
		word-break: break-all;
		transition: color 0.2s, text-decoration-color 0.2s;
	}

	.todo-text.link:hover,
	.todo-text.link:focus {
		color: #1d4ed8;
		text-decoration-color: #1d4ed8;
	}

	.todo-actions {
		display: flex;
		gap: 6px;
	}

	.action-btn {
		width: 32px;
		height: 32px;
		border-radius: 6px;
		border: none;
		background: var(--tooltipbgcol);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: transform 0.15s, background-color 0.2s;
	}

	.action-btn:hover,
	.action-btn:focus {
		transform: scale(1.1);
		outline: none;
	}

	.copy-btn:hover {
		color: #10b981;
	}

	.delete-btn:hover {
		color: #ef4444;
	}
</style>
