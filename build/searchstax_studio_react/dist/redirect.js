const drupalRoot = document.getElementById('main-content');
if (drupalRoot) {
	const reactRoot = document.getElementById('root');
	if (!reactRoot && !window.location.pathname.startsWith("/admin")) {
		window.location.href = "/?url=" + window.location.pathname;
	}
}