let fs = require("fs");
let formatDistance = require("date-fns/formatDistance");
let format = require("date-fns/format")
let viLocale = require("date-fns/locale/vi");
let XLSX = require('xlsx');
let obj = [];

// Async
fs.readFile("./../products.json", function(err, data) {
  if (err === null) {
    obj = JSON.parse(data);
    obj.forEach((value) => {
      value.dateUpdated = new Date(value.dateUpdated);

      //Task 3
      //Create new field updated from dateUpdated with following format: MM/DD/YYYY (use date-fns)
      value.updated =  format(value.dateUpdated, "MM/dd/yyyy")

      // Delete dateUpdated field (we don't want to generate this column later to Excel)
      delete value.dateUpdated
      
    });

    // Use xlsx library to convert products.json to a Microsoft Excel file buffer
    // Write the buffer to hard drive as products.xlsx and should be able to open in Excel.

    
    // create 'worksheet' object from json
    const ws = XLSX.utils.json_to_sheet(obj);
    
    // Optional: config columns width (character length)
    ws['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 20 }, { width: 20 }];
    
    
    // create 'workbook' object (which contains multiple sheet)
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    
    // convert to Microsoft EXCEL workbook and write to a Buffer object
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // write file hard drive
    fs.writeFile('./products.xlsx', buf, (err) => {
      if(err === null) {
        console.log("Created file products.xlsx")
      } else {
        console.log(err)
      }
    })
  }
});
