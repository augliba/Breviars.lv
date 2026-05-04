var today = new Date();
var yyyy = today.getFullYear();
today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
var date = new Date(today.getFullYear(), today.getMonth());
var year = yyyy;
var litGads = '';

const nedDiena = ["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"];
const weekDayName = ["P", "O", "T", "C", "P", "S", "Sv"];
const litDiena = ["Ziemassvētku laika ", "Parastā laika ", "Gavēņa ", "Lieldienu laika ", "Adventa ", "Lielās nedēļas ", "Tridiuum ", "Ziemassvētku oktāvas ", "Lieldienu oktāvas "];
var menesis = ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"];
var Menesis = ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"];
const svetdienuCikls = ["A", "B", "C"];

const isEmpty = function(x) { // window[liturgiskaisLaiks][psn][nd].laudes.ievdant
	try {
		  x();
		} catch (error) {
		  // console.error(error);
		  return true;
		  // expected output: ReferenceError: nonExistentFunction is not defined
		  // Note - error messages will vary depending on browser
		}
	return false; 
}

const dateFormat = function(date) {
  var d = date;
  var dateFormated = d.getFullYear() + '. gada ' + d.getDate() + '. ' + menesis[d.getMonth()];
  return dateFormated;
}

const litGadaCikls = function(year) {
	litGads = svetdienuCikls[(year - 1) % 3];
  document.querySelector("#litGads").innerHTML = litGads;
}

const psalmuNedela = function(n) { //  n = (n - 1) % 4; n = (n == 0) ? 4 : n;
		n = n % 4;
		if(n == 0) n = 4;
return n;
}

const getDaysInMonth = function(date) {
  return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
}

const dayOfYear = function(d) {
  var yn = d.getFullYear();
  var mn = d.getMonth();
  var dn = d.getDate();
  var d1 = new Date(yn, 0, 1, 12, 0, 0); // noon on Jan. 1
  var d2 = new Date(yn, mn, dn, 12, 0, 0); // noon on input date
  var ddiff = Math.round((d2 - d1) / 864e5);
  return ddiff + 1;
}

const isWeekend = function(day) { // 6 = sestdiena, 0 = svētdiena
  return day.getDay() == 6 || day.getDay() == 0;
}

const shiftMonth = function(date, n) {
  shift = new Date(date);
  shift.setMonth(shift.getMonth() + n);
  return shift;
}
const shiftDate = function(date, days) {
  shift = new Date(date);
  shift.setDate(shift.getDate() + days);
  return shift;
}

const leapYear = function(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

// == PARASTĀ LITURĢISKĀ LAIKA SVĒTDIENU SKAITS ==
const maxSv = function(d0, d1, d2, d3) {
  difDays1 = parseInt((d1 - d0) / (1000 * 60 * 60 * 24), 10);
  difDays2 = parseInt((d3 - d2) / (1000 * 60 * 60 * 24), 10);
  return Math.ceil(difDays1 / 7) + Math.ceil(difDays2 / 7);
}
// ================================

const baptismDate = function(date) {
  var weekday = date.getDay()
  w = weekday < 7 ? 7 - weekday : weekday;
  baptism = shiftDate(date, w);
  return baptism;
}

const getAdvent = function(year) {
  var date = new Date(year, 11, 25);
  var sundays = 0;
  while (sundays < 4) {
    date.setDate(date.getDate() - 1);
    if (date.getDay() === 0) sundays++;
  }
  return date;
}

const MarijaJazeps = function(Pers) {
  if (Pers == "M") svetki = new Date(year, 12 - 1, 8); // M=Marija 8.dec.,
  if (Pers == "J") svetki = new Date(year, 3 - 1, 19);
  if (Pers == "I") svetki = new Date(year, 3 - 1, 25);
  // ja iekrīt svētdienā, tad pārceļ +1 diena
  // J=Jāzeps 19.mar.,  (ja iekrīt lielajā nedēļā un palmu svētdienā, tad - sestdiena, ja gavēņa svētdienā tad +Pirmdiena)
  // I=Jezus25.mar. (var iekrist lielajā nedēļā vai oktāvā /piem. 2016. vai 2018.g./ pārceļ uz pimdienu pēc oktāvas)
  if (svetki >= cal.lielnedela && svetki <= cal.lieloktava1 && Pers == "I") svetki = shiftDate(cal.lieloktava1, +1);
  else if (svetki >= cal.lielnedela && svetki < cal.lieldienas && Pers == "J" ) svetki = shiftDate(cal.lielnedela, -1);
  else if (svetki.getDay() == 0) svetki = shiftDate(svetki, +1); 
  return svetki;
}

const Metropolija = function (){
	var jekaba = new Date(year, 6, 25);
	var nedelasDiena = jekaba.getDay();
	if (nedelasDiena == 0 ) {
		svetki = jekaba;
		}
	else if (nedelasDiena <=3) {
		var substract = nedelasDiena;
		svetki = shiftDate(jekaba, -substract);
		}
	else	if (nedelasDiena >=4) {
		var add = 7 - nedelasDiena;
		svetki = shiftDate(jekaba, +add);
		}
	
	return svetki;
}

const solemnities = function(year) {
  cal = {};

  // == LIELDIENU DATUMS ==
  a = year - 19 * parseInt(year / 19);
  b = parseInt(year / 100);
  c = year - 100 * parseInt(year / 100);
  d = parseInt(b / 4);
  e = b - 4 * parseInt(b / 4);
  f = parseInt((b + 8) / 25);
  g = parseInt((b - f + 1) / 3);
  ha = 19 * a + b - d - g + 15;
  h = ha - 30 * parseInt(ha / 30);
  i = parseInt(c / 4);
  k = c - 4 * parseInt(c / 4);
  la = 32 + 2 * (e + i) - h - k;
  l = la - 7 * parseInt(la / 7);
  m = parseInt((a + 11 * h + 22 * l) / 451);
  ma = h + l - 7 * m + 114;
  month = parseInt(ma / 31);
  day = ma - 31 * parseInt(ma / 31) + 1;
  if(month<10) month = '0'+month;
  if(day<10) day = '0'+day;
  dateTime = year + "-" + month + "-" + day + ' 00:00:00';

  // == SVARIGI DATUMI - MAINIGI SVETKI ==
  
  // gavēnis no Feb 4/Mar 17 līdz Mar 22/Apr 25
  // lieldienas no Mar 22/Apr 25 līdz May 10/Jun 13
  
  cal.lieldienas = new Date(year, month-1, day);
  cal.epifany = new Date(year, 0, 6);
  cal.baptism = baptismDate(cal.epifany);
  cal.pelnutrsd = shiftDate(cal.lieldienas, -46); 
  cal.pelnuned = shiftDate(cal.pelnutrsd, +3);
  cal.lielnedela = shiftDate(cal.lieldienas, -7);
  cal.lielpirmd = shiftDate(cal.lieldienas, -6);
  cal.lielotrd = shiftDate(cal.lieldienas, -5);
  cal.lieltresd = shiftDate(cal.lieldienas, -4);
  cal.lielceturtd = shiftDate(cal.lieldienas, -3);
  cal.lielpiektd = shiftDate(cal.lieldienas, -2);
  cal.lielsestd = shiftDate(cal.lieldienas, -1);
  cal.lieloktava0 = shiftDate(cal.lieldienas, +1);
  cal.lieloktava1 = shiftDate(cal.lieldienas, +7);
  cal.debeskapsana = shiftDate(cal.lieldienas, +39);
  cal.vasarsvetki = shiftDate(cal.lieldienas, +49);
  cal.trisvieniba = shiftDate(cal.lieldienas, +56);
  cal.miesaasins = shiftDate(cal.lieldienas, +60);
  cal.jezussirds = shiftDate(cal.lieldienas, +68);
  cal.marijasirds = shiftDate(cal.miesaasins, +9);
  cal.marijabaznica = shiftDate(cal.vasarsvetki, +1);
  cal.gimene = new Date( year, 11, 25 ); //vajag nodefinēt iepriekš
  cal.kristuspriesteris = shiftDate(cal.vasarsvetki, +4);
  cal.metro = Metropolija();

  // == LITURGISKA LAIKA ROBEZAS ==
  cal.adv0 = getAdvent(year);
  cal.karalis = shiftDate(cal.adv0, -7); // Kristus karaļa svētki, pēdējā PLL svētdiena
  cal.adv1 = new Date(year, 12 - 1, 24);
  cal.zsl0 = new Date(year, 1 - 1, 1);
  cal.zsl1 = cal.baptism;; //shiftDate(cal.baptism, -1);// cal.baptism;
  cal.zsl2 = new Date(year, 12 - 1, 25);
  cal.zsl3 = new Date(year, 12 - 1, 31);
  cal.pll0 = shiftDate(cal.baptism, +1); // PARASTAIS LITURĢISKAIS LAIKS 1 cal.baptism; // 
  cal.pll1 = shiftDate(cal.pelnutrsd, -1);
  cal.pll2 = cal.vasarsvetki;
  cal.pll3 = shiftDate(cal.adv0, -1);
  cal.gav0 = cal.pelnutrsd; // GAVĒŅA LAIKS
  cal.gav1 = cal.lieltresd;
  cal.trd0 = cal.lielceturtd;
  cal.trd1 = cal.lielsestd;
  cal.ldl0 = cal.lieldienas; // LIELDIENU LAIKS
  cal.ldl1 = shiftDate(cal.vasarsvetki, -1);

  return cal;
}

// FUNKCIJA == LITURĢISKĀ GADA IZVEIDOŠANA == SĀKUMS
const rubricella = function() {
  solemnities(year);
  var gadaGarums = leapYear(year) ? 366 : 365; 
  
  gads = {};
  gadaSakums = new Date(year, 1 - 1, 1); // janvāris mēnesis ir 0 ?

  // == SVĒTDIENU SKAITĪTĀJS ==
  parSv = 2; // nezinu, kur tiek samazināt par 1 pll jāsākas ar 1. ps nedēļu
  maxParSvStop = 0;
  gavSv = 0;
  ldlSv = 1;
  advSv = 0;
  zslSv = 1;

  for (d = 1; d <= gadaGarums+1; d++) {// fiktīva diena gada galā, lai 31.dec. nebūtu kļūda.
    gads[d] = {
      diena: d,
      datums: shiftDate(gadaSakums, (d - 1))
    };
    gads[d].weekday = nedDiena[gads[d].datums.getDay()];
    sunday = "";
	
    // ZIEMASSVĒTKU LAIKS
    if (gads[d].datums <= cal.zsl1) {
		gads[d].litlaiks = "zsl";
		gads[d].krasa = "white";
		gads[d].prior = 11;
		if (zslSv != 2) zslSv = 1;
		if (gads[d].datums.getDay() == 0) {
			sunday = "2. ";
			gads[d].prior = 8;
			zslSv = 2;
			gads[d].vesperesI = true;
		} else {
		sunday = "";
		}
		gads[d].svetki = litDiena[0] + sunday + gads[d].weekday;
		gads[d].psNedela = zslSv;
    }
    // PARASTAIS LAIKS		
    if (gads[d].datums > cal.zsl1 && gads[d].datums < cal.gav0) {
      gads[d].litlaiks = "pll";
      gads[d].krasa = "green";
      gads[d].prior = 11;
      if (gads[d].datums.getDay() == 0) {
		gads[d].svetdiena = parSv;
        sunday = parSv + ". "; parSv++;
        gads[d].prior = 8;
		gads[d].vesperesI = true;
      } else {
        sunday = "";
      }
      gads[d].svetki = litDiena[1] + sunday + gads[d].weekday;
      gads[d].psNedela = parSv-1;
    }
    // GAVĒŅA LAIKS	
    if (gads[d].datums >= cal.gav0 && gads[d].datums < cal.trd0) {
      gads[d].litlaiks = "gav";
      gads[d].krasa = "violet";
      gads[d].prior = 9; // 11;
      if (gads[d].datums.getDay() == 0) {
		gavSv++; 
        sunday = gavSv + ". ";
		gads[d].vesperesI = true;
        if (gavSv == 4) gads[d].krasa = "pink";
        gads[d].prior = 4;
      } else {
        sunday = "";
      }
      gads[d].svetki = litDiena[2] + sunday + gads[d].weekday;
      gads[d].psNedela = gavSv;//gavēnī ir 6 psNedēļas psalmuNedela(gavSv)
    }
    // LIELĀ NEDĒĻA & TRIDIUUM LAIKS		
    if (gads[d].datums >= cal.lielceturtd && gads[d].datums < cal.ldl0) { cal.lielceturtd // cal.lielnedela
      gads[d].litlaiks = "trd";
      gads[d].krasa = "violet";
      gads[d].prior = 4;
      gads[d].svetki = litDiena[5] + gads[d].weekday;
      // psalmuNedela kā gavēļa laika noslēgums
    }
    // LIELDIENU LAIKS		
    if (gads[d].datums >= cal.ldl0 && gads[d].datums <= cal.pll2) {
      gads[d].litlaiks = "ldl"; 
      gads[d].krasa = "white";
      gads[d].prior = 11;
      if (gads[d].datums.getDay() == 0) {
        sunday = ldlSv + ". ";
        ldlSv++;
        gads[d].prior = 4;
		gads[d].vesperesI = true;
      } else {
        sunday = "";
      }
      gads[d].svetki = litDiena[3] + sunday + gads[d].weekday;
      gads[d].psNedela = ldlSv - 1;
    }
	// LIEDIENU OKTĀVA
	if(gads[d].datums >= cal.lieloktava0 && gads[d].datums < cal.lieloktava1){
		gads[d].litlaiks = "lokt";
		gads[d].krasa = "white";
        gads[d].prior = 4;
		gads[d].svetki = litDiena[8] + sunday + gads[d].weekday;
		gads[d].psNedela = 1;
	}
	// PARASTAIS LAIKS		
    if (gads[d].datums > cal.pll2 && gads[d].datums < cal.adv0) {
      gads[d].litlaiks = "pll";
      gads[d].krasa = "green";
      gads[d].prior = 11;
      if (maxSv(cal.pll0, cal.pll1, cal.pll2, cal.pll3) == 33 && maxParSvStop == 0) {
        parSv++;
        maxParSvStop++;
      }
      if (gads[d].datums.getDay() == 6) {
        gads[d].svetdiena = parSv-1;
      }
      if (gads[d].datums.getDay() == 0) {
		parSv++;
		gads[d].svetdiena = parSv;
        sunday = parSv + ". ";
        gads[d].prior = 8;
		gads[d].vesperesI = true;
      } else {
        sunday = "";
      }
      gads[d].svetki = litDiena[1] + sunday + gads[d].weekday;
      gads[d].psNedela = parSv;
    }
    // ADVENTA LAIKS		
    if (gads[d].datums >= cal.adv0 && gads[d].datums <= cal.adv1) {
      gads[d].litlaiks = "adv";
      gads[d].krasa = "violet";
      gads[d].prior = 11;
      if (gads[d].datums.getDay() == 0) {
		advSv++;
        sunday = advSv + ". ";
        if (advSv == 3) gads[d].krasa = "pink";
        gads[d].prior = 4;
		gads[d].vesperesI = true;
      } else {
        sunday = "";
      }
      gads[d].svetki = litDiena[4] + sunday + gads[d].weekday;
      gads[d].psNedela = advSv;
    }
    // ZIEMASSVĒTKU LAIKS		
    if (gads[d].datums > cal.adv1) {
      gads[d].litlaiks = "zokt";
      gads[d].krasa = "white";
      gads[d].prior = 11;
      if (zslSv == 2) zslSv = 4;
      if (gads[d].datums.getDay() == 0) {
        sunday = "1. ";
        gads[d].prior = 8;
        zslSv = 1;
		gads[d].vesperesI = true;
		// If Christmas falls on a Sunday, then Holy Family is celebrated on Dec. 30. Otherwise, Holy Family is the Sunday after Christmas. piem., 2023
		// Sv. ĢIMENE – JĒZUS, MARIJA, JĀZEPS
			       console.log(d, " : A ĢIMEME = ", cal.gimene);
				   cal.gimene = gads[d].datums;
		if ( cal.gimene.valueOf() == new Date (year, 11, 25).valueOf() ) {
			cal.gimene = new Date( year, 11, 30 ); 
		}// else { console.log("ĢIMENE ", gads[d].datums);		cal.gimene = gads[d].datums;		}
			//		console.log(d, " : B ĢIMEME = ", cal.gimene);
     } else {
        sunday = "";
     }

		if ( gads[d].datums.valueOf() == new Date( year+1, 0, 1 ).valueOf() && zslSv == 1) {
				gads[d].psNedela = 0; gads[d].svetki = "VISSV. JAUNAVA MARIJA, DIEVA MĀTE, obligātās svinības"; gads[d].prior = 4; gads[d].vesperesI = true;
			} else {
				gads[d].svetki = litDiena[7] + sunday + gads[d].weekday;
				gads[d].psNedela = zslSv;
				}

    }

    // MAINĪGĀS DIENAS NO const SOLEMNITIES	
    if (gads[d].datums.valueOf() == cal.gimene.valueOf()) {
      sunday = "Sv. ĢIMENE – Jēzus, Marija, Jāzeps, svētki";
      gads[d].krasa = "white";
      gads[d].prior = 6;
      gads[d].svetki = sunday;
	  if ( gads[d].datums.getDay() == 5 ) gads[d].vesperesI = false; else gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-0-SvGimene";
	  gads[d].N = "Sv. Ģimene";
    } 
    if (gads[d].datums.valueOf() == cal.epifany.valueOf()) {
		sunday = "KUNGA EPIFĀNIJA, obligātas svinības";
		gads[d].krasa = "white";
		gads[d].prior = 6;
		gads[d].svetki = sunday + gads[d].weekday;
		gads[d].vesperesI = true;
		gads[d].liturgija ="festum-1-6";
		gads[d].N = "EPIFĀNIJA";
    }
    if (gads[d].datums.valueOf() == cal.baptism.valueOf()) {
		sunday = "KUNGA KRISTĪŠANA, svētki";
		gads[d].krasa = "white";
		gads[d].prior = 7;
		gads[d].svetki = sunday + gads[d].weekday;
		gads[d].vesperesI = true;
		gads[d].liturgija ="festum-0-Baptism";
		gads[d].N = "KUNGA KRISTĪŠANA";
    }
    if (gads[d].datums.valueOf() == cal.pelnutrsd.valueOf()) {
      sunday = "PELNU TREŠDIENA";
      gads[d].krasa = "violet";
      gads[d].prior = 3;
      gads[d].svetki = sunday;
    }
    if (gads[d].datums.valueOf() == cal.lielnedela.valueOf()) {
      sunday = "PALMU JEB KUNGA CIEŠANU SVĒTDIENA";
      gads[d].krasa = "red";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
    }
    if (gads[d].datums.valueOf() == cal.lielceturtd.valueOf()) {
      sunday = "Lielās nedēļas ceturtdiena";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
      gads[d].psNedela = 6; // ir speciāla liturģija
    }
    if (gads[d].datums.valueOf() == cal.lielpiektd.valueOf()) {
      sunday = "KUNGA CIEŠANU UN NĀVES PIEMIŅAS DIENA, Trīs svētās dienas";
      gads[d].krasa = "red";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
      gads[d].psNedela = 6; // ir speciāla liturģija Tridium
    }
    if (gads[d].datums.valueOf() == cal.lielsestd.valueOf()) {
      sunday = "Lielā sestdiena, Trīs svētās dienas";
      gads[d].krasa = "violet";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
      gads[d].psNedela = 6; // ir speciāla liturģija Tridium
    }
    if (gads[d].datums.valueOf() == cal.lieldienas.valueOf()) {
      sunday = "KUNGA AUGŠĀMCELŠANĀS, obligātās svinības";
      gads[d].krasa = "white";
      gads[d].prior = 1;
      gads[d].svetki = sunday;
    }
    if (gads[d].datums.valueOf() == cal.debeskapsana.valueOf()) {
      sunday = "KUNGA DEBESKĀPŠANA, obligātās svinības";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
    }
    if (gads[d].datums.valueOf() == cal.vasarsvetki.valueOf()) {
      sunday = "SVĒTĀ GARA NOSŪTĪŠANA (VASARSVĒTKI), <br>obligātās svinības";
      gads[d].krasa = "red";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
    }
	if (gads[d].datums.valueOf() == cal.kristuspriesteris.valueOf()) {
		sunday = "MŪSU KUNGS JĒZUS KRISTUS, AUGSTAIS UN MŪŽĪGAIS PRIESTERIS, svētki";
		gads[d].krasa = "white";
		gads[d].prior = 5;
		gads[d].svetki = sunday;
		gads[d].vesperesI = false;
		gads[d].liturgija = "festum-0-SacerdotisAEeterna";
    }
    if (gads[d].datums.valueOf() == cal.trisvieniba.valueOf()) {
      sunday = "VISSVĒTĀ TRĪSVIENĪBA, obligātās svinības";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-0-Trinitas";
    }
    if (gads[d].datums.valueOf() == cal.karalis.valueOf()) {
      sunday = "MŪSU KUNGS JĒZUS KRISTUS, VISPASAULES KARALIS, svinības";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-0-Rex";
    }
    if (gads[d].datums.valueOf() == cal.miesaasins.valueOf()) {
      sunday = "KRISTUS VISSVĒTĀ MIESA UN ASINIS, obligātās svinības";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-0-CorpusChristi";
    }
    if (gads[d].datums.valueOf() == cal.jezussirds.valueOf()) {
      sunday = "VISSVĒTĀ JĒZUS SIRDS, svinības";
      gads[d].krasa = "white";
      gads[d].prior = 5;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-0-JezusSirds";
    }
    if (gads[d].datums.valueOf() == cal.marijasirds.valueOf()) {
      sunday = "Vissv. Jaunavas Marijas Bezvainīgā Sirds,<br>piemiņas diena";
      gads[d].krasa = "white";
      gads[d].prior = 9;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = false;
	  gads[d].liturgija = "festum-0-MarijaSirds";
    }
    if (gads[d].datums.valueOf() == cal.marijabaznica.valueOf()) {
      sunday = "VISSV. JAUNAVA MARIJA,<br>BAZNĪCAS MĀTE, svētki";
      gads[d].krasa = "white";
      gads[d].prior = 9;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = false;
	  gads[d].liturgija = "festum-0-EcclesiaeMatris";
    }
    if (gads[d].datums.valueOf() == MarijaJazeps("M").valueOf()) {
	sunday = "VISSV. JAUNAVAS MARIJAS BEZVAINĪGĀ IEŅEMŠANA, obligātās svinības"; // 8.decembris
	gads[d].krasa = "white";
	gads[d].prior = 6;
	gads[d].svetki = sunday;
	gads[d].vesperesI = true;
	gads[d].liturgija ="festum-12-8";
	gads[d].lugsana = "Kung Dievs, tu ar Vissvētākās Jaunavas Marijas bezvainīgo ieņemšanu savam Dēlam sagatavoji cienīgu mājokli, un Jēzus Kristus nopelnu dēļ pasargāji šo Jaunavu no ikviena grēka, esi mums žēlīgs un palīdzi mums, viņas aizbildniecībā dzīvojot, ar tīrām sirdīm nonākt pie Tevis. <span id='gara'>Caur Jēzu Kristu, mūsu Kungu, kas ar Tevi dzīvo un valda Svētā Gara vienībā, Dievs visos mūžu mūžos.</span><span id='dienas' style='display: none;'>Caur Kristu, mūsu Kungu.</span>";
	gads[d].N = "V.J.Marijas ieņemšana";
    }
    if (gads[d].datums.valueOf() == MarijaJazeps("I").valueOf()) {
      sunday = "KUNGA PASLUDINĀŠANA, svinības"; // 25.marts
      gads[d].krasa = "white";
      gads[d].prior = 6;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-3-25";
    }
    if (gads[d].datums.valueOf() == MarijaJazeps("J").valueOf()) {
      sunday = "SV. JĀZEPS, VISSV. JAUNAVAS MARIJAS LĪGAVAINIS, obligātās svinības"; // 19.marts, ja pārceļ nav obligātas
      gads[d].krasa = "white";
      gads[d].prior = 6;
      gads[d].svetki = sunday;
	  gads[d].vesperesI = true;
	  gads[d].liturgija = "festum-3-19";
    }
	if (gads[d].datums.valueOf() == cal.metro.valueOf()) {
		gads[d].krasa = "white";
		gads[d].prior = 5;
		gads[d].svetki = "RĪGAS METROPOLIJAS DIEVNAMU IESVĒTĪŠANAS GADADIENA,<br>obligātās svinības";
		gads[d].vesperesI = true;
		gads[d].liturgija = "festum-0-Metropole";
	}
	
    // IELĀDĒJAM PĀRĒJĀS PIEMIŅAS DIENAS ATBILSTOŠI PRIORITĀTEI
    leap = (gads[d].datums.getMonth() > 2 && !leapYear(year)) ? 0 : 1;
    for (var i = 0; i < pd.dienas.length; i++) {
      var p = new Date(year, pd.dienas[i]['M']-1, pd.dienas[i]['D']);
	  
 	  if (cal.jezussirds.valueOf() == p.valueOf() ) {// Ja Jēzus sirds svētki iekrīt 24.jūnijā
		  pd.dienas[i].D = "23"; // Jāņa Kristītāja svētkus pārceļ uz 23.jūniju
	  } 
	  
      if (gads[d].datums.valueOf() == p.valueOf()) {
        if (pd.dienas[i]['Priority'] < gads[d].prior) {
          gads[d].prior = parseInt(pd.dienas[i]['Priority']);
          gads[d].svetki = pd.dienas[i]['Name'];
		  gads[d].vesperesI = pd.dienas[i].vesperesI;
		  gads[d].liturgija = pd.dienas[i].liturgija;
		  gads[d].N = pd.dienas[i].N; // nominatīvs
		  gads[d].G = pd.dienas[i].G; // ģenetīvs
		  gads[d].Dat = pd.dienas[i].Dat; // datīvs
		  gads[d].lugsana = pd.dienas[i].lugsana;
          if (pd.dienas[i]['Colour'] == "B") gads[d].krasa = "white";
          if (pd.dienas[i]['Colour'] == "S") gads[d].krasa = "red";
          if (pd.dienas[i]['Colour'] == "M") gads[d].krasa = "black";
        }
        if (gads[d].prior >= 11) {
          gads[d].svetki += "<br><span class='italicblack'>" + pd.dienas[i]['Name'] + "</span>";
        }
      }
    }	
	
  } // FUNKCIJA == LITURĢISKĀ GADA IZVEIDOŠANA == BEIGAS
}
rubricella(); // == izveido LITURĢISKO GADU ==