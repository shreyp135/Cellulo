// Add click event listener to all .clickableDiv elements
document.querySelectorAll('.clickableDiv').forEach(function(clickableDiv) {
    
    clickableDiv.addEventListener('click', function(event) {
        var hiddenDivs = document.querySelectorAll('.hiddenDiv');
        hiddenDivs.forEach(function(hiddenDiv) {
        hiddenDiv.classList.remove('opacity-100');
        hiddenDiv.classList.add('opacity-0', 'pointer-events-none');
    });

        event.stopPropagation(); // Prevent the event from propagating to the body
        var index = this.getAttribute('data-index');
        var hiddenDiv = document.querySelector('.hiddenDiv[data-index="' + index + '"]');

        if (hiddenDiv.classList.contains('opacity-0')) {
            // Show the hidden div
            hiddenDiv.classList.remove('opacity-0', 'pointer-events-none');
            hiddenDiv.classList.add('opacity-100');
        }
    });
});

// Hide the hidden divs when clicking outside
document.body.addEventListener('click', function() {
    var hiddenDivs = document.querySelectorAll('.hiddenDiv');
    
    hiddenDivs.forEach(function(hiddenDiv) {
        hiddenDiv.classList.remove('opacity-100');
        hiddenDiv.classList.add('opacity-0', 'pointer-events-none');
    });
});
