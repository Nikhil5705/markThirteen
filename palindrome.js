function reverseStr(str){
   var charsList = str.split('');
   var reverseList = charsList.reverse();

   var reverseStr = reverseList.join('');
   return reverseStr;
}

function checkPalindrome(str){
    var rev = reverseStr(str);
    return str === rev;
}
function convertDateIntoStr(date){
    var dateStr = { day: '', month: '', year: '' };

    if(date.day < 10){
        dateStr.day = '0' + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0' + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}
function allDateFormats(date){
    var dateStr = convertDateIntoStr(date);
    
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.day + dateStr.month;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date){
    var palindromeList = allDateFormats(date);
    
    var check = false;
    for(let i=0; i < palindromeList.length; i++){
     if(checkPalindrome(palindromeList[i])){
        check = true;
        break;
     }
    } 
    return check;
    function leapYear(year){
      if(year%4 === 0){
        return true;
      }return false;
    }
}
function nextDate(date){
    var day = date.day +  1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month === 2){
        if(leapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
     
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
            day = 1;
            month++; 

        }
    }
    if(month > 12){
        month = 1;
        year++;

    }
    return {
        day: day,
        month: month,
        year: year
    };

}
function nextPalindromeDate(date){
     var ctr = 0;
     var nxtdt = nextDate(date);

     while(1){
     ctr++;
     var checkPalindrome = checkPalindromeForAllDateFormats(nxtdt);
     if (checkPalindrome) {
        break;
     }
      nxtdt = nextDate(nxtdt);

     }
     return [ctr, nxtdt];

}
var inputDt = document.querySelector("#input-box");
var btn = document.querySelector("#check-btn");
var output = document.querySelector("#output");
function clickHandler(){
var bDay = inputDt.value;

if(bDay !== ''){
var listOfDate = bDay.split('-');

var date = {
  day: Number(listOfDate[2]),
  month: Number(listOfDate[1]),
  year: Number(listOfDate[0])
};
var checkPalindrome = checkPalindromeForAllDateFormats(date);
if (checkPalindrome){
 output.innerText = "Yes, Your Birthday is Palindrome"
}
else{
    var [ctr, nxtdt] = nextPalindromeDate(date);
    output.innerText = `the next palindrome date is ${nxtdt.day}-${nxtdt.month}-${nxtdt.year}, you missed by ${ctr} days`

}
}
}
btn.addEventListener("click", clickHandler);