$(document).ready(function(){

$('#display').on('click', function() {
    console.log('displaying...');

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/display'
        }).always(function () {
            console.log('Ajax call complete');
        }).done(function(data){
            console.log('Ajax call done with data: ', data.user[0].firstname);

            //res.render('users', {users: data});
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log('AJAX call failed with ', textStatus, errorThrown);
        });
    });

})