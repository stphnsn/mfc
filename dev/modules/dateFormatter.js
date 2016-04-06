module.exports.formatDate = function (date) {
    var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var rawDate = new Date(date);
    var formattedDate = '';
    formattedDate += ' ' + months[rawDate.getMonth()];
    formattedDate += ' ' + rawDate.getDate() + ',';
    formattedDate += ' ' + rawDate.getFullYear();
    //formattedDate += ' ' + ('0' + rawDate.getHours()).slice(-2);
    //formattedDate += ':' + ('0' + rawDate.getMinutes()).slice(-2);
    return formattedDate;
};