// Fetch journal entries from the diary
async function loadJournal() {
    const entriesEl = document.getElementById('entries');
    try {
        const resp = await fetch('/api/journal.json');
        if (!resp.ok) throw new Error('no journal');
        const entries = await resp.json();
        entriesEl.innerHTML = entries.map(e => `
            <div class="entry">
                <time>${e.date}</time>
                ${e.content.split('\n').slice(0,3).map(l => `<p>${l}</p>`).join('')}
            </div>
        `).join('');
    } catch {
        // Keep default entries
    }
}

// Fetch curiosity digest
async function loadCuriosity() {
    const digestEl = document.getElementById('digest');
    try {
        const resp = await fetch('/api/curiosity.json');
        if (!resp.ok) throw new Error('no digest');
        const data = await resp.json();
        digestEl.innerHTML = data.items.map(i => `
            <div class="digest-item">
                <div class="feed-name">${i.feed}</div>
                <a href="${i.link}" target="_blank" rel="noopener">${i.title}</a>
            </div>
        `).join('');
    } catch {
        digestEl.innerHTML = '<p>Check back soon — curiosities loading...</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadJournal();
    loadCuriosity();
});