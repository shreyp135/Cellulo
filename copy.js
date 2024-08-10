const copyButton = document.querySelectorAll(".copyButton");

function copy(text){
    const copyToast = document.getElementById("copyToast");
    navigator.clipboard.writeText(text);
    copyToast.style.display = "block";       
    setTimeout(()=> {copyToast.style.display = "none"}, 3000)
}

copyButton.forEach(element =>{
    const copyText = element.getAttribute("data-text")
    element.addEventListener("click", () => copy(copyText));
});


