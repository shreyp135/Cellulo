
async function renderPdf(pdfUrl) {
    localStorage.clear()
    const imagesArray = [];

    try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const numPages = pdf.numPages;

        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({ scale: 0.3 }); // Adjust scale as needed

            // Prepare canvas element to render the page
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;

            // Convert canvas to base64 data URL
            const imgSrc = canvas.toDataURL('image/jpeg'); // or 'image/png'


            // Store image in the array
            imagesArray[pageNumber - 1] = imgSrc;

        }

        //adding the array in the session storage
        localStorage.setItem("pages",JSON.stringify(imagesArray));


    } catch (error) {
        console.error('Error loading or rendering PDF:', error);
    }
}

// Call the renderPdf function when the render page is opened
const currPage = document.getElementById("currPage");
const pdfUrl = currPage.getAttribute("data-url");
window.onload = renderPdf(pdfUrl);

