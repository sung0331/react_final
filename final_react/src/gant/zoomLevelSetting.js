const initLevels = {
    levels: [
        {
            name: '시간단위',
            scale_height: 60,
            min_column_width: 30,
            scales: [
                { unit: 'day', step: 1, format: '%M %d일' },
                { unit: 'hour', step: 1, format: '%H' }
            ]
        },
        {
            name: '날짜단위',
            scale_height: 60,
            min_column_width: 70,
            scales: [
                { unit: 'week', step: 1, format: 'Week %W주' },
                { unit: 'day', step: 1, format: '%M %d일' }
            ]
        },
                  {
            name: '월단위',
            scale_height: 60,
            min_column_width: 70,
            scales: [
                { unit: "month", step: 1, format: '%F' },
                { unit: 'week', step: 1, format: '%W주' }
            ]
        }
    ]
}

export default initLevels