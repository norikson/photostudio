$(document).ready(function() {
    $.ajax({
        url: '../php/booking.php',
        type: 'POST',
        data: {
            action: 'fetch',
            'hall': 'SOLO'
        },
        dataType: 'json',
        success: function(data) {
            for (let count = 0; count < data.length; count++) {
                hallBox.push(data[count].date)
                
            }

            checkColision();
            

        }
    })


})

let hallBox = [];
const current_week = [];
const full_days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
];
const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];
const numMonth = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
];

var elms = document.querySelectorAll("[id='selected-month']");

// updates current_week
//added
function get_selected_week(date) {
    let curr = date
    while (current_week.length > 0) {
        current_week.pop();
    }
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i
        let day = new Date(curr.setDate(first))
        current_week.push(day)
    }

}

//added
function get_previous_week() {
    var last_week = new Date(current_week[0].getFullYear(), current_week[0].getMonth(), current_week[0].getDate() - 7);
    get_selected_week(last_week)
    generate_calendar();
}

//added
function get_next_week() {
    var next_week = new Date(current_week[0].getFullYear(), current_week[0].getMonth(), current_week[0].getDate() + 7);
    get_selected_week(next_week)
    generate_calendar();
}

//added
function generate_calendar() {
    document.getElementById("monday-month").innerHTML = months[current_week[0].getMonth()];
    document.getElementById("tuesday-month").innerHTML = months[current_week[1].getMonth()];
    document.getElementById("wednesday-month").innerHTML = months[current_week[2].getMonth()];
    document.getElementById("thursday-month").innerHTML = months[current_week[3].getMonth()];
    document.getElementById("friday-month").innerHTML = months[current_week[4].getMonth()];
    document.getElementById("saturday-month").innerHTML = months[current_week[5].getMonth()];
    document.getElementById("sunday-month").innerHTML = months[current_week[6].getMonth()];

    document.getElementById("monday-date").innerHTML = current_week[0].getDate();
    document.getElementById("tuesday-date").innerHTML = current_week[1].getDate();
    document.getElementById("wednesday-date").innerHTML = current_week[2].getDate();
    document.getElementById("thursday-date").innerHTML = current_week[3].getDate();
    document.getElementById("friday-date").innerHTML = current_week[4].getDate();
    document.getElementById("saturday-date").innerHTML = current_week[5].getDate();
    document.getElementById("sunday-date").innerHTML = current_week[6].getDate();
    getDataTime();
    checkColision();
}

// initialise calendar to current time
get_selected_week(new Date());
get_previous_week();
get_next_week();
generate_calendar();


function getDataTime(){
    $('.timeslot-button').each(function(){
    $(this).attr('data-time', current_week[($(this).val()).charAt(0)].getFullYear() + "-" + numMonth[current_week[($(this).val()).charAt(0)].getMonth()] + "-" + formatDate(current_week[($(this).val()).charAt(0)].getDate())+' '+($(this).val()).charAt(2)+($(this).val()).charAt(3)+($(this).val()).charAt(4)+($(this).val()).charAt(5)+($(this).val()).charAt(6)+($(this).val()).charAt(7)+($(this).val()).charAt(8)+($(this).val()).charAt(9))
})
}

function formatDate(day){
    if(day<10){
        day = '0'+day
    }
    return day;


}


function checkColision(){   
        $('.timeslot-button').each(function(){
          if(hallBox.indexOf($(this).attr('data-time'))!=-1){
            $(this).css({'backgroundColor':'rgba(255,0,0,0.5)','cursor':'not-allowed'})  
            $(this).prop('disabled', true);
          }
          else{
            $(this).css({'backgroundColor':'','cursor':'pointer'})
          }
})
}


function togglePopup(time) {

    document.getElementById("popup-1").classList.toggle("active");

    const full_time =  current_week[time.charAt(0)].getFullYear() +"-"+ numMonth[current_week[time.charAt(0)].getMonth()]+"-"+formatDate(current_week[time.charAt()].getDate())+ " "+time.charAt(2)+time.charAt(3)+":00"; //data бронирования
    $('#bookingform h4').text(full_time)
    document.getElementById("hiddendate").value = full_time; 

    document.getElementById("confirm-accepted").value = full_days[parseInt(time.charAt(0))] + " " + time.substring(2) + " " + full_time;

    // passes time to accept button
    const button_time = document.getElementById("confirm-accepted").value;
    //   document.write(button_time) // получаем конкретное время
}

// START BOOKING



// END FORM BOOKING

$('.hall section').on('click', function() {
    $('#hiddenhall').val($(this).data('name'));
    $('.hall section').removeClass('activate');
    $(this).addClass('activate');
    hallBox=[];
    let hall = $(this).data('name');
    $.ajax({
        url: '../php/booking.php',
        type: 'POST',
        data: {
            action: 'fetch',
            'hall': hall
        },
        dataType: 'json',
        success: function(data) {
            for (let count = 0; count < data.length; count++) {
                hallBox.push(data[count].date)
                
            }

            checkColision();
            

        }
    })
})


// BOOKING SUBMIT

$('#bookingform').submit(function(e){
    e.preventDefault();
    let th = $(this);
    $.ajax({
        url:'../php/addBooking.php',
        type:'POST',
        data:th.serialize(),
        success: function(data) {

            if(data == 1){
                let h = $(".hall .activate").data('name');
                $.ajax({
                    url: '../php/booking.php',
                    type: 'POST',
                    data: {
                        action: 'fetch',
                        'hall': h
                    },
                    dataType: 'json',
                    success: function(data) {
                        for (let count = 0; count < data.length; count++) {
                            hallBox.push(data[count].date)
                            
                        }
            
                        checkColision();
            
                    }
                })
                th.css({'display':'none'});
                $('.popup .mess').css({'display':'block'});	
                setTimeout(function(){
                    $('#popup-1').removeClass('active');
                    th.trigger('reset');

                },3000);
            }

        }
    })



})



