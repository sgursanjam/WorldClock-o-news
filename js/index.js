function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}
//displaying how to change css using JS
document.write(
  '<span id="worldclock" style="font:bold 16px Arial;"></span><br />'
);
now = new Date();
z2 = now.getTimezoneOffset();
zone = -z2 / 60;

isitlocal = true;
ampm = "";

function updateclock(z) {
  isitlocal = z.options[0].selected ? true : false;
  zone = z.options[z.selectedIndex].value;
}

function WorldClock() {
  now = new Date();

  ofst = now.getTimezoneOffset() * 60000;
  utc = ofst + now.getTime(); //oft=utc-local ;
  f = utc + zone * 3600000;
  l = now.toLocaleTimeString();
  nd = new Date(f);
  b = nd.toLocaleTimeString();
  j = b;

  document.getElementById("worldclock").innerHTML = j;
  //to calculate date
  function calc(ofst) {
    d = new Date();
    utc = d.getTime() + d.getTimezoneOffset() * 60000;
    convert = new Date(utc + 3600000 * ofst);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return convert.toLocaleString(undefined, options);
  }

  document.getElementById("dd").innerHTML = calc(zone);
  setTimeout("WorldClock()", 1000);
  var obj = document.getElementById("city");
  var result = obj.options[obj.selectedIndex].text;
  document.getElementById("loc").innerHTML = result;
  localStorage.setItem("result", result);
}

window.onload = WorldClock;
