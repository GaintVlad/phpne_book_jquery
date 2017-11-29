$(function() {
    var persons = [
        {name: 'Vasia Pupkin', phone: '11225587'},
        {name: 'Kolia Tolia', phone: '213545453'},
        {name: 'Ivan Ivanych', phone: '7312468431'},
        {name: 'Petia Tolia', phone: '46546546'}
    ];

    var appendTable = function (i) {
        $('table').append('<tr><td class="name" id="name' + i +'">' + persons[i].name + '</td>'+
            '<td class="phone" id="phone' + i +'">' + persons[i].phone + '</td>'+
            '<td><button type="button" class="remove" data-index="'+ i +'">remove</button></td>'+
            '<td><button type="button" class="edit" data-index="'+ i +'">edit</button></td></tr>');
    }

    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("persons") === null) {
            localStorage.setItem('persons', JSON.stringify(persons));
        } else {
            persons = JSON.parse(localStorage.getItem("persons"));
        }
    } else {
        alert('Sorry! No Web Storage support..');
    }

    for (var i = 0; i < persons.length; i++) {
        appendTable(i);
    }

    $('table').on('click', '.remove', function () {
        persons.splice($(this).data('index'),1);
        $(this).closest('tr').remove();
        localStorage.setItem('persons', JSON.stringify(persons));
    });

    $('table').on('click', '.edit', function () {
        var name = $(this).closest('tr').find('td.name').text();
        var phone = $(this).closest('tr').find('td.phone').text();
        var rowId = $(this).data('index');
        $('input.name').val(name);
        $('input.phone').val(phone);
        $('input.row-id').val(rowId);
        $('button.add').text('Update');
        $('button.add').addClass('update');
        $('button.add').removeClass('add');
    });

    $('body').on('click', '.update', function () {
        var id = $('input.row-id').val();
        persons[id] = {name: $('input.name').val(), phone: $('input.phone').val()};
        localStorage.setItem('persons', JSON.stringify(persons));
        $('td#name'+id).text( $('input.name').val() );
        $('td#phone'+id).text( $('input.phone').val() );
        $('input.name').val("");
        $('input.phone').val("");
        $('input.row-id').val("");
        $('button.update').text('Add');
        $('button.update').addClass('add');
        $('button.update').removeClass('update');
    });

    $('body').on('click', '.add', function () {
        var id = persons.length;
        persons[id] = {name: $('input.name').val(), phone: $('input.phone').val()};
        localStorage.setItem('persons', JSON.stringify(persons));
        appendTable(id);
        $('input.name').val("");
        $('input.phone').val("");
        $('input.row-id').val("");
    });

});