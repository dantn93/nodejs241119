let fs = require("fs");
let formatDistance = require("date-fns/formatDistance");
let viLocale = require("date-fns/locale/vi");
let obj = [];

// format number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
// format index
function formatIndex(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
// Async
fs.readFile("./products.json", function(err, data) {
  if (err === null) {
    obj = JSON.parse(data);
    let numberOfProduct = 0;
    obj.forEach((value, index) => {
      numberOfProduct += 1;
      value.dateUpdated = new Date(value.dateUpdated);
      let fromNow = formatDistance(new Date(), value.dateUpdated, {locale: viLocale});
      console.log(`${formatIndex(index, 4)} - ${value.name} - ${formatNumber(value.price)}VND - Cập nhật cách đây ${fromNow}`);
    });
    console.log("\n\nNumber of products: ", numberOfProduct);
  }
});
