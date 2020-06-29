$(document).ready(function () {

  var date = moment("2018-01-01");
  console.log(date.format('MMMM YYYY'));

  var month = moment("2018-01-01").format('M');
  var days = date.daysInMonth();
  console.log(days);

  for (var i = 1; i <= days; i++) {
    console.log(days[i]);
  }

});
