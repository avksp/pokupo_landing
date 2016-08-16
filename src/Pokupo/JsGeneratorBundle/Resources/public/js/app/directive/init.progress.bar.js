function InitProgressBar(count) {
    console.log(count);
    return function (scope, element, attrs) {
        if (scope.$last) {
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var step = $(e.target).data('step');
                var percent = (parseInt(step) / count) * 100;

                $('.progress-bar').css({width: percent + '%'});
                $('.progress-bar').text("Step " + step + " of " + count);
            });
        }
    };
};
