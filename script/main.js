$(function() {

    var cal = $('#calendar').calendario({
            onDayClick: function ($el, $contentEl, dateProperties) {

            }}),
        $month = $('#custom-month').html(cal.getMonthName()),
        $year = $('#custom-year').html(cal.getYear());

    $( '#custom-next' ).on( 'click', function() {
        cal.gotoNextMonth( updateMonthYear );
    } );
    $( '#custom-prev' ).on( 'click', function() {
        cal.gotoPreviousMonth( updateMonthYear );
    } );
    $( '#custom-current' ).on( 'click', function() {
        cal.gotoNow( updateMonthYear );
    } );

    function updateMonthYear() {
        $month.html( cal.getMonthName() );
        $year.html( cal.getYear() );
        refreshCalendar();
    }

    interact('.draggable').draggable({
        onmove: dragMoveListener
    });

    function dragMoveListener (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    interact('.dropzone').dropzone({
        overlap: 0.25,

        ondropactivate: function (event) {
            event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
            event.target.classList.add('drop-target');
        },
        ondragleave: function (event) {
            event.target.classList.remove('drop-target');
        },
        ondrop: function (event) {
            var day = $(event.target).data('day');
            var activity = $(event.relatedTarget).data('activity-id');
            addActivity(day, activity);
            refreshCalendar();
        },
        ondropdeactivate: function (event) {
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
            setTimeout(resetActivityPosition, 50);
        }
    });

    _.forEach(mocks.activities, function (act) {
        $('.activities').append('<div title="' + act.title + '" data-activity-id="' + act.id + '" class="activity draggable drag-drop"><i class="fa fa-' + mocks.activitiesIconMap[act.id] + '"></i></div>');
    });

    function resetActivityPosition () {
        $('.activity.draggable').css('transform', 'translate(0, 0)');
        $('.activity.draggable').removeAttr('data-x');
        $('.activity.draggable').removeAttr('data-y');
    }

    function addActivity (day, activity) {
        if (!mocks.myCalendar[day]) {
            mocks.myCalendar[day] = {
                activities: []
                // diary entry, color, type, etc
            };
        }

        mocks.myCalendar[day].activities.push(activity);
    }

    function refreshCalendar () {
        $.each($('.day-activities-container'), function (index, containerElement) {
            $(containerElement).empty();
            var day = $(containerElement).data('day');
            if (mocks.myCalendar[day] && mocks.myCalendar[day].activities.length) {
                _.forEach(mocks.myCalendar[day].activities, function (dayActivity) {
                    $(containerElement).append('<div class="activity"><i class="fa fa-' + mocks.activitiesIconMap[dayActivity] + '"></i></div>');
                });
            }
        });
    }
});