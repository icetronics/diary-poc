$(function() {

    var cal = $('#calendar').calendario(),
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

    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    var text = mocks.sampleText.split('.');
    for (var i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        var ri = Math.floor(Math.random() * (text.length + 1));
        var rx = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        var entry = '';
        for (var j = ri; j <= ri + rx; j++) {
            if (text[j]) entry += text[j] + '.';
        }

        mocks.myCalendar[y + '-' + (m+1) + '-' + i] = {
            entry: entry
        };
    }

    _.forEach(mocks.activityCategories, function (category) {
        $('.activities').append('<div class="category" data-category="' + category.id + '"></div>');
    })

    _.forEach(mocks.activities, function (act) {
        $('.activities').find('.category[data-category="' + act.categoryId + '"]').append('<div title="' + act.title + '" data-activity-id="' + act.id + '" class="activity draggable drag-drop"><i class="fa fa-' + mocks.activitiesIconMap[act.id] + '"></i></div>');
    });

    $('.activities .activity').qtip({
        content: {
            attr: 'title'
        },
        position: {
            my: 'left center',
            at: 'right center'
        }
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
                var entry = mocks.myCalendar[day].entry;
                var actors = entry.match(/:\w+/g);
                mocks.myCalendar[day].actors = [];
                if (actors && actors.length) {
                    mocks.myCalendar[day].actors = actors.map(function (actor) {
                        return actor.substr(1);
                    }).filter(function (value, index, self) {
                        return self.indexOf(value) === index;
                    });
                }

                entryContainer.html(entry);
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

    var dayModal = $('[data-remodal-id="dayModal"]').remodal();

    $('.day').on('click', function () {
        var day = $(this).data('day');
        var modalContent = $('.modal-content');
        modalContent.find('.day').text(day);

        modalContent.find('.text-entry').empty();
        if (mocks.myCalendar[day] && mocks.myCalendar[day].entry) {
            modalContent.find('.text-entry').html(mocks.myCalendar[day].entry);
        }

        modalContent.find('.text-entry').hallo({
            plugins: {
                halloformat: {},
                halloheadings: {},
                hallolists: {},
                halloreundo: {}
            }
        });

        modalContent.find('.day-activities-container').empty();
        if (mocks.myCalendar[day] && mocks.myCalendar[day].activities) {
            _.forEach(mocks.myCalendar[day].activities, function (dayActivity) {
                modalContent.find('.day-activities-container').append('<div class="activity"><i class="fa fa-' + mocks.activitiesIconMap[dayActivity] + '"></i></div>');
            });
        }

        var actorsIcon = modalContent.find('.actors>i');
        actorsIcon.show();
        if (mocks.myCalendar[day].actors && mocks.myCalendar[day].actors.length) {
            actorsIcon.qtip({
                content: mocks.myCalendar[day].actors.join('<br />'),
                position: {
                    my: 'bottom center',
                    at: 'top center',
                    target: actorsIcon
                }
            });
        }
        else {
            actorsIcon.hide();
        }

        dayModal.open();

        modalContent.find('.text-entry').focus();
    });

    $(document).on('confirmation', '.remodal', function (e) {
        var day = $(e.target).find('.day').text();
        mocks.myCalendar[day].entry = $(e.target).find('.text-entry').html();
        refreshCalendar();
    });

    $('#search').on('keypress', function (e) {
        if (e.keyCode === 13) {
            var searchTerm = $(this).val();
            $('.day-diary-entry-container').each(function (i, e) {
                $(e).parent().removeClass('highlight');
                if ($(e).text().indexOf(searchTerm) > -1) {
                    $(e).parent().addClass('highlight');
                }
            })
        }
    });

    $('#clearSearch').on('click', function () {
        $('.day.highlight').removeClass('highlight');
        $('#search').val('');
    });

    refreshCalendar();
});
