<script>
    let showNotepad = false;
    let note = '';
</script>

<!-- Fixed Button -->
<button
    class="notepad-btn"
    on:click={() => showNotepad = true}
    aria-label="Open Notepad"
>
    📝
</button>

<!-- Overlay Popup -->
{#if showNotepad}
    <div
        class="overlay"
        role="button"
        tabindex="0"
        aria-label="Close Notepad"
        on:click={() => showNotepad = false}
        on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { showNotepad = false; } }}
    ></div>
    <div
        class="notepad-popup"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        on:click|stopPropagation
        on:keydown={(e) => { if (e.key === 'Escape') { showNotepad = false; } }}
    >
        <header>
            <span>Notepad</span>
            <button class="close-btn" on:click={() => showNotepad = false} aria-label="Close">✖</button>
        </header>
        <textarea bind:value={note} placeholder="Type your notes here..."></textarea>
    </div>
{/if}

<style>
.notepad-btn {
    position: fixed;
    right: 2rem;
    bottom: 7vh;
    z-index: 1001;
    background: #2d3748;
    color: #fff;
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: background 0.2s;
}
.notepad-btn:hover {
    background: #4a5568;
}

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
}

.notepad-popup {
    position: fixed;
    right: 2rem;
    bottom: 12vh;
    width: 320px;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
    z-index: 1002;
    display: flex;
    flex-direction: column;
    animation: popup-in 0.18s;
}

@keyframes popup-in {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

.notepad-popup header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1rem 0.5rem 1rem;
    font-weight: bold;
    font-size: 1.1rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: #888;
}

textarea {
    flex: 1;
    margin: 0 1rem 1rem 1rem;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    font-size: 1rem;
    resize: vertical;
    min-height: 120px;
    background: #f9fafb;
}
</style>