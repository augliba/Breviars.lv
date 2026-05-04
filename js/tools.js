// == palūgtās Liturģisnās stundas atzīmēšana == # = id; . = class;
const bookMark = function(x) { 
	var y = (x == "vesperesI") ? "I vesperes" : x; 
	var bkmk = localStorage.getItem("bookmark");
	var messageHTML = "<p class='bookMarkText'>Iepriekšējā stunda, ko lūdzies bija <strong>" + bkmk + "</strong></p>";
	if (bkmk != null) document.querySelector("#bookMark").innerHTML = messageHTML;
	localStorage.setItem("bookmark", y);
}

{
	const root = document.documentElement;
	const step = 0.1; // soļa lielums
	var zoom = 1;
	var localZoom = localStorage.getItem("zoom");
	if (localZoom != null) zoom = parseFloat(localZoom);
	root.style.setProperty('--zoom', zoom);
	document.querySelector("#zoompercent").innerHTML = parseInt( zoom*10 );
	
	document.getElementById("increase").addEventListener("click", () => {
		zoom = zoom + step;
		updateZoom();
	});

	document.getElementById("decrease").addEventListener("click", () => {
		zoom = Math.max(0.8, zoom - step); // nepieļaut negatīvas vērtības
		updateZoom();
	});
	
	function updateZoom() {
		root.style.setProperty('--zoom', zoom);
		localStorage.setItem("zoom", zoom);
		document.querySelector("#zoompercent").innerHTML = parseInt( zoom*10 );
	}

}