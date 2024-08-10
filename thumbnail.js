   
    function getThumbnail(id,pdfUrl) {    
    
    // Load PDF document
     pdfjsLib.getDocument(pdfUrl)
       .promise
       .then(pdf => {
           // Render thumbnail
           pdf.getPage(1)
             .then(page => {
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
    
    
               page.render(renderContext).promise.then(() => {
                 // Convert canvas to base64 data URL
                 const imgSrc = canvas.toDataURL('image/jpeg'); // or 'image/png'  
                 const image = document.getElementById(id);
                 image.src = imgSrc;

               });
             })
             .catch(error => {
               console.error('Error rendering thumbanil:', error);
             });
         
       })
       .catch(error => {
         console.error('Error loading PDF:', error);
       });
    }


//for streaming pdf
const streaming_pdf = document.getElementById("thumbnail{{pdf.id}}");

//get pdf url and id for streaming pdf
const streaming_url = streaming_pdf.getAttribute("data-url");
const streaming_id = streaming_pdf.getAttribute("data-id");

//get thumbnail for streaming pdf
getThumbnail(streaming_id,streaming_url);

 //for each pdf in collection
 const pdfLists = document.querySelectorAll("thumbnail");
 pdfLists.forEach(element => {

 //get pdf url and id for every pdf in collection 
 const pdfId = element.getAttribute("data-id");
 const pdfUrl = element.getAttribute("data-url");

 //get thumbnails for pdfs
 getThumbnail(pdfId, pdfUrl);
});
