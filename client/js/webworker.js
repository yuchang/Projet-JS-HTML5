var i = 0;

function timedCount() {
	i = i + 1;
	postMessage("Temps connecte: " + i);
	setTimeout("timedCount()", 1000);
}

timedCount();