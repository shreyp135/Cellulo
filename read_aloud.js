document.addEventListener("DOMContentLoaded", () => {
    const textElements = document.querySelectorAll('.textel');
    const audioControls = document.querySelector('.audio-controls');
    const playPauseButton = document.getElementById('playPause');
    const playIcon = document.getElementById('playIcon');
    const playPauseText = document.getElementById('tooltip-pause');
    const pauseIcon = document.getElementById('pauseIcon');
    const stopButton = document.getElementById('stop');
    const progress = document.querySelector('.progress');
    const autoplayButton = document.getElementById('autoplay');
    const autoplayText = document.getElementById('tooltip-autoplay');
    const speedButton = document.getElementById('speed');
    const speedText = document.getElementById('tooltip-speed');
    const prevButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const cells = document.querySelectorAll(".clickableDiv")

    let utterance, currentIndex = 0, autoplay = true, playing = false, speed = 1;


    function readText(index) {
                for(let i=0;i<=currentIndex;i++){
                    cells[index].classList.remove('ring-2');
                }

                if (index < textElements.length) {
                    const text = textElements[index].getAttribute('data-text');
                    utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = speed;
                    utterance.onstart = () => {
                    playing = true;
                    // Reset play/pause icon
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    playPauseText.textContent = 'Pause';
                    // Show the audio controls
                     audioControls.classList.remove('hidden');

                    cells[index].classList.add('ring-2');
                    };
                    utterance.onend = () => {
                        playing = false;
                        playIcon.style.display = 'block';
                        pauseIcon.style.display = 'none';
                        audioControls.classList.add('hidden');
                        progress.style.width = '0%';
                        cells[index].classList.remove('ring-2')
                        if (autoplay && index < textElements.length - 1) {
                            currentIndex++;
                            readText(currentIndex);
                        }
                    };
                    utterance.onboundary = (event) => {
                        const percentage = (event.charIndex / text.length) * 100;
                        progress.style.width = `${percentage}%`;
                    };
                   
                    // speechSynthesis.speak(utterance);
                    window.speechSynthesis.speak(utterance);

                }
            }



    autoplayButton.addEventListener('click', () => {
                autoplay = !autoplay;
                autoplayText.textContent = `Autoplay: ${autoplay ? 'On' : 'Off'}`;
            });
    speedButton.addEventListener('click', () => {
                if(speed===1){
                    speed = 3;
                    speedText.textContent = 'Speed: 1.5';
                }else if(speed===3){
                    speed = 7;
                    speedText.textContent = 'Speed: 2';
                }else{
                    speed = 1;
                    speedText.textContent = 'Speed: 1';
                }
                    utterance.rate = speed;
                    speechSynthesis.cancel();
                    readText(currentIndex);
            });
    playPauseButton.addEventListener('click', () => {
        if (playing) {
            speechSynthesis.pause();
            playing = false;
            playIcon.style.display = '';
            pauseIcon.style.display = 'none';
            playPauseText.textContent = 'Play';
        } else {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            } else {
                readText(currentIndex);
            }
            playing = true;
            playIcon.style.display = 'none';
            pauseIcon.style.display = '';
            playPauseText.textContent = 'Pause';
        }
      
    });

    prevButton.addEventListener('click',()=>{
        if (currentIndex > 0) {
            cells[currentIndex].classList.remove('ring-2');
            currentIndex--;
            speechSynthesis.cancel();
            readText(currentIndex);
        }
    });

    nextButton.addEventListener('click',()=>{
        if (currentIndex < textElements.length - 1) {
            cells[currentIndex].classList.remove('ring-2');
            currentIndex++;
            speechSynthesis.cancel();
            readText(currentIndex);
        }
    });

    stopButton.addEventListener('click', () => {
        speechSynthesis.cancel();
        playIcon.style.display = 'block';
        playing = false;
        pauseIcon.style.display = 'none';
        audioControls.classList.add('hidden');
        progress.style.width = '0%';
        cells[currentIndex].classList.remove('ring-2')
    });


    textElements.forEach((text, index) => {
        text.addEventListener('click', () => {
                    cells[currentIndex].classList.remove('ring-2')
                    currentIndex = index;
                    speechSynthesis.cancel();
                    readText(currentIndex);
        });
    });
   

});
