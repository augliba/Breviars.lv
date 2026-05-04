var acc = document.getElementsByClassName("accordion");
for (var i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		/* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */
    this.classList.toggle("active");
		/* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
		panel.style.display = "none";
    } else {
		panel.style.display = "block";
    }
  });
}

// jāizveido elements <div id='bugs'>ConsoleLog<br></div>
const debug = function(a,b) {
  document.getElementById("bugs").insertAdjacentHTML("beforeend", ` ${a} <br> ${b} <br> `);
}

/* Sākums = Izvēršamās pogas= */
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function choose(a) {
  document.getElementById(a).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function myFunction() {
	document.getElementById("main-menu-content").classList.toggle("show");
}
window.onclick = function(event) {
	if (!event.target.matches('.menu-button')) {
		var dropdowns = document.getElementsByClassName("main-menu-content");
		for (var i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i]; 
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}

/* Beigas = Izvēršamās pogas= */