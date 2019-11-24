let fs = require("fs");
let formatDistance = require("date-fns/formatDistance");
let format = require("date-fns/format")
let viLocale = require("date-fns/locale/vi");
let obj = [];

// format number
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// Async
fs.readFile("./../products.json", function(err, data) {
  if (err === null) {
    obj = JSON.parse(data);
    let numberOfProduct = 0;
    obj.forEach((value, index) => {
      //Task 2
      // Print the list to the console with following template for each product:
      // ${name} - ${price}VND - Cập nhật cách đây: ${fromNow}
      // Format the price with comma (,) as thousand separators. (Google for a snippet)
      // Use date-fns formatDistance to convert dateUpdated to fromNow with Vietnamese locale

      numberOfProduct += 1;
      value.dateUpdated = new Date(value.dateUpdated);
      let fromNow = formatDistance(new Date(), value.dateUpdated, {locale: viLocale});
      console.log(`${value.id} - ${value.name} - ${formatNumber(value.price)}VND - Cập nhật cách đây ${fromNow}`);
    });
    console.log("\nNumber of products: %d\n", numberOfProduct);
  }
});
