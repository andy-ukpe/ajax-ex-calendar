$(document).ready(function () {

  var date = moment("2018-01-01");
  console.log(date);

  printDays(date);
  printHolidays(date);

});

// Ad ogni click su next cambia il mese
$('.next').click(function () {
  // prendere il mese corrente
  var currentMonth = $('.month').attr('data-current-month');
  var nextMonth = moment(currentMonth);
  // aggiungere un mese
  nextMonth.add(1, 'months');
  console.log(nextMonth);

  // struttura if else per non andare oltre il 2018
  if(nextMonth.year() === 2018){
    // stampare i giorni e le festività
    printDays(nextMonth);
    printHolidays(nextMonth);
  } else{
    alert('puoi visualizzare solo i mesi all\'interno del 2018')
  }
})

// Ad ogni click su prev cambia il mese
$('.prev').click(function () {
  // prendere il mese corrente
  var currentMonth = $('.month').attr('data-current-month');
  var prevMonth = moment(currentMonth);
  // aggiungere un mese
  prevMonth.subtract(1, 'months');
  console.log(prevMonth);

  // struttura if else per non andare oltre il 2018
  if(prevMonth.year() === 2018){
    // stampare i giorni e le festività
    printDays(prevMonth);
    printHolidays(prevMonth);
  } else{
    alert(' puoi visualizzare solo i mesi all\'interno del 2018')
  }
})

// funzione per stampare dei giorni
function printDays(startDate) {
  // cancello i mesi appesi
  $('.days').html('');
// giorni in un mese che mi serviranno per stampare i vari giorni
  var days = startDate.daysInMonth();

// aggiungere il mese al html
  $('.month').html(startDate.format('MMMM YYYY'));
  $('.month').attr('data-current-month', startDate.format('YYYY-MM-DD'))
// stampare i vari giorni di un mese in un ciclo fo ed appenderli con handlerbars
  var source = $("#calendario").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < days; i++) {

    var currentDate = moment(startDate).add(i, 'days')
    console.log(currentDate);

    var context = { day: currentDate.format('DD MMMM'), completeDate: currentDate.format('YYYY-MM-DD') };
    var html = template(context);
    $('.days').append(html);
  }
}
// funzione per stampare le festività
function printHolidays(startDate) {
  $.ajax(
    {
      url:"https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      data:{
        year: startDate.year(),
        month:  startDate.month(),
      },
      success:function(data) {
        console.log(data.response)
        var holidays = data.response;
        // ciclo for per appendere le festività sul calendario
        for (var i = 0; i < holidays.length; i++) {
          var currentlyHoliday = holidays[i];
          console.log(currentlyHoliday);

          $('.giorno').each(function() {
            var thisDay = $(this);
            var thisDateHoli= thisDay.attr('data-complete-date');

            if (thisDateHoli === currentlyHoliday.date) {
              thisDay.addClass('red');
              thisDay.append(' - ' + currentlyHoliday.name);
            }

          })

        }

      },
      error: function () {
        alert('errore');
      }
    }

    );
}
