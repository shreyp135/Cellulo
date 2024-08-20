const drawingContainer = document.getElementById('drawingContainer');
const drawingDiv = document.getElementById('drawingDiv');
const canvasElement = document.createElement('canvas');
drawingDiv.appendChild(canvasElement);
const imgURL = drawingDiv.getAttribute("img-url");

const canvas = new fabric.Canvas(canvasElement);

// Function to fit the image within the viewport
function fitImageToViewport(imgWidth, imgHeight) {
    const maxWidth = window.innerWidth * 0.9; // 90% of the viewport width
    const maxHeight = window.innerHeight * 0.9; // 90% of the viewport height
    let width = imgWidth;
    let height = imgHeight;

    // Adjust dimensions if the image exceeds the viewport size
    if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
    }
    if (height > maxHeight) {
        const ratio = maxHeight / height;
        height = maxHeight;
        width = width * ratio;
    }

    return { width, height };
}

// Load the image and set the canvas size
fabric.Image.fromURL(imgURL, (img) => {
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Fit the image within the viewport
    const { width, height } = fitImageToViewport(imgWidth, imgHeight);

    // Set canvas dimensions
    canvas.setWidth(width);
    canvas.setHeight(height);

    // Set the drawingDiv dimensions
    drawingDiv.style.width = `${width}px`;
    drawingDiv.style.height = `${height}px`;

    // Set the background image with scaling
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: width / imgWidth,
        scaleY: height / imgHeight,
    });
});


        fabric.Object.prototype.set({
            transparentCorners: true,
            borderColor: 'rgba(0,0,255,0.5)',
            cornerColor: 'blue',
            hasRotatingPoint: false,
        });

        const button = document.getElementById('drawRectButton');
        let isDrawing = false;
        let isReadyToDraw = false;
        let rect, origX, origY;

        button.addEventListener('click', () => {
            isReadyToDraw = !isReadyToDraw;
            if (isReadyToDraw) {
                button.textContent = 'Drawing';
                canvas.defaultCursor = 'crosshair';
                drawingDiv.classList.add('drawing-cursor');
            } else {
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 32 32"><path fill="#4b4b4b" d="M12 6H8V2H6v4H2v2h4v4h2V8h4zm4 0h4v2h-4zm8 0v2h4v4h2V8a2 2 0 0 0-2-2zM6 16h2v4H6zm2 12v-4H6v4a2 2 0 0 0 2 2h4v-2zm20-12h2v4h-2zM16 28h4v2h-4zm12-4v4h-4v2h4a2 2 0 0 0 2-2v-4z"/></svg>`;
                canvas.defaultCursor = 'default';
                drawingDiv.classList.remove('drawing-cursor');
            }
        });

        canvas.on('mouse:down', (options) => {
            if (isReadyToDraw) {
                isDrawing = true;
                const pointer = canvas.getPointer(options.e);
                origX = pointer.x;
                origY = pointer.y;
                rect = new fabric.Rect({
                    left: origX,
                    top: origY,
                    fill: 'transparent',
                    stroke: 'blue',
                    strokeWidth: 0.75,
                    width: 0,
                    height: 0,
                    selectable: true,
                    hasControls: true
                });
                canvas.add(rect);
            }
        });

        canvas.on('mouse:move', (options) => {
            if (!isDrawing || !rect) return;
            const pointer = canvas.getPointer(options.e);
            rect.set({
                width: Math.abs(origX - pointer.x),
                height: Math.abs(origY - pointer.y),
                left: pointer.x < origX ? pointer.x : origX,
                top: pointer.y < origY ? pointer.y : origY
            });
            canvas.renderAll();
        });

        canvas.on('mouse:up', () => {
            if (isDrawing) {
                isDrawing = false;
                isReadyToDraw = false;
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 32 32"><path fill="#4b4b4b" d="M12 6H8V2H6v4H2v2h4v4h2V8h4zm4 0h4v2h-4zm8 0v2h4v4h2V8a2 2 0 0 0-2-2zM6 16h2v4H6zm2 12v-4H6v4a2 2 0 0 0 2 2h4v-2zm20-12h2v4h-2zM16 28h4v2h-4zm12-4v4h-4v2h4a2 2 0 0 0 2-2v-4z"/></svg>`;
                canvas.defaultCursor = 'default';
                drawingDiv.classList.remove('drawing-cursor');
                updateCoords(rect);
            }
        });

        canvas.on('object:modified', (options) => {
            updateCoords(options.target);
        });

        function updateCoords(rect) {
            const coords = `Coordinates: left: ${rect.left}, top: ${rect.top}, width: ${rect.width * rect.scaleX}, height: ${rect.height * rect.scaleY}`;
        }
