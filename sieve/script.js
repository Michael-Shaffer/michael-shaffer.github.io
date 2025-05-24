const MAX_NUMBER = 100;
let timeouts = [];
let currentPrime = 2;

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
    document.getElementById('start').addEventListener('click', startSieve);
    document.getElementById('reset').addEventListener('click', resetSieve);
});

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= MAX_NUMBER; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = '';
        cell.id = `cell-${i}`;
        grid.appendChild(cell);
        
        // Mark 1 as special case (neither prime nor composite)
        if (i === 1) {
            cell.style.backgroundColor = '#9e9e9e';
        }
    }
}

function startSieve() {
    // Disable start button
    document.getElementById('start').disabled = true;
    
    // Start with 2 as the first prime
    markPrime(2);
    
    // The sieve algorithm
    let delay = 1;
    for (let p = 2; p * p <= MAX_NUMBER; p++) {
        // If p is prime, mark all its multiples
        const cellElement = document.getElementById(`cell-${p}`);
        if (!cellElement.classList.contains('composite')) {
            // Mark this as current prime with delay
            timeouts.push(setTimeout(() => {
                resetCurrentPrime();
                cellElement.classList.add('current');
                document.getElementById('current-prime').textContent = p;
                currentPrime = p;
            }, delay * 800));
            
            // Mark multiples as composite with additional delay
            for (let i = p * p; i <= MAX_NUMBER; i += p) {
                timeouts.push(setTimeout(() => {
                    const multiple = document.getElementById(`cell-${i}`);
                    multiple.classList.add('multiple');
                    setTimeout(() => {
                        multiple.classList.remove('multiple');
                        multiple.classList.add('composite');
                    }, 300);
                }, delay * 800 + 400));
            }
            delay++;
        }
    }
    
    // Final step - mark all unmarked numbers as prime
    timeouts.push(setTimeout(() => {
        resetCurrentPrime();
        for (let i = 2; i <= MAX_NUMBER; i++) {
            const cell = document.getElementById(`cell-${i}`);
            if (!cell.classList.contains('composite') && !cell.classList.contains('prime')) {
                cell.classList.add('prime');
            }
        }
        document.getElementById('current-prime').textContent = 'Done!';
        document.getElementById('start').disabled = false;
    }, delay * 800 + 600));
}

function markPrime(num) {
    const cell = document.getElementById(`cell-${num}`);
    cell.classList.add('prime');
}

function resetCurrentPrime() {
    const current = document.querySelector('.current');
    if (current) {
        current.classList.remove('current');
        if (!current.classList.contains('composite')) {
            current.classList.add('prime');
        }
    }
}

function resetSieve() {
    // Clear all timeouts
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
    
    // Reset the grid
    createGrid();
    
    // Reset the current prime display
    document.getElementById('current-prime').textContent = '-';
    document.getElementById('start').disabled = false;
}
