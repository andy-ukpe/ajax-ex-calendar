$(document).ready(function () {

  var date = moment("2018-01-01");
  var monthYears = moment("2018-01-01").format('MMMM YYYY');

  var days = date.daysInMonth();
  console.log(days);

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

    var source = $("#calendario").html();
    var template = Handlebars.compile(source);

    for (var i = 1; i <= days; i++) {
      console.log(i);
      var month = moment("2018-01-01").format('MMMM');
      var day = '<li>' +  i + ' ' + month + '</li>';
      console.log(day);

      var context = { title: monthYears, day: day };
      var html = template(context);
      $('.container').append(html);
    }



});
