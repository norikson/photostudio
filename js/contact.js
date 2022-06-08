$('.my-form').submit(function(e) {
    e.preventDefault();
    let th = $(this);
    let mess = $('.message');
    let btn = th.find('#form-submit');
    btn.addClass('progress-bar-striped progress-bar-animated');

    $.ajax({
        url: '../php/contact.php',
        type: 'POST',
        data: th.serialize(),
        success: function(data) {
            if (data == 1) {
                btn.removeClass('progress-bar-striped progress-bar-animated');
                mess.html('<div class="alert alert-danger mt-3">Email не существует!</div>')
                return false;
            } else {
                btn.removeClass('progress-bar-striped progress-bar-animated');
                mess.html('<div class="alert alert-success mt-3"> Сообщение успешно отправлено!</div>');
                setTimeout(function() {
                    th.trigger('reset');
                    mess.empty();
                }, 2000);
            }

        },
        error: function() {
            btn.removeClass('progress-bar-striped progress-bar-animated');
            mess.html('<div class="alert alert-danger mt-3">Ошибка отправки!</div>')

        }



    })

})