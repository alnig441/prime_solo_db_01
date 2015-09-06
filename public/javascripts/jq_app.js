$(document).ready(function(){

$('#display').on('click', function() {
    console.log('displaying...');

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/users'
        }).always(function () {
            console.log('Ajax call complete');
        }).done(function(data){
            console.log(data);
        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log('AJAX call failed with ', textStatus, errorThrown);
        });
    });

})