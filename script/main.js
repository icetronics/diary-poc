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

    interact('.droparea').dropzone({
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
            var day = $(event.target).closest('.day').data('day');
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
            };
        }

        if (!mocks.myCalendar[day].activities) {
            mocks.myCalendar[day].activities = [];
        }

        mocks.myCalendar[day].activities.push(activity);
    }

    function refreshCalendar () {
        $.each($('.day'), function (index, dayCell) {
            var day = $(dayCell).data('day');

            var entryContainer = $(dayCell).find('.day-diary-entry-container');
            entryContainer.empty();
            if (mocks.myCalendar[day] && mocks.myCalendar[day].entry) {
                entryContainer.html(mocks.myCalendar[day].entry);
            }

            var activitiesContainer = $(dayCell).find('.day-activities-container');
            activitiesContainer.empty();
            if (mocks.myCalendar[day] && mocks.myCalendar[day].activities) {
                _.forEach(mocks.myCalendar[day].activities, function (dayActivity) {
                    $(activitiesContainer).append('<div class="activity"><i class="fa fa-' + mocks.activitiesIconMap[dayActivity] + '"></i></div>');
                });
            }
        });
    }

    refreshCalendar();

    $('.day-diary-entry-container').zoomTarget({
        targetsize: 0.4,
        duration: 300,
        easing: 'ease-in-out',
        closeclick: false,
        animationendcallback: function () {
            if (zoomedEntry && zoomedEntry.hasClass('expanded')) {
                entryZoomOut(zoomedEntry);
            }
        }});

    $('.day-diary-entry-container').on('click', function (e) {
        var entry = $(e.target);
        if (!entry.hasClass('expanded')) {
            entryZoomIn(entry);
        }
    });
});

var zoomedEntry = null,
    zoomedIn = false,
    zoomingInProgress = false;

function entryZoomIn (entry) {
    if (zoomingInProgress) return;
    zoomingInProgress = true;
    entry.animate({
        width: '+=130px',
        height: '+=40%',
        top: '-=40px',
        left: '-=50px',
        fontSize: '-=4pt'
    }, 350, function () {
        entry.addClass('expanded');
        zoomedEntry = entry;
        zoomedIn = true;
        zoomingInProgress = false;
        enableEditor(entry);
    });
}

function entryZoomOut (entry) {
    if (zoomingInProgress) return;
    if (!entry) entry = $('.day-diary-entry-container.expanded');
    if (!entry.length) return;
    zoomingInProgress = true;
    entry.animate({
        width: '-=130px',
        height: '-=40%',
        top: '+=40px',
        left: '+=50px',
        paddingTop: '-=40px',
        fontSize: '+=4pt',
        cursor: 'hand'
    }, 350, function () {
        entry.removeClass('expanded');
        zoomedEntry = null;
        zoomedIn = false;
        zoomingInProgress = false;
        disableEditor(entry);
    });
}

function enableEditor (entry) {
    entry.css('cursor', 'text');
    entry.css('overflow', 'auto');
    entry.attr('contenteditable', 'true');
    entry.attr('spellcheck', 'false');
    //entry.siblings('.file-dropzone').show();
}

function disableEditor (entry) {
    entry.css('cursor', 'pointer');
    entry.css('overflow', 'hidden');
    entry.removeAttr('contenteditable');
    //entry.siblings('.file-dropzone').hide();
}