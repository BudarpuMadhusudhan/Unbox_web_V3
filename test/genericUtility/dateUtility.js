const workflowLibrary = require("../workflowLibrary/workflowLibrary");

class DateUtility {

   
    getDate(minusDateFromToday) {
        var year
        var month
        var day
        const d = new Date();
        const str = (new Date(d.setDate(d.getDate() - minusDateFromToday)))
        console.log(str)
        console.log(str.toISOString().split('T'))
        console.log(str.toISOString().split('T')[0].split('-'))
        var localdate = str.toISOString().split('T')[0].split('-')
        console.log(`Year is ${localdate[0]}`);
        console.log(`Month is ${localdate[1]}`);
        console.log(`Day is ${localdate[2]}`);
        year=localdate[0]
        month=localdate[1]
        day=localdate[2]
        if(month=="01"||month=="02"||month=="03"||month=="04"||month=="05"||month=="06"||month=="07"||month=="08"||month=="09"){
            month=month.split('')[1]
            console.log(month);
        }
        if(day=="01"||day=="02"||day=="03"||day=="04"||day=="05"||day=="06"||day=="07"||day=="08"||day=="09"){
            day=day.split('')[1]
            console.log(day);
        }
        return [year,month,day]
    }
    /* Below function prefixes 0 if it is a single digit */
    add0IfSingleDigit(digit) {
        if (digit < 9) {
            return `${this.padToTwoDigits(digit)}`;
        }
        else{
            return digit
        }
    }
    padToTwoDigits(num) {
        return num.toString().padStart(2, '0');
    }
    /* Generates a random IP Address */
    generateRandomIP = () => Array(4).fill(0).map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0)).join('.');

    /* Generates a random Printer ID */
    generateRandomPrinterID(){
        var printerID
        return printerID=`Printer${Math.ceil(Math.random()*10000)}`
    }
}
module.exports = new DateUtility()