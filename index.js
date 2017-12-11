const moment = require('moment');
module.exports.templateTags = [{
    name: 'customTimestamp',
    displayName: 'Custom Timestamp',
    description: 'Create a custom timestamp in insomnia rest client',
    args: [
        {
            displayName: 'Type',
            type: 'enum',
            options: [{
                displayName: 'Specific date (eg. 2018/01/01 00:00:00)',
                value: 'specific'
            },
            {
                displayName: 'Add time to now (eg. +2days 2hours from now)',
                value: 'add'
            }]
        },
        {
            displayName: 'Year/s',
            type: 'string'
        },
        {
            displayName: 'Month/s',
            type: 'string'
        },
        {
            displayName: 'Day/s',
            type: 'string'
        },
        {
            displayName: 'Hour/s',
            type: 'string'
        },
        {
            displayName: 'Minute/s',
            type: 'string'
        },
        {
            displayName: 'Second/s',
            type: 'string'
        },
        {
            displayName: 'Millisecond/s',
            type: 'string'
        },
        {
            displayName: 'Timestamp Format',
            type: 'enum',
            options: [{
                    displayName: 'ISO-8601',
                    value: 'iso-8601'
                },
                {
                    displayName: 'Milliseconds',
                    value: 'millis'
                },
                {
                    displayName: 'Unix',
                    value: 'unix'
                },
                {
                    displayName: 'Custom Format',
                    value: 'custom'
                }
            ]
        },
        {
            help: 'moment.js format string',
            displayName: 'Custom Format Template',
            type: 'string',
            placeholder: 'MMMM Do YYYY, h:mm:ss a',
            hide: args => args[8].value !== 'custom'
        }
    ],
    async run(context, type = 'specific', years = false, months = false, days = false, hours = false, minutes = false, seconds = false, milliseconds = false, dateType = 'iso-8601', formatStr = '') {
        var customDate = new Date();

        switch (type) {
            case 'specific':
                if (milliseconds) {
                    customDate.setMilliseconds(milliseconds);
                }
                if (seconds) {
                    customDate.setSeconds(seconds);
                }
                if (minutes) {
                    customDate.setMinutes(minutes);
                }
                if (hours) {
                    customDate.setHours(hours);
                }
                if (days) {
                    customDate.setDate(days);
                }
                if (months) {
                    customDate.setMonth((months) - 1);
                }
                if (years) {
                    customDate.setFullYear(years);
                }
                break;
            case 'add':
                if (milliseconds) {
                    customDate.setMilliseconds(customDate.getMilliseconds() + parseInt(milliseconds));
                }
                if (seconds) {
                    customDate.setSeconds(customDate.getSeconds() + parseInt(seconds));
                }
                if (minutes) {
                    customDate.setMinutes(customDate.getMinutes() + parseInt(minutes));
                }
                if (hours) {
                    customDate.setHours(customDate.getHours() + parseInt(hours));
                }
                if (days) {
                    customDate.setDate(customDate.getDate() + parseInt(days));
                }
                if (months) {
                    customDate.setMonth(customDate.getMonth() + parseInt(months));
                }
                if (years) {
                    customDate.setFullYear(customDate.getFullYear() + parseInt(years));
                }
                break;
        }

        if (typeof dateType === 'string') {
            dateType = dateType.toLowerCase();
        }

        switch (dateType) {
            case 'millis':
            case 'ms':
                return customDate.getTime() + '';
            case 'unix':
            case 'seconds':
            case 's':
                return Math.round(customDate.getTime() / 1000) + '';
            case 'iso-8601':
                return customDate.toISOString();
            case 'custom':
                return moment(customDate).format(formatStr);
            default:
                throw new Error(`Invalid date type "${dateType}"`);
        }
    }
}];
