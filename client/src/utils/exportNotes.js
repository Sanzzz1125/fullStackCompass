export function exportNotesAsMarkdown(progress) {
    const notes = progress?.notes || {};
    const entries = Object.entries(notes).filter(([k, v]) => v && v !== 'done' && !k.startsWith('ivdone__'));

    if (entries.length === 0) {
        alert('No notes to export yet. Add notes using the 📝 icon on any page section.');
        return;
    }

    const grouped = {};
    entries.forEach(([key, text]) => {
        const parts = key.replace('note__', '').split('__');
        const page = parts[0] || 'general';
        const section = parts[1] || '';
        if (!grouped[page]) grouped[page] = [];
        grouped[page].push({ section, text });
    });

    let md = `# My FullStack Compass Notes\n\n_Exported on ${new Date().toLocaleDateString()}_\n\n---\n\n`;
    Object.entries(grouped).forEach(([page, items]) => {
        md += `## ${page}\n\n`;
        items.forEach(({ section, text }) => {
            md += `**${section || 'Note'}**\n\n${text}\n\n`;
        });
        md += '---\n\n';
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'fullstack-compass-notes.md';
    a.click();
    URL.revokeObjectURL(url);
}
