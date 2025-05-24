const dot = document.getElementById('movable-dot')
document.addEventListener('mousemove', function(even) {
	dot.style.left = (event.clientX - 10) + 'px';
	dot.style.top = (event.clientY - 10) + 'px';
})
