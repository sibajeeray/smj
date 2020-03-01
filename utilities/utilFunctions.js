exports.getCurrentDate = function() {
    var currentDate = new Date();
    return currentDate;
}

exports.getPreviousMonthDate  = function () {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    
    var previousMonthDate = new Date(year, month - 1, day);
    return previousMonthDate;
}