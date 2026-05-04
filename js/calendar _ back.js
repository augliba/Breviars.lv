// const calendar = document.querySelector("#kalendars"); // kā CSS # = id; . = class;
//gads[dienasIndekss].krasa; psalmuNedela; litGadaCikls; ≡


if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

var todayIndex = dayOfYear(new Date());
var soDiena = "";
var laiks = new Date();
var selectedNedela;
var selectedDay;
var selectedDayId;
var selectedSvetdiena;
var selectedStunduDatums;
var selectedLitlaiks;
var selectedFestum;
var selectedVesperesI;

var festumShow={PSN:{ND:{vesperesI:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:"",lugums5:""},lugsimies:""},laudes:{title:"",ievdant:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:""},lugsimies:""},dienas:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",stunda:{3:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""},6:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""},9:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""}},lugsimies:""},vesperes:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:"",lugums5:""},lugsimies:""}}}};

// var festumShow = {PSN:{ND:{vesperesI:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",mbant:{A:"",B:"",C:""},lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:"",lugums5:""},lugsimies:""},laudes:{title:"",ievdant:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",mbant:{A:"",B:"",C:""},lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:""},lugsimies:""},dienas:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",stunda:{3:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""},6:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""},9:{himna:"",ant:"",ps1:"",ps2:"",ps3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",lugsimies:""}},lugsimies:""},vesperes:{title:"",himna:"",ps1:"",ps2:"",ps3:"",ant1:"",ant2:"",ant3:"",lasijumstitle:"",lasijumstext:"",atb1:"",atb2:"",atb3:"",magbenant:"",mbant:{A:"",B:"",C:""},lugumi:"",resplugums:"",lugums:{lugums1:"",lugums2:"",lugums3:"",lugums4:"",lugums5:""},lugsimies:""}}}};

// var currentTime = document.querySelector("#currentTime");
//currentTime.innerHTML = "Stunda " + laiks.getHours();
var lugsana = document.querySelector("#LugsanuTeksts");


const drawCalendar = function(date, elementId) {
  document.getElementById("menesis").innerHTML = Menesis[date.getMonth()] + "-" + date.getFullYear();
  year = date.getFullYear();
  document.querySelector("#psNedela").innerHTML = "izvēlies dienu...";
  rubricella();

  const calendar = document.querySelector("#" + elementId);
  calendar.innerHTML = '';

  // KALENDĀRA IZVEIDE
  // == NEDĒĻAS DIENAS NOSAUKUMS ==
  for (weekDay = 0; weekDay < 7; weekDay++) {
    var nameWeekend = (weekDay > 4) ? "week-name-weekend" : "";
    calendar.insertAdjacentHTML("beforeend", `<div class='week-name ${nameWeekend}'> ${weekDayName[weekDay]} </div>`);
  }
  //== PIELIEK TUKŠUMUS MĒNEŠA SĀKUMĀ ==
  var nedelasDiena = (date.getDay() === 0) ? 6 : date.getDay() - 1; //  0 for Sunday, 1 for Monday, 2 for Tuesday, and so on
  for (blank = 0; blank < nedelasDiena; blank++) {
    calendar.insertAdjacentHTML("beforeend", `<div class='blank'> </div>`);
  }

  //== DATUMI & NOTIKUMI ==
  for (day = 1; day <= getDaysInMonth(date); day++) {
    var datums = new Date(date.getFullYear(), date.getMonth(), day);
    var dienasIndekss = dayOfYear(new Date(datums));
    const weekend = isWeekend(new Date(datums));
    litkrasa = gads[dienasIndekss].krasa;
    calendar.insertAdjacentHTML("beforeend", `<div id="${dienasIndekss}" class="diena ${litkrasa}">${day}</div>`);
    //debug(today,datums);
    if ( new Date(today).valueOf() == new Date(datums).valueOf() ) {
      // nedrīkst likt 'var' priekšā šiem mainīgajiem
      todayIndex = dienasIndekss;
      soDiena = datums;
      document.getElementById(dienasIndekss).classList.add("today", "selected");
    }
  }

}

drawCalendar(date, "kalendars"); //šeit zīmē kalendāru

// Laudes un Vesperes stundu lugsanas izveide atkarībā no datuma, padod veidu "laudes vai vesperes", "svētki" pēc noklusējuma ir standarta liturģiskais laiks
const LaudesVesperes = function(stunda, svetki) { //svetki var būt  liturgiskaisLaiks
	var d = selectedDayId;
	var d1 = parseInt(d)+1;
	var nd = nd0 = selectedDay;
	var psn = psn0 = selectedNedela; 
	var svetdiena = selectedSvetdiena;
	var ll = selectedLitlaiks;
	var himna = himnaLat;
	var izveletaisPsalms = 'psalms95';
	var izvele = 'ar';
	
	const atkartoAnt = function() { // Ievadpsalmā ieliek atkārtojošos antifonu
		container = document.querySelector('#containerIevadpsalms');
		sel = container.querySelectorAll('#atkartoAnt');
		for(var i = 0; i < sel.length; i++){
			sel[i].innerHTML = '<span class="redbold">Ant.&nbsp;</span>' + window[liturgiskaisLaiks][psn][nd].laudes.ievdant;
			sel[i].style.display = 'initial';
				}
	}
	
	//Priekšpusdienas 9.00-12.00 Pudienu 12.00-15.00 Pēcpusdienas 15.00-18.00
	if (laiks.getHours() < 12) { var dienasStunda = 3; } 
	else if (laiks.getHours() >= 12 && laiks.getHours() < 15) { dienasStunda = 6; }
	else { dienasStunda = 9; }

// liturģiskā laika noteikšana
	if ( (gads[d].datums > cal.zsl1 && gads[d].datums < cal.gav0) || (gads[d].datums >= cal.pll2 && gads[d].datums <= cal.pll3) ) {
		var liturgiskaisLaiks = liturgiskaisLaiks0 = 'parastais';
		if ( gads[d].datums.valueOf() == cal.pll3.valueOf() && stunda == 'vesperes') {
			liturgiskaisLaiks = liturgiskaisLaiks0 = 'advents'; // console.log("Adventa sākums ar vesperēm");
			psn = psn0 = 0;
			nd = nd0 = 6
			}
	}
	else if ( ( gads[d].datums > cal.adv1 && gads[d].datums <= new Date ( year, 11, 31 ) ) || (gads[d].datums >= new Date ( year, 0, 1 ) && gads[d].datums <= cal.zsl1) ) {
		console.log("Ziemassvētki");
		liturgiskaisLaiks = liturgiskaisLaiks0 = 'zemassvetki';
		psn0=psn;
		psn = 0;
		nd = gads[d].datums.getDate(); // datums
		ned = gads[d].datums.getDay(); // nedēļas diena
		
	}
	else if (gads[d].datums >= cal.adv0 && gads[d].datums <= cal.adv1) { //  cal.adv1 = 24.vesperes jau ir ZS
		liturgiskaisLaiks = liturgiskaisLaiks0 = 'advents';
		if ( ( nd !=0 || ( nd !=6 && stunda == 'vesperes' ) )
			&& gads[d].datums.valueOf() >= new Date(year, 11, 17).valueOf() 
			&& gads[d].datums.valueOf() <= new Date(year, 11, 24).valueOf() ) { // sākot no 17.datuma			console.log('AHA', gads[d].datums.getDate()); //================================
			psn0=psn;
			psn = 'advents';
			nd = gads[d].datums.getDate(); // datums
			ned = gads[d].datums.getDay(); // nedēļas diena
			
			if (gads[d].datums.valueOf() == new Date(year, 11, 24).valueOf()) {
				advents.advents[nd].laudes.ievdant = advents[0].ant24;
			}
			else {
				advents.advents[nd].laudes.ievdant = advents[0].ant17;
			}
			
			if ( stunda != 'dienas') {
				advents.advents[nd][stunda].ant1 = advents.ant[ned].ant1;
				advents.advents[nd][stunda].ant2 = advents.ant[ned].ant2;
				advents.advents[nd][stunda].ant3 = advents.ant[ned].ant3;
			}

				advents.advents[nd][stunda].ps1 = parastais[psn0][ned][stunda].ps1;
				advents.advents[nd][stunda].ps2 = parastais[psn0][ned][stunda].ps2;
				advents.advents[nd][stunda].ps3 = parastais[psn0][ned][stunda].ps3;
			
			}
 			if ( gads[d].datums.valueOf() == new Date(year, 11, 24).valueOf() && stunda == 'vesperes'  ) { // ziemassvētku vigilija
				liturgiskaisLaiks = 'zemassvetki';
				psn = 0;
				nd = 24;
			} 
	}
	else if (gads[d].datums >= cal.gav0 && gads[d].datums < cal.lieldienas) {
		if(gads[d].datums >= cal.pelnutrsd && gads[d].datums <= cal.pelnuned) { psn = 0; } // pelnu nedēļas psn = 0;
		liturgiskaisLaiks = liturgiskaisLaiks0 = 'gavenis';
	}
	else if (gads[d].datums >= cal.lieldienas && gads[d].datums <= cal.vasarsvetki) {
		if(gads[d].datums.valueOf() == cal.vasarsvetki.valueOf()) psn=8; // Lieldnienu laika pēdējā diena ir Vasarsvētki
		liturgiskaisLaiks = liturgiskaisLaiks0 = 'lieldienas';
	}
	else {
		liturgiskaisLaiks = liturgiskaisLaiks0 = 'parastais'; // = ja nav sataisīts citādi;
	}
	
	if (liturgiskaisLaiks == 'parastais') psn = psn0= psalmuNedela(selectedNedela);

console.log(liturgiskaisLaiks, "psn: ",psn, " nd: ", nd);

// FESTUM liturģijas noteikšana ===
	const festum = function (x) {
		var f1 = gads[x].liturgija.split('-')[0]; // atbilst liturgiskaisLaiks
		var f2 = gads[x].liturgija.split('-')[1]; // atbilst psn
		var f3 = gads[x].liturgija.split('-')[2]; // atbilst nd
		
		for ( i in festumShow.PSN.ND ) {
			for ( j in festumShow.PSN.ND[i] ) { // j==ant1
				if( typeof window[f1][f2][f3][i] != 'undefined' ) { // svētkos, kuros nav I Vesperes šis zemākais ir jāizlaiž console.log("j = ", j); 
					if (j == 'lugums' && window[f1][f2][f3][i][j].lugums1 != '') { // pēdējam salīdzinājumam var nebūt jēga, jo kaut kādam speciāla lūgumam ir jābūt
						festumShow.PSN.ND[i][j] = window[f1][f2][f3][i][j]; // lūgumu var būt vairāk nekā parasti, tāpēc jāpārkopē viss objekts
					}
					else if ( typeof(festumShow.PSN.ND[i][j]) == 'object' )  {
						for ( o in festumShow.PSN.ND[i][j] ) { 
							if ( typeof(festumShow.PSN.ND[i][j][o]) == 'object' ) {
								for ( q in festumShow.PSN.ND[i][j][o] ) { // q==ant
									if (window[f1][f2][f3][i][j][o][q] != '' ) festumShow.PSN.ND[i][j][o][q] = window[f1][f2][f3][i][j][o][q];
									else festumShow.PSN.ND[i][j][o][q] = window[liturgiskaisLaiks][psn][nd][i][j][o][q];
								}
							}
							else {
								if (window[f1][f2][f3][i][j][o] != '' ) festumShow.PSN.ND[i][j][o] = window[f1][f2][f3][i][j][o];
								else festumShow.PSN.ND[i][j][o] = window[liturgiskaisLaiks][psn][nd][i][j][o];
							}
						}
					}
					else {
						if (window[f1][f2][f3][i][j] != '' ) festumShow.PSN.ND[i][j] = window[f1][f2][f3][i][j];
						else {
							if  (i == 'vesperesI') festumShow.PSN.ND[i][j] = window[liturgiskaisLaiks][psn][nd]['vesperes'][j];
							else {
								//if ( j != '' ) 
									festumShow.PSN.ND[i][j] = window[liturgiskaisLaiks][psn][nd][i][j];
								}
						}
					}
				}
			}
		}
		psn = 'PSN';
		nd = 'ND';
		liturgiskaisLaiks = 'festumShow';
	}
	
	// I vesperes noteikšana
	if ( gads[d1].liturgija && (gads[d1].prior <= gads[d].prior) && (stunda == 'vesperes') && (gads[d1].vesperesI == true || nd==6 ) && gads[d1].liturgija) {
		festum(d1);
		stunda = 'vesperesI';
		if (gads[d1].prior <= gads[d].prior) d=d1;
		}
	else if (gads[d].liturgija) { 
		festum(d); console.log("=====", d)
	}
// FESTUM === END

	if ( gads[d].datums.valueOf() == cal.pll3.valueOf() && (stunda == 'vesperes' || stunda == 'vesperesI') ){ // adventa pirmās I VESPERES
		liturgiskaisLaiks = 'advents'; psn = 1;
	}
	
	if ( gads[d].datums.valueOf() == cal.zsl1.valueOf() && stunda == 'vesperes' ){ // nomaina liturģisko laiku no ZS uz parasto I VESPERES
		liturgiskaisLaiks = 'parastais'; psn = 0;
	}
	
  //  I VESPERES
  
 	if ( (stunda == 'vesperes' && gads[d1].prior < gads[d].prior && nd0==6) ){ // lai svētdien varētu pirmās vesperes svarīgos svētkos
		liturgiskaisLaiks = liturgiskaisLaiks0;
		psn = psn0;
		nd = nd0;
	} 
  
  if ( stunda == 'vesperes' && nd == 6) {  // console.log(liturgiskaisLaiks, 'Sestdienas vesperes')
		psn++;
		if(liturgiskaisLaiks == 'parastais' && psn === 5 ) psn = 1; // parastajā laikā ir tikai 4 nedēļas
	 } // jāuzliek liturģisko laiku pāreja


	lugsana.innerHTML = htmlTemplate; // izsauc liturģijas pamatu
	if(stunda ==  'dienas'){ //noslēpj nevajadzīgos elementus
		document.querySelector('#containerLaudesIntro').style.display = 'none';
		document.querySelector('#containerIevadpsalms').style.display = 'none';
		document.querySelector('#containerDziedajums').style.display = 'none';
		document.querySelector('#containerLugumi').style.display = 'none';
		document.querySelector('#containerKungaLugsana').style.display = 'none';
		document.querySelector('#ievadPsalmaDropdown').style.display = 'none';
	}
	if (stunda == 'vesperes' || stunda == 'vesperesI') { //noslēpj nevajadzīgos elementus
	  document.querySelector('#containerLaudesIntro').style.display = 'none';
	  document.querySelector('#containerIevadpsalms').style.display = 'none';
	  document.querySelector('#ievadPsalmaDropdown').style.display = 'none';
  }
  
    //========================
	// containerStunduTitle	
	// < ======================== console.log(liturgiskaisLaiks, psn, nd, stunda);
	document.querySelector('#title').innerHTML = window[liturgiskaisLaiks][psn][nd][stunda].title;
	
	if( gads[d].N && liturgiskaisLaiks == 'festumShow' && document.querySelector('#N')) document.querySelector('#N').innerHTML = gads[d].N;
	
	console.log('Note: ' + liturgiskaisLaiks + ', dienaId: ' + d, 'psn:', psn);
	
	// containerBezIevadpsalma
	 if (stunda =='laudes') document.querySelector('#containerBezIevadpsalma').style.display = 'none';
	// containerLaudesIntro
	// containerIevadpsalms 
	sel = document.querySelectorAll('#ievadpsalmsAnt'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd].laudes.ievdant;
	document.querySelector('#ievadpsalms').innerHTML = psalms95;
	atkartoAnt();
	// izvadpsalma izvēles
	sel = document.querySelector('#ievadPsalmaDropdownContent'); // automātiski pa nedēļām
	var ievads = '<a href="#psalms95">Psalms 95 Nāciet, dziedāsim Kungam ar prieku</a> \
						<a href="#psalms100">Psalms 100 Gavilējiet Kungam, visa zeme!</a> \
						<a href="#psalms24">Psalms 24 Kungam pieder zeme...</a> \
						<a href="#psalms67">Psalms 67 Lai Dievs apžēlojas par mums...</a> \
						<a href="#bez">Bez ievadpsalma</a>';
	sel.innerHTML = ievads;
	// izvadpsalma seletor
	var items = document.querySelectorAll('#ievadPsalmaDropdownContent a');
	for(var i =0; i<items.length; i++) {
		items[i].addEventListener("click", function(p) { 
			izvele = p.target.hash.substring(1);
			if (izvele == 'bez') {
				document.querySelector('#containerLaudesIntro').style.display = 'none';
				document.querySelector('#containerIevadpsalms').style.display = 'none';
				document.querySelector('#containerBezIevadpsalma').style.display = 'initial';
			} else {
				document.querySelector('#containerLaudesIntro').style.display = 'initial';
				document.querySelector('#containerIevadpsalms').style.display = 'initial';
				document.querySelector('#containerBezIevadpsalma').style.display = 'none';
				izveletaisPsalms = p.target.hash.substring(1);
				document.querySelector('#ievadpsalms').innerHTML = window[izveletaisPsalms];
				// ieleik Ant. iekš #atkartoAnt
				atkartoAnt();
				// nomaina Ps psalmodijā, ja sakrīt
				if(izveletaisPsalms == window[liturgiskaisLaiks][psn][nd][stunda].ps1) document.querySelector('#psalms1').innerHTML = psalms95;
				if(izveletaisPsalms == window[liturgiskaisLaiks][psn][nd][stunda].ps2) document.querySelector('#psalms2').innerHTML = psalms95;
				if(izveletaisPsalms == window[liturgiskaisLaiks][psn][nd][stunda].ps3) document.querySelector('#psalms3').innerHTML = psalms95;
			}
			if(izvele == 'bez' || izveletaisPsalms == 'psalms95') { // šis nostāda noklusētos psalmus
				document.querySelector('#psalms1').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps1];
				document.querySelector('#psalms2').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps2];
				document.querySelector('#psalms3').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps3];
			}
		} );
	}

	
	// containerHimna
	if(stunda == 'dienas'){
		document.querySelector('#himna').innerHTML =window[window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].himna];
		}
	else {
		document.querySelector('#himna').innerHTML =window[window[liturgiskaisLaiks][psn][nd][stunda].himna];
		}
	
	// containerPsalmodijs
	const dienasPs = function(x){
		console.log('dienas psalmi', liturgiskaisLaiks, psn, nd, ll, x);
		if ( ll == 'zokt'  || ll == 'zsl') {
			console.log(d,' nu tad', psn0, nd0, parastais[psn0][nd0].dienas.ps1);
			document.querySelector('#psalms1').innerHTML = window[parastais[psn0][nd0].dienas.ps1];
			document.querySelector('#psalms2').innerHTML = window[parastais[psn0][nd0].dienas.ps2];
			document.querySelector('#psalms3').innerHTML = window[parastais[psn0][nd0].dienas.ps3];
		}
		else if(stunda == 'dienas' && window[window[liturgiskaisLaiks][psn][nd]["dienas"]["stunda"][x].ps1]){
			document.querySelector('#psalms1').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda]["stunda"][x].ps1];
			document.querySelector('#psalms2').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda]["stunda"][x].ps2];
			document.querySelector('#psalms3').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda]["stunda"][x].ps3];
		}
		else {
			document.querySelector('#psalms1').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps1];
			document.querySelector('#psalms2').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps2];
			document.querySelector('#psalms3').innerHTML = window[window[liturgiskaisLaiks][psn][nd][stunda].ps3];
		}
	}
	dienasPs(dienasStunda);

	const dienasAnt = function (x) {
		//var specialasAnt = typeof window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'];
		if( stunda == 'dienas' && ( liturgiskaisLaiks == 'gavenis' || liturgiskaisLaiks == 'lieldienas' || (liturgiskaisLaiks == 'festumShow' && ll != 'pll') || typeof window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'] == 'string') ) //PSN.ND.dienas.stunda[3].ant
			{
				// gavēņa, lieldienu laikā dienas stundām psalmu antifona ir vienāda atkatībā no stundas
				if(x == 3) {ant = 'ant1';} else if(x == 6) {ant = 'ant2';} else {ant = 'ant3';}
				if (window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'])
					{
						sel = document.querySelectorAll('#ant1'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'];
						sel = document.querySelectorAll('#ant2'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'];
						sel = document.querySelectorAll('#ant3'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda]['stunda'][x]['ant'];
					} else
					{
						sel = document.querySelectorAll('#ant1'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd]['dienas'][ant];
						sel = document.querySelectorAll('#ant2'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd]['dienas'][ant];
						sel = document.querySelectorAll('#ant3'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd]['dienas'][ant];
					}
			
				sel = document.querySelectorAll('.antifona');
				for(var i=1; i<5; i++)
					{
					sel[i].style.display = 'none';
					}
				document.querySelector('#pirmaAntifona').innerHTML = 'Ant.';
			} else
			{
			sel = document.querySelectorAll('#ant1'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda].ant1;
			sel = document.querySelectorAll('#ant2'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda].ant2;
			sel = document.querySelectorAll('#ant3'); sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda].ant3;
			}
	}
	dienasAnt(dienasStunda);

	// Dienas stundas izvēles ===>
		sel = document.querySelector('#dienasLasijumaDropdownContent'); // automātiski pa nedēļām
		var ievads = '<a href="#s3">Trešā stunda</a> \
							<a href="#s6">Sestā stunda</a> \
							<a href="#s9">Devītā stunda</a>';
		sel.innerHTML = ievads;
	// Dienas stundas seletor
			var items = document.querySelectorAll('#dienasLasijumaDropdownContent a');
			for(var i =0; i<items.length; i++) {
			items[i].addEventListener("click", function(p) { 
				izvele = p.target.hash.substring(1);
					if (izvele == 's3') { dienasStunda = 3; }
					else if (izvele == 's6') { dienasStunda = 6; }
					else { dienasStunda = 9; }
					// nomaina himnu
					document.querySelector('#himna').innerHTML =window[window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].himna];
					
					// nomaina antifonas !! gavēņa laikam	
					dienasAnt(dienasStunda);
					
					// ieleik psalmus 			console.log(liturgiskaisLaiks, psn, nd, stunda, dienasStunda, window[liturgiskaisLaiks][psn][nd][stunda].ps1);
					dienasPs(dienasStunda);
					
					// nomaina lasījumu
					document.querySelector('#containerLasijums').innerHTML = '<hr><h4><span class="redbold">' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lasijumstitle + '</span></h4><p>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lasijumstext + '</p>';
					// nomaina atbildi
					document.querySelector('#responsorijs').innerHTML =  '<p><span class="redbold">℣. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].atb1 + '<br><span class="redbold">℟. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].atb2+ '</p>';
					
					if ( stunda=='dienas' ) {
						if ( nd ==0 || (liturgiskaisLaiks == 'advents' || liturgiskaisLaiks == 'gavenis' || liturgiskaisLaiks == 'lieldienas' || liturgiskaisLaiks == 'zemassvetki')) {
							noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd]["laudes"].lugsimies + '</p>';
						}
						else {
							noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies;
						}
						
						if (liturgiskaisLaiks == 'festumShow' && gads[d].prior < 10) {
							if (gads[d].lugsana) {
								noslegLugsana.innerHTML = '<p>' +gads[d].lugsana + '</p>';
							}
							else {
								if (window[liturgiskaisLaiks][psn][nd][stunda].lugsimies) {
									noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].lugsimies + '</p>';
								}
								else {
									window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies;
								}
							}
						} 
					}
				
				if(document.querySelector('#gara')) {
					document.querySelector('#gara').style.display = 'none';
					document.querySelector('#dienas').style.display = 'initial';
				}

				noslegLugsana.insertAdjacentHTML( 'afterbegin' , '<p><span class="redbold">℣. </span>Lūgsimies.</p>');
				})
			}
	// <=== Dienas stundas izvēles
		
	// containerLasijums
	sel = document.querySelector('#containerLasijums');
	if(stunda == 'dienas') { 
		sel.innerHTML = '<hr><h4><span class="redbold">' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lasijumstitle + 
															'</span></h4><p>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lasijumstext + '</p>';
	}
	else {
		document.querySelector('#dienasLasijumaDropdown').style.display = 'none';
		sel.innerHTML = '<hr><h4><span class="redbold">' + window[liturgiskaisLaiks][psn][nd][stunda].lasijumstitle + 
															'</span></h4><p>' + window[liturgiskaisLaiks][psn][nd][stunda].lasijumstext + '</p>';
	}
	
		
	// containerAtbilde
	sel = document.querySelector('#responsorijs'); 
	if(stunda == 'dienas') {
		sel.innerHTML =  '<p><span class="redbold">℣. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].atb1 + 
		'<br><span class="redbold">℟. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].atb2+ '</p>';
	}
	// speciāla atbilde, kad ir tikai 1 antifona
	else if( (window[liturgiskaisLaiks][psn][nd][stunda].atb1 == window[liturgiskaisLaiks][psn][nd][stunda].atb2 || window[liturgiskaisLaiks][psn][nd][stunda].atb2 =='' ) &&
	(stunda == 'laudes' || stunda == 'vesperes') ) {
		sel.innerHTML =  '<p><span class="redbold">Ant. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb1 + '</p>';
	}
	else {
		sel.innerHTML =  '<p><span class="redbold">℣. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb1 +
			  '<br><span class="redbold">℟. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb1 +
			  '<br><span class="redbold">℣. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb2 +
			  '<br><span class="redbold">℟. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb3 +
			  '<br><span class="redbold">℣. </span>Gods lai ir Tēvam un Dēlam un Svētajam Garam.' +
			  '<br><span class="redbold">℟. </span>' + window[liturgiskaisLaiks][psn][nd][stunda].atb1 + '</p>';
	}
		  
	// containerDziedajums MAGNIFICAT - BENEDICTUS
	  //if ( stunda == 'vesperes' && nd == 6 ) {
		//psn++;
		// if(liturgiskaisLaiks == 'parastais' && psn === 5 ) psn = 1; // parastajā laikā ir tikai 4 nedēļas
	  // // jāuzliek liturģisko laiku pāreja
	
	if(stunda != 'dienas') {
		sel = document.querySelector('#containerDziedajums');
		if(stunda=='laudes') {sel.innerHTML = benedictus} else if( stunda=='vesperes' || stunda=='vesperesI' ) {
			sel.innerHTML = magnificat; 
		}
		
		sel = document.querySelectorAll('#antBenMag');
		if( (liturgiskaisLaiks == 'parastais' || liturgiskaisLaiks == 'advents') && ( (nd == 6 || nd ==0) && stunda == 'vesperes') || (nd ==0 && stunda == 'laudes') ) { // ABC gadu svētdienu antifonas
				var Sv = gads[d].psNedela;
				var St = stunda;
				if (nd === 6) {
					Sv++; 
					St = 'vesperesI';
				}
				if ( liturgiskaisLaiks == 'parastais' ) {
					sel[0].innerHTML = sel[1].innerHTML =  antifona_pll_sv[litGads][Sv][St]; // PLL svētdienu ant
				}
				 
				if ( liturgiskaisLaiks == 'advents') {
					var litGads0 = litGads;
						if ( gads[d].datums.valueOf() == cal.pll3.valueOf() ) { // 1.adventa I vesperes jānomaina gads
							var litGads0 = litGads;
							if ( litGads == 'A' ) { litGads = 'B' } 
							else if ( litGads == 'B' ) { litGads = 'C' }
							else if ( litGads == 'C' ) { litGads = 'A' }
							Sv = 1;
						}
					sel[0].innerHTML = sel[1].innerHTML =  antifona_adv_sv[litGads][Sv][St]; // adventa svētdienu ant
					litGads = litGads0; // noliekam atpakaļ
				}
		}
		else {
			sel[0].innerHTML = sel[1].innerHTML = window[liturgiskaisLaiks][psn][nd][stunda].magbenant;
		}
		
			console.log(litGads); // der'etu housekeeping funkciju
 	if (document.querySelector('.A')) {
		
		if( litGads == 'C' ) { 
			document.querySelector('.A').style.display = 'none';
			document.querySelector('.B' ).style.display = 'none';
			document.querySelector('.C').style.display = 'initial';
		}
	}
		
	}
	
	// containerLugumi
	if(stunda != 'dienas') {
		
		const visparejieLugumi = function(str) {
		  return "<li class='lugsana'>" + window[liturgiskaisLaiks][psn][nd][stunda][str] + 
		  "<br><span class='bolditalic'>" + window[liturgiskaisLaiks][psn][nd][stunda].resplugums + "</span></li>";
		}
		
		sel = document.querySelector('#visparejieLugumi'); //funkcija
		
		var sLugumi = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugumi +
								'<br><span class="bolditalic">' + window[liturgiskaisLaiks][psn][nd][stunda].resplugums + '</span></p><ul>';
		for (i in window[liturgiskaisLaiks][psn][nd][stunda].lugums) {
			sLugumi += "<li class='lugsana'>" + window[liturgiskaisLaiks][psn][nd][stunda]['lugums'][i] + 
			"<br><span class='bolditalic'>" + window[liturgiskaisLaiks][psn][nd][stunda].resplugums + "</span></li>";
			}
		if(gads[d].datums.valueOf() == new Date(year,7,6).valueOf()) sLugumi += "<li class='lugsana'>Mīlošais Tēvs, svētī diakonu Daini un pārējos pastāvīgos diakonus, lai caur viņiem tiek pagodināts Tavs Dēls.<br><span class='bolditalic'>" + window[liturgiskaisLaiks][psn][nd][stunda].resplugums + "</span></li>";
		sLugumi += '</ul>';
		sel.innerHTML = sLugumi;		
		// for (i in lieldienas) { console.log(lieldienas[i]);}
	}

	
	// containerKungaLugsana
	document.querySelector('#containerKungaLugsana').innerHTML = kungaLugsana; // no mainīgā
	
	//containerNoslegumaLugsana noslegumaLugsana
	var noslegLugsana = document.querySelector("#noslegumaLugsana"); 

	if ( stunda == 'laudes' || stunda == 'vesperes' || stunda == 'vesperesI' ) {
		noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugsimies;
		
		if (liturgiskaisLaiks == 'festumShow' ) { // && gads[d].prior <= gads[d1].prior hrizostomam nerādīja
			if (gads[d].lugsana) {
				noslegLugsana.innerHTML = '<p>' + gads[d].lugsana + '</p>';
			} 
			else {
				noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugsimies;
			}
		}
		else if ( nd === 0 || ( nd === 6  && gads[d1].prior <= gads[d].prior ) ) { // svētdienu lūgšana
			liturgiskaisLaiks = liturgiskaisLaiks0;
			psn = psn0;
			if ( (liturgiskaisLaiks == 'advents' || liturgiskaisLaiks == 'gavenis' ) && nd === 6 && stunda == 'vesperes' ) psn++; // adventā un gavēnī 1. vesperu lūgšana ir manīgajā, tāpēc jākoriģē
			console.log('psn:',psn);
			nd =nd0;
			d = Number (d); // kaut kāda iemesla dēļ nomainās mainīgā tips
			if (nd === 6) {
				selectedSvetdiena = gads[d+1].svetdiena;
				}
			if ( liturgiskaisLaiks == 'parastais' ) noslegLugsana.innerHTML = '<p>' + lugsana_pll_sv[selectedSvetdiena] + '</p>';
		} 
		else {
			noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugsimies;
		}
console.log("Adventa lūgšana: ", liturgiskaisLaiks, 'psn:',psn, 'nd:', nd, stunda, window[liturgiskaisLaiks][psn][nd][stunda].lugsimies);
	}


/* 	if (liturgiskaisLaiks == 'festumShow' ) { // && gads[d].prior <= gads[d1].prior hrizostomam nerādīja
		if (stunda == 'laudes' || stunda == 'vesperes' || stunda == 'vesperesI') {
			if (gads[d].lugsana) {
				noslegLugsana.innerHTML = '<p>' + gads[d].lugsana + '</p>';
			} else {
				noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugsimies;
			}
		}
	} else if ( nd === 0 || (stunda == 'vesperes' && nd === 6  && gads[d1].prior <= gads[d].prior) ) { // svētdienu lūgšana
		liturgiskaisLaiks = liturgiskaisLaiks0;
		psn = psn0;
		nd =nd0;
		d = Number (d); // kaut kāda iemesla dēļ nomainās mainīgā tips
		if (nd === 6) {
			selectedSvetdiena = gads[d+1].svetdiena;
			}
		noslegLugsana.innerHTML = '<p>' + lugsana_pll_sv[selectedSvetdiena] + '</p>';
	} else {
		if ( stunda == 'dienas' && window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies) {
			noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies + '</p>';
		} else {
			noslegLugsana.innerHTML = '<p>' + window[liturgiskaisLaiks][psn][nd][stunda].lugsimies + '</p>';
		}
	} */
	
	  
	if ( stunda=='dienas' ) {
		if ( nd ==0 || (liturgiskaisLaiks == 'advents' || liturgiskaisLaiks == 'gavenis' || liturgiskaisLaiks == 'lieldienas' || liturgiskaisLaiks == 'zemassvetki') ) { console.log( ' dienas lūgšana ' );
		
			noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd]["laudes"].lugsimies + '</p>';
			
			if ( liturgiskaisLaiks == 'parastais' ) {
				noslegLugsana.innerHTML = '<p>' + lugsana_pll_sv[selectedSvetdiena] + '</p>';
			}
		}
		else {
			noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies;
		}
		
		if (liturgiskaisLaiks == 'festumShow' && gads[d].prior < 10) {
			if (gads[d].lugsana) {
				noslegLugsana.innerHTML = '<p>' +gads[d].lugsana + '</p>';
			}
			else {
				if (window[liturgiskaisLaiks][psn][nd][stunda].lugsimies) {
					noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].lugsimies + '</p>';
				}
				else {
					window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies;
				}
			}
		} 
	}
		
	
	/* if(stunda=='dienas' && nd != 0) {// šī ir neefektivitāte, jo laudes un vesperes ir iepriekš
		if ( liturgiskaisLaiks == 'advents' || liturgiskaisLaiks == 'gavenis' || liturgiskaisLaiks == 'lieldienas' ) {
			noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd]["laudes"].lugsimies + '</p>'; // gavēņa laikā visu stundu nozlēguma lūgšana ir vienāda
			}
		else { console.log("dienas problēma");
			noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies + '</p>';
			}
	} 
console.log("Adventa problema: ", "liturgiskaisLaiks:", liturgiskaisLaiks,"psn:",psn,"nd:",nd,"stunda:",stunda, dienasStunda);

	if (stunda=='dienas' && liturgiskaisLaiks == 'festumShow' && gads[d].prior < 10) {
			if (gads[d].lugsana) noslegLugsana.innerHTML = '<p>' +gads[d].lugsana + '</p>';
			else if (window[liturgiskaisLaiks][psn][nd][stunda].lugsimies) noslegLugsana.innerHTML = '<p>' +window[liturgiskaisLaiks][psn][nd][stunda].lugsimies + '</p>';
			else window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies ;
	} else if (stunda=='dienas') { console.log("dienas svētdiena");
		window[liturgiskaisLaiks][psn][nd][stunda].stunda[dienasStunda].lugsimies;
	} */
	
	if (stunda=='dienas') {
		if(document.querySelector('#gara')) {
			document.querySelector('#gara').style.display = 'none';
			document.querySelector('#dienas').style.display = 'initial';
			}
	}
	

	
	if ( stunda == 'dienas' ) noslegLugsana.insertAdjacentHTML( 'afterbegin' , '<p><span class="redbold">℣. </span>Lūgsimies.</p>');
	noslegLugsana.insertAdjacentHTML( 'beforeend' , '<p><span class="redbold">℟. </span>Āmen.</p>');
	
	//conatinerSvetiba
	if(stunda=='dienas') {
			document.querySelector('#svetiba').innerHTML = svetibaDienas;
		} else {
			document.querySelector('#svetiba').innerHTML = svetibaLaudesVesperes; // no mainīgā
		}
	//========================
	
	if( gads[d].N && liturgiskaisLaiks == 'festumShow' && document.querySelector('#G')) document.querySelector('#G').innerHTML = gads[d].G;
	if( gads[d].N && liturgiskaisLaiks == 'festumShow' && document.querySelector('#D')) document.querySelector('#D').innerHTML = gads[d].Dat;
	
	//	 if(liturgiskaisLaiks == 'gavenis') document.querySelector('.alleluja').style.display = 'none'; // Gavēni noņem Alleluja
		 // Gavēnī noslēpj Alleluja

	if (gads[d].datums >= cal.gav0 && gads[d].datums < cal.lieldienas)	{
		items = document.querySelectorAll('.alleluja');
		for(var i =0; i<items.length; i++) {
			items[i].style.display = 'none';
		}
	}
	 if ( !(gads[d].datums >= cal.lieldienas && gads[d].datums <= cal.vasarsvetki) ) {
		//items = document.querySelectorAll('.Lieldienas');
		items = document.getElementsByClassName('Lieldienas');
		for(var i =0; i<items.length; i++) {
			items[i].style.display = 'none';
		}
	}


// Viva Latvia
if ( stunda != 'dienas' && gads[d].datums.valueOf() == new Date(year,10,18).valueOf() ) {
	document.getElementById('conatinerSvetiba').insertAdjacentHTML( 'beforeend' , '<hr>' + DievsSvetiLatviju );
}

}

const kopmletorijsLugsana = function() {
	var d = selectedDayId;
	var d1 = parseInt(d)+1;
	var psn = selectedNedela; 
	var nd = selectedDay;
	if (selectedLitlaiks == 'ldl') { // lieldienās ir svētku kompletorijs darba dienā
		var liturgiskaisLaiks = 'lieldienas';
		if ( typeof window[liturgiskaisLaiks][psn][nd].kompletorijs != 'undefined' ) nd = window[liturgiskaisLaiks][psn][nd].kompletorijs;
		}
	var sd = selectedDay;
	var kompletDatums = selectedStunduDatums;
	if(gads[d].liturgija && gads[d].vesperesI) nd = 0;
	else if( gads[d1].vesperesI && gads[d1].prior <= gads[d].prior) nd = 6;
	else if(gads[d1].vesperesI && !selectedDay ==0 ) nd = 6;
	else if(gads[d].litlaiks == 'trd') nd = 0;
	else if(gads[d].litlaiks == 'lokt') nd = 0;
	
	
  if (selectedStunduDatums > cal.zsl0 && selectedStunduDatums < new Date (selectedStunduDatums.getFullYear()+1, 0, 2, 0, 0, 0)) dat=0; // ārkātas gadījumi, kad ir svētdienas kompletorijs
  
  lugsana.innerHTML = komplet_template;
//========================
	// containerStunduTitle
	document.querySelector('#title').innerHTML = komplet[nd].title;
	
	// containerGrekuNozela
	sel = document.querySelector('#containerGrekuNozela');
	var nozela = '<hr>';
	nozela += '<div class="dropdown">\
						<button onclick="choose(\'nozelasAktsBtn\')" class="dropbtn">▼</button>\
						 <div id="nozelasAktsBtn" class="dropdown-content">\
							<a href="#0">1. variants</a>\
							<a href="#1">2. variants</a>\
							<a href="#2">3. variants</a>\
						 </div> \
					 </div>';
	nozela += '<h4><span class="redbold">GRĒKU NOŽĒLA</span></h4>';
	nozela += '<div id = "nozelasAktsVar">' + nozelasAkts[0] + '</div>';
	sel.innerHTML = nozela;
	// seletor
	items = document.querySelectorAll('#nozelasAktsBtn a');
	for(var i =0; i<items.length; i++) {
		items[i].addEventListener("click", function(p) { 
			document.querySelector('#nozelasAktsVar').innerHTML = nozelasAkts[p.target.hash.substring(1)];
		} );
	}
//========================
	
	
	// containerHimna
	sel = document.querySelector('#himna');
	if(gads[d].litlaiks == 'lokt' || gads[d].litlaiks == 'ldl') {
		if(gads[d].datums > cal.debeskapsana) {sel.innerHTML = himnaKompletLieldienas2; }	else {sel.innerHTML = himnaKompletLieldienas;}
	} else if( gads[d].psNedela % 2 == 1 ) { // nepāra nedēļā
		if ( sd != 6 ) {sel.innerHTML = himnaKomplet_1;} else {sel.innerHTML = himnaKomplet_2;}
	} else if( gads[d].psNedela % 2 == 0 ) { // pāra nedēļā
		if ( sd != 6 ) {sel.innerHTML = himnaKomplet_2;} else {sel.innerHTML = himnaKomplet_1;}
	}
	
	// containerPsalmodijs
	document.querySelector('#psalms1').innerHTML = window[komplet[nd].ps1];
	document.querySelector('#psalms2').innerHTML = window[komplet[nd].ps2];
	
	sel = document.querySelectorAll('#ant1'); sel[0].innerHTML = sel[1].innerHTML = komplet[nd].ant1;
	if(gads[d].litlaiks == 'lokt' || gads[d].litlaiks == 'ldl') sel[0].innerHTML  = sel[1].innerHTML  = 'Alleluja, alleluja, alleluja.';
	
	sel = document.querySelectorAll('#ant2'); sel[0].innerHTML = sel[1].innerHTML = komplet[nd].ant2;
	if(gads[d].litlaiks == 'lokt' || gads[d].litlaiks == 'ldl') sel[0].innerHTML  = sel[1].innerHTML  = 'Alleluja, alleluja, alleluja.';
	
	if ( komplet[nd].ps2 == "" ) document.querySelector('#otraisPsalms').style.display = 'none';
	
	if((gads[d].litlaiks == 'lokt' || gads[d].litlaiks == 'ldl') && komplet[nd].ps2 != "") {
		sel = document.querySelectorAll('.antifona'); 
		for(var i=1; i<3; i++) { sel[i].style.display = 'none'; }
	}// novāc alleluja pie 2 psalmiem
	

	// containerLasijums
	document.querySelector('#containerLasijums').innerHTML = '<hr><h4><span class="redbold">' + 
	komplet[nd].lasijumstitle + '</span></h4><p>' + komplet[nd].lasijumstext + '</p>';
	
	// containerAtbilde
	sel = document.querySelector('#responsorijs');
			// triduum atbildes
	if(kompletDatums.valueOf() == cal.lielceturtd.valueOf()) sel.innerHTML = '<p><span class="redbold">Ant. </span>' + komplet.tridiuum[4] + '</p>';
	if(kompletDatums.valueOf() == cal.lielpiektd.valueOf())  sel.innerHTML = '<p><span class="redbold">Ant. </span>' + komplet.tridiuum[5] + '</p>';
	if(kompletDatums.valueOf() == cal.lielsestd.valueOf())    sel.innerHTML = '<p><span class="redbold">Ant. </span>' + komplet.tridiuum[6] + '</p>';
	if(gads[d].litlaiks == 'lokt' || kompletDatums.valueOf() == cal.lieldienas.valueOf() ) sel.innerHTML = '<p><span class="redbold">Ant. </span>' + komplet.lieldienuOkt + '</p>';
	if(gads[d].litlaiks == 'ldl' && kompletDatums.valueOf() != cal.lieldienas.valueOf()) { sel.innerHTML = '\
		<p><span class="redbold">℣.&nbsp;</span>Tavās rokās, Kungs, es atdodu savu garu,* alleluja, alleluja.<br> \
		<span class="redbold">℟.&nbsp;</span>Tavās rokās, Kungs, es atdodu savu garu,* alleluja, alleluja.<br> \
		<span class="redbold">℣.&nbsp;</span>Kungs, uzticīgais Dievs, Tu esi mūs atpircis.*<br> \
		<span class="redbold">℟.&nbsp;</span>Alleluja, alleluja.<br> \
		<span class="redbold">℣.&nbsp;</span>Gods lai ir Tēvam un Dēlam un Svētajam Garam.<br> \
		<span class="redbold">℟.&nbsp;</span>Tavās rokās, Kungs, es atdodu savu garu,* alleluja, alleluja.</p>';
	}
	
	// containerDziedajums
	sel = document.querySelector('#containerDziedajums'); sel.innerHTML = simeons;
	items = document.querySelectorAll('.sim');
	if( gads[d].litlaiks == 'ldl' || gads[d].litlaiks == 'lokt' ) {
		for(var i =0; i<items.length; i++)  items[i].style.display = 'initial';
		} else {
			for(var i =0; i<items.length; i++)  items[i].style.display = 'none';
			}

	
	// containerNoslegumaLugsana
		// komplet[nd].lugsimies  svētdienās, kā arī Lieldienu oktāvas laikā
		// komplet[nd].lugsimies2 svētkos, ja  neiekrīt svētdienā, kā arī Trīs Lielajās dienās
	sel = document.querySelector('#noslegumaLugsana');
	var nLugsana =  '<p><span class="redbold">℣. </span>Lūgsimies.</p>' + '<p>';
	if(sd == 0 && nd ==0 || gads[d].litlaiks == 'lokt') { nLugsana +=  komplet[nd].lugsimies; }
	else if( (sd != 0 && nd ==0) || (sd != 6 && nd ==6) || gads[d].litlaiks == 'trd' ) { nLugsana +=  komplet[nd].lugsimies2; } // vai nevajadzētu vienkāršot?
	else { nLugsana +=  komplet[sd].lugsimies; }
	sel.innerHTML = nLugsana + '</p><p><span class="redbold">℟. </span>Āmen.</p>';	
	//document.querySelector('#lugsana2').style.display = 'none';
	
	// conatinerSvetiba
	document.querySelector('#svetiba').innerHTML = svetibaKompl;
	
	// noslegumsMarijai
	sel = document.querySelector('#noslegumsMarijai');
	var marijai = '<hr>';
	marijai += '<div class="dropdown"> \
						<button onclick="choose(\'marijaiDropdown\')" class="dropbtn">▼</button> \
						 <div id="marijaiDropdown" class="dropdown-content"> \
							<a href="#slavasPilnaKaraliene">Slavas pilnā Karaliene</a> \
							<a href="#debessKaralieneLiksmojies">Debess Karaliene, līksmojies</a> \
							<a href="#tavaPatveruma">Tavā patvērumā</a> \
							<a href="#maigaPestitajaMate">Maigā Pestītāja Māte</a> \
							<a href="#esiSveicinataKaraliene">Esi sveicināta Karaliene</a> \
						 </div> \
					 </div>'; 
	if(gads[d].litlaiks == 'trd' || gads[d].litlaiks == 'gav') antMarijai='slavasPilnaKaraliene';
	else if(gads[d].litlaiks == 'lokt' || gads[d].litlaiks == 'ldl') antMarijai='debessKaralieneLiksmojies';
	else if(gads[d].litlaiks == 'adv' || gads[d].litlaiks == 'zsl') antMarijai='maigaPestitajaMate';
	else antMarijai = 'esiSveicinataKaraliene';
	marijai += '<div id = "dziesmaMarijai">' + window[antMarijai] + '</div>';
	sel.innerHTML = marijai;
	// seletor
	items = document.querySelectorAll('#marijaiDropdown a');
	for(var i =0; i<items.length; i++) {
		items[i].addEventListener("click", function(p) { 
			document.querySelector('#dziesmaMarijai').innerHTML = window[p.target.hash.substring(1)];
		} );
	}
	
	
	// Gavēnī noslēpj Alleluja
	if (gads[d].datums >= cal.gav0 && gads[d].datums < cal.lieldienas){
		items = document.querySelectorAll('.alleluja');
		for(var i =0; i<items.length; i++) {
			items[i].style.display = 'none';
		}
		
	}
	
//========================
};

const stunduLugsana = function(dat, psn, svetdiena, stunduDatums) { //parametri nav vajadzīgi
  var lugsana = document.querySelector("#LugsanuTeksts");
  var noslegumaLugsana = document.querySelector("#noslegumaLugsana");
  var laudesPoga = document.querySelector("#laudespoga");
  var dienasPoga = document.querySelector("#dienaspoga");
  var vesperesPoga = document.querySelector("#vesperespoga");
  var kompletorijsPoga = document.querySelector("#kompletorijspoga");

  // Izsauc iepriekš sagatavotās lūgšanas LaudesVesperes();kopmletorijsLugsana();
  if (laiks.getHours() >= 0 && laiks.getHours() < 9) {
    laudesPoga.classList.add("aktualastunda");
    LaudesVesperes('laudes');
  }
  if (laiks.getHours() >= 9 && laiks.getHours() < 18) {
    dienasPoga.classList.add("aktualastunda");
    LaudesVesperes('dienas');
  }
  if (laiks.getHours() >= 18 && laiks.getHours() < 21) {
    vesperesPoga.classList.add("aktualastunda");
    LaudesVesperes('vesperes');
  }
  if (laiks.getHours() >= 21 && laiks.getHours() <= 23) {
    kompletorijsPoga.classList.add("aktualastunda");
    kopmletorijsLugsana();
  }
  // Stundu lūgšanas veidošana pabeigta  
}

// == SELECTORS ==
const eventSelector = function() {
  var baneris = document.querySelector("#liturgiskakrasabaneris");
  var svetki = document.querySelector("#liturgsvetki");
  var dat = document.querySelector("#datums");
  var psNed = document.querySelector("#psNedela");
  var lugsana = document.querySelector("#LugsanuTeksts");


  // selektori katrai dienai kalendārā
  document.querySelectorAll(".diena").forEach( function(day) {
    day.addEventListener("click", function(e) {
      // console.log(day.id, gads[day.id].svetki, gads[day.id].psNedela); // <== ŠEIT
      selectedNedela = gads[day.id].psNedela;
      selectedDay = gads[day.id].datums.getDay();
	  selectedDayId = day.id;
      selectedSvetdiena = gads[day.id].svetdiena;
      selectedStunduDatums = gads[day.id].datums;
	  selectedLitlaiks = gads[day.id].litlaiks;
	  selectedFestum = gads[day.id].psalmi;
	  selectedVesperesI = gads[day.id].vesperesI;
      baneris.className = "logobar " + gads[day.id].krasa;
      svetki.innerHTML = gads[day.id].svetki;
      dat.innerHTML = dateFormat(gads[day.id].datums);
      psNed.innerHTML = psalmuNedela(gads[day.id].psNedela);
	  // console.log(day.id, gads[day.id].psNedela, psalmuNedela(gads[day.id].psNedela));

      if (gads[day.id].datums < cal.adv0) {
        litGadaCikls(year);
      } else {
        litGadaCikls(year + 1);
      } // jāmainās līdz ar 1 adventu

	  stunduLugsana(); //bija stunduLugsana( selectedDay, selectedNedela, selectedSvetdiena, gads[day.id].datums );

      var selected = document.querySelector(".selected");
      if (selected !== null) selected.classList.remove("selected");
      document.getElementById(day.id).classList.add("selected");

    });
  });
}
//selektori mēneša izvēles bultiņām
document.querySelector("#prevButton").addEventListener("click", function(e) {
  window.date = shiftMonth(window.date, -1);
  drawCalendar(window.date, "kalendars");
  eventSelector();
});
document.querySelector("#nextButton").addEventListener("click", function(e) {
  window.date = shiftMonth(window.date, +1);
  drawCalendar(window.date, "kalendars");
  eventSelector();
});
//selektori stundu pogām
document.querySelector("#laudespoga").addEventListener("click", function(p) {
  LaudesVesperes('laudes');
});
document.querySelector("#dienaspoga").addEventListener("click", function(p) {
  LaudesVesperes('dienas');
});
document.querySelector("#vesperespoga").addEventListener("click", function(p) {
  LaudesVesperes('vesperes');
});
document.querySelector("#kompletorijspoga").addEventListener("click", function(p) {
  kopmletorijsLugsana();
});
// == SELECTORS END==

// == ŠODIENAS LITURĢIJA =atverot lapu=
var baneris = document.querySelector("#liturgiskakrasabaneris");
baneris.className = "logobar " + gads[todayIndex].krasa; // class = logobar
var svetki = document.querySelector("#liturgsvetki");
svetki.innerHTML = gads[todayIndex].svetki;
if(gads[todayIndex] <=11)  {}
var dat = document.querySelector("#datums");
dat.innerHTML = dateFormat(gads[todayIndex].datums);
var psNed = document.querySelector("#psNedela");
psNed.innerHTML = psalmuNedela(gads[todayIndex].psNedela);

if (date < cal.adv0) {// ligurģiskā gada burta maiņa  līdz ar 1 adventu
  litGadaCikls(year);
} else {
  litGadaCikls(year + 1);
} // jāmainās līdz ar 1 adventu

selectedNedela = gads[todayIndex].psNedela; 
selectedDay = gads[todayIndex].datums.getDay();
selectedDayId = todayIndex;
selectedSvetdiena = gads[todayIndex].svetdiena;
selectedStunduDatums = gads[todayIndex].datums;
selectedLitlaiks = gads[todayIndex].litlaiks;
selectedFestum = gads[todayIndex].psalmi;
selectedVesperesI = gads[todayIndex].vesperesI;

stunduLugsana(); //stunduLugsana(selectedDay, selectedNedela, selectedSvetdiena, selectedStunduDatums);
eventSelector();
// == ŠODIENAS BEIGAS ==