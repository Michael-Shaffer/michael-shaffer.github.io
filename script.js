const dot = document.getElementById('movable-dot')
document.addEventListener('mousemove', function(even) {
	dot.style.left = event.clientX + 'px';
	dot.style.top = event.clientY + 'px';
	const trail = document.createElement('div');
	trail.className = 'trail';
	trail.style.left = (event.clientX - 4) + 'px'
	trail.style.top = (event.clientY - 4) + 'px'
	document.body.appendChild(trail);
	setTimeout(() => {
		trail.remove();
	}, 500);
});
