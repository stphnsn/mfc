var dataProvider = require('./dataProvider');

module.exports.calendar = function (cottage) {

        console.log('getting booking');
    (function getBooking() {
        console.log('getting booking');
        dataProvider.findByCottageAndStart('the_cottage', '20160402');
    })();

    var form = '<form>';

    var numberOfMonths = 12;
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var daysCalendar = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var daysObj = {
        'Sunday': 1,
        'Monday': 2,
        'Tuesday': 3,
        'Wednesday': 4,
        'Thursday': 5,
        'Friday': 6
    };
    var daysInMonthsArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var months   = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // get the current date
    // from there we can determine what month we're in

    // then we can figure out what the first Saturday is and its date.
    // - Get the first day of the current month.
    // - Is it a Saturday? If not, how many days until it is. Use $days array for that calculation.
    // Once we've got that, we can simply loop in batches of 7 (until the end of the month at which point the counter is reset)

    var dt = new Date(),
        month = dt.getMonth(),
        year = dt.getFullYear(),
        table = '',
        saturday,
        startOfWeek,
        daysInMonth,
        daysInCalendar,
        rows,
        count,
        firstDate;

    for (var i = 0; i < numberOfMonths; i++) {

        firstDate = new Date(year, month, 1);
        firstDay = days[firstDate.getDay()];

        if (firstDay === 'Saturday') {
            saturday = 1;
        } else {
            saturday = 1 + (days.length - daysObj[firstDay]);
        }

        count = saturday;

        if (year % 4 === 0 && month === 1) {
            daysInMonth = 29;
        } else {
            daysInMonth = daysInMonthsArray[month];
        }

        daysInCalendar = (daysInMonth - (saturday - 1)) > 28 ? 35 : 28;
        rows = daysInCalendar / 7;

        table += '<table border="1">';
        table += '<tr>';
        table += '<th colspan="9">' + months[month] + ' ' + year + '</th>';
        table += '</tr>';

        table += '<tr>';
        for (var j = 0; j < daysCalendar.length; j++) {
            table += '<th>' + daysCalendar[j] + '</th>';
        }
        table += '</tr>';
        for (var k = 0; k < rows; k++) {
            table += '<tr>';
            for (var col = 0; col < 8; col++) {
                var m = (month + 1).toString().length === 1 ? '0' + (month + 1) : month + 1;
                var d = count.toString().length === 1 ? '0' + count : count;
                if (!startOfWeek) {
                    startOfWeek = year + '-' + m + '-' + d;
                }
                if (col === 6) {
                    endOfWeek = year + '-' + m + '-' + d;
                }
                if (col === 7) {
                    table += '<td>';
                    table += '<input name="price-' + startOfWeek + '" value="">';
                    table += '<select name="booked-' + startOfWeek + '">';
                    table += '<option value="0">No</option>';
                    table += '<option value="1">Yes</option>';
                    table += '</select>';
                    table += '<button id="save-' + startOfWeek + '">Save</button';
                    table += '</td>';
                    startOfWeek = null;
                } else {
                    table += '<td>' + count++ + '</td>';
                }
                if (count > daysInMonth) {
                    count = 1;
                    if (month < 11) {
                        month++;
                    } else {
                        month = 0;
                        year++;
                    }
                }

            }
            table += '</tr>';
        }
        table += '</table>';
    }
   return table;
};