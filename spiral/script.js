const canvas = document.getElementById('primeCanvas');
const ctx = canvas.getContext('2d');

let currentNumber = 1;
const maxNumber = 10000;
const spacing = 15;
let animationFrame;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function drawSpiral() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    let x = centerX;
    let y = centerY;
    let direction = 0;
    let stepsTaken = 0;
    let stepsInCurrentDirection = 1;
    
    for (let num = 1; num <= currentNumber; num++) {
        if (isPrime(num)) {
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#00ffff';
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fill();
        }
        
        switch (direction) {
            case 0: x += spacing; break;
            case 1: y -= spacing; break;
            case 2: x -= spacing; break;
            case 3: y += spacing; break;
        }
        
        stepsTaken++;
        
        if (stepsTaken === stepsInCurrentDirection) {
            stepsTaken = 0;
            direction = (direction + 1) % 4;
            if (direction === 0 || direction === 2) {
                stepsInCurrentDirection++;
            }
        }
    }
    
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    // ctx.fillText(`Numbers: ${currentNumber} of ${maxNumber}`, 20, 30);
    
    if (currentNumber < maxNumber) {
        currentNumber += 4;
        animationFrame = requestAnimationFrame(drawSpiral);
    } else {
        setTimeout(() => {
            currentNumber = 1;
            drawSpiral();
        }, 2000);
    }
}

window.addEventListener('resize', resize);
resize();
drawSpiral();
