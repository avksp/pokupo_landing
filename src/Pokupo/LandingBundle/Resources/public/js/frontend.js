var Frontend = {
    Print: function (id) {
        var w = window.open();
        var doc = $('#' + id).clone();
        doc.find('footer').hide();
        w.document.write(doc.html());
        w.print();
        w.close();
    }
}