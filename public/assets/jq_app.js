$(document).ready(function() {

    $('.display').on('click', function () {
        console.log('displaying...');

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/display'
        }).always(function () {
            console.log('Ajax call complete');
        }).done(function (data) {
            console.log('Ajax call done with data: ', data);

            console.log($('#printUsers').children().length);
            if ($('#printUsers').children().length == 0) {
                data.forEach(function (elem, index, array) {
                    var table = $('<table>');
                    $(table).attr("id", elem.id);
                    var trName = $('<tr>');
                    var td1 = $('<td>').html('Name:');
                    var td2 = $('<td>').html(elem.firstname + ' ' + elem.lastname);
                    $(trName).append(td1, td2);
                    var trUser = $('<tr>');
                    var td3 = $('<td>').html('UserID:');
                    var td4 = $('<td>').html(elem.username);
                    $(trUser).append(td3, td4);
                    var trMail = $('<tr>');
                    var td5 = $('<td>').html('eMail:');
                    var td6 = $('<td>').html(elem.email);
                    var label = $('<label>',{'for':"select"}).html('Select User');
                    var input = $('<input>', {'type': 'checkbox', 'name':'select', 'value': 'true'});
                    $(trMail).append(td5, td6);
                    $(table).append(trName, trUser, trMail);
                    $('#printUsers').append(table, label, input);
                })
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log('AJAX call failed with ', textStatus, errorThrown);
        });
    });




})