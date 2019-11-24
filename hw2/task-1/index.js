let rl = require("readline-sync");
let moment = require("moment")
let name = rl.question("What's your name? [user enter their name and enter]\n");
let age = null
while (true) {
  let year = rl.question(
    "What's your year of birth? [user enter their yob and enter]\n"
  );
  let yearNumber = parseInt(year.trim());
  if(isNaN(yearNumber)) {
    console.log("Year of birth is invalid!\n");
    continue;
  }
  age = moment().year() - yearNumber;
  if(age < 0) {
    console.log("Year of birth is invalid!")
  } else {
    break;
  }
}

let homeTown = rl.question(
  "What's your home town? [user enter their home town and enter]\n"
);

// color
let BgBlue = "\x1b[44m"
let BgRed = "\x1b[41m"
let BgGreen = "\x1b[42m"
console.log("Thank you. Hello " + BgBlue + "%s\x1b[0m" +  ", so you are " + BgRed + "%s\x1b[0m" + " year old and from " +  BgGreen + "%s\x1b[0m" + ".", name, age, homeTown)