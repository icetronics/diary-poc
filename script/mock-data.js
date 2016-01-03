var mocks = {
    activityCategories: [
        {
            id: 'general',
            title: 'General',
            headerBackground: '#1B5E20',
            activitiesBackground: '#C8E6C9'
        },
        {
            id: 'anniversaries',
            title: 'Anniversaries',
            headerBackground: '#880E4F',
            activitiesBackground: '#F8BBD0'
        },
        {
            id: 'custom',
            title: 'Custom',
            headerBackground: '#E65100',
            activitiesBackground: '#FFE0B2'
        }
    ],
    activities: [
        {
            id: 'gettogether',
            categoryId: 'general',
            title: 'Get-together',
            fields: [
                {
                    name: 'participants',
                    label: 'Participants',
                    type: 'text'
                },
                {
                    name: 'place',
                    label: 'Place',
                    type: 'text'
                }
            ]
        },
        {
            id: 'exercise',
            categoryId: 'general',
            title: 'Exercise'
        },
        {
            id: 'meal',
            categoryId: 'general',
            title: 'Meal'
        },
        {
            id: 'movie',
            categoryId: 'general',
            title: 'Movie'
        },
        {
            id: 'cinema',
            categoryId: 'general',
            title: 'Cinema'
        },
        {
            id: 'reading',
            categoryId: 'general',
            title: 'Reading'
        },
        {
            id: 'videogame',
            categoryId: 'general',
            title: 'Gaming'
        },
        {
            id: 'appointment',
            categoryId: 'general',
            title: 'Appointment'
        },
        {
            id: 'holiday',
            categoryId: 'general',
            title: 'Holiday'
        },
        {
            id: 'travel',
            categoryId: 'general',
            title: 'Travel'
        },
        {
            id: 'birthday',
            categoryId: 'anniversaries',
            title: 'Birthday',
            isRecurring: true,
            recurrence: 'year'
        },
        {
            id: 'anniversary',
            categoryId: 'anniversaries',
            title: 'Anniversary',
            isRecurring: true,
            recurrence: 'year'
        }
    ],
    activitiesIconMap: {
        gettogether: 'group',
        exercise: 'futbol-o',
        meal: 'cutlery',
        movie: 'film',
        cinema: 'video-camera',
        reading: 'book',
        videogame: 'gamepad',
        holiday: 'sun-o',
        travel: 'plane',
        appointment: 'clock-o',
        birthday: 'gift',
        anniversary: 'birthday-cake'
    },
    myCalendar: {},
    sampleText: "They had to wait for the train from San Francisco to New York. It left at 6 o'clock in the evening. Phileas :Fogg went with Aouda and got a stamp in his passport. :Passepartout bought guns for the railway journey. The :Sioux Indians were dangerous. At 5.45, Phileas :Fogg, Aouda and :Passepartout were at the station. The train was ready. And there was Fix again! Phileas :Fogg couldn't understand it. They all got on the train. The journey time was seven days. Phileas :Fogg wanted to catch a ship from New York to Liverpool on 11th December. On the first day, at about 3 o'clock in the afternoon, :Passepartout looked out of the window and saw some buffaloes. He saw hundreds of the big animals, and then thousands of them. They walked in front of the train and the train had to stop. Some people on the train were angry because the train had to stop on a hot day. They had to sit there and wait. But Phileas :Fogg wasn't angry. He didn't look at his watch. He sat quietly and waited. In three hours, the thousands of buffaloes moved slowly across the railway, and then the train could start again. The next morning, everybody on the train heard the :Sioux Indians. They heard guns and shouts. :Passepartout looked out of the window. The Indians were on fast horses. They wanted to get on the train and take everybody's money. But a lot of people on the train had guns and they fought. A :Sioux Indian killed the train driver. The :Sioux wanted to stop the train but he did not understand the engine. The train went faster, not slower. They were very near the station at Fort Kearney, and there were soldiers there. The people on the train wanted to stop the train at the station. Then the soldiers could help them. Somebody had to get to the engine and stop the train. :Passepartout called, 'I will go!' He climbed out of the window and then climbed under the train to the engine. The Indians didn't see him. Then :Passepartout stopped the engine quite near Fort Kearney. Other people from the train walked to Fort Kearney and talked to the soldiers. The soldiers came back to the train. The :Sioux ran away, but they took three people from the train -with them. :Passepartout was one of the three. Aouda started to cry, but Phileas :Fogg said to her, I'll get him back.' The captain gave Phileas :Fogg thirty soldiers, and they went after the Indians. Fix wanted to go with Phileas :Fogg, but Phileas :Fogg said, 'Please stay here and look after Aouda.' He walked away, and Aouda watched him. It started to snow. More and more snow fell out of a dark sky. Phileas :Fogg and the thirty soldiers did not come back that day or the next night. Fix and Aouda waited at Fort Kearney, but the train left without them. The next morning, Fix, Aouda and the soldiers at Fort Kearney heard a shout. The thirty soldiers were back with Phileas :Fogg, :Passepartout and the two other people from the train. 'The train left without us,' Fix told Phileas :Fogg.' The next train is this evening.' But that was too late. Phileas :Fogg was now twenty hours behind his timetable. They could not arrive in New York by train before their ship, the China, left."
};
