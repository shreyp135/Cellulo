const pagesArray = JSON.parse(sessionStorage.getItem("pages"));


const pageList = document.getElementById("pageList");

for(const i=0;i<pagesArray.length();i++)
{

    const img = document.createElement("img");
    img.src = pagesArray[i];

    const pageNumberDiv = document.createElement("div");
    pageNumberDiv.innerText = `${i+1}`;

    const link = document.createElement("a");
    const pdfId = `{{pdf.id}}`
    link.href = `/cells/render/${pdfId}/${i+1}/`;

    link.appendChild(img);
    link.appendChild(pageNumberDiv);
    pageList.appendChild(link);

}


function setPage(){
    const pageNumber = `{{page.order}}`;
    const page = document.getElementById("currPage");
    page.src = pagesArray[pageNumber-1];
}

window.onload = setPage();
