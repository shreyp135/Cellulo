document.addEventListener('DOMContentLoaded', () => {
    const resizer = document.getElementById('resizer');
    const left = document.getElementById('left');
    const right = document.getElementById('right');

    
    let isResizing = false;
    let startX, startWidthLeft, startWidthRight;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidthLeft = left.getBoundingClientRect().width;
        startWidthRight = right.getBoundingClientRect().width;
        document.body.style.cursor = 'ew-resize';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const offsetX = e.clientX - startX;
        const containerWidth = left.parentElement.getBoundingClientRect().width;
        const newLeftWidth = ((startWidthLeft + offsetX) / containerWidth) * 100;
        const newRightWidth = ((startWidthRight - offsetX) / containerWidth) * 100;

        left.style.flex = `0 0 ${newLeftWidth}%`;
        right.style.flex = `0 0 ${newRightWidth}%`;
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
        document.body.style.cursor = 'default';
    });
});



