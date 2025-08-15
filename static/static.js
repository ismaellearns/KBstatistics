document.addEventListener('DOMContentLoaded', () => {
    // Selecteer HTML-elementen
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const minutesInput = document.getElementById('minutes-input');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const playerInput = document.getElementById('player-input');
    const actionSelect = document.getElementById('action-select');
    const addActionButton = document.getElementById('add-action-button');
    const actionsList = document.getElementById('actions-list');

    let totalSeconds = 0;
    let timerInterval;
    let isPaused = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }

    function startTimer() {
        if (!isPaused) {
            totalSeconds = parseInt(minutesInput.value, 10) * 60;
            if (totalSeconds <= 0) return;
        }

        isPaused = false;
        startButton.disabled = true;
        pauseButton.disabled = false;

        timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                startButton.disabled = false;
                pauseButton.disabled = true;
                return;
            }
            totalSeconds--;
            updateTimerDisplay();
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isPaused = true;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isPaused = false;
        totalSeconds = parseInt(minutesInput.value, 10) * 60;
        updateTimerDisplay();
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
    
    function addAction() {
        const playerName = playerInput.value.trim();
        const actionType = actionSelect.value;
        
        if (playerName === '') {
            alert('Voer een spelernaam in.');
            return;
        }
        
        // Bereken de tijd van de actie
        const minutesPassed = Math.floor((parseInt(minutesInput.value, 10) * 60 - totalSeconds) / 60);
        const secondsPassed = (parseInt(minutesInput.value, 10) * 60 - totalSeconds) % 60;
        const actionTime = `${String(minutesPassed).padStart(2, '0')}:${String(secondsPassed).padStart(2, '0')}`;
        
        // Maak een nieuw list-item aan voor de actie
        const li = document.createElement('li');
        li.textContent = `Tijd: ${actionTime} | Speler: ${playerName} | Actie: ${actionType}`;
        actionsList.appendChild(li);
        
        // Reset de inputvelden
        playerInput.value = '';
    }

    // Event listeners
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    addActionButton.addEventListener('click', addAction);

    // Initialiseer de klok
    updateTimerDisplay();
});
