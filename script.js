$(document).ready(function () {

  var date = moment("2018-01-01");


  var days = date.daysInMonth();


  $('.month').html(date.format('MMMM YYYY'));

  var source = $("#calendario").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= days; i++) {
    // var month = moment("2018-01-01").format('MMMM');
    // var day = i + ' ' + month;
    var currentDate = moment(date).add(1, 'days')
    console.log(currentDate);

    var context = { day: currentDate};
    var html = template(context);
    $('.container').append(html);
    }

  $.ajax(
    {
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success:function(data) {
        console.log(data)
      },
      error: function () {
        alert('errore');
      }
    }

    );







});
