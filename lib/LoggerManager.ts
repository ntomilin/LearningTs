import * as winston from 'winston';
import * as moment from 'moment';

const { transports } = winston;
const { combine, printf, timestamp, colorize } = winston.format;

const myFormat = printf(({ message, level, time }) => {
    const length = 9;
    let rx = level.match(/debug|error|info|warn|silly|verbose/)[0];

    if (!rx) {
        rx = 'INFO';
    }
    level = level.replace(rx, rx.toUpperCase());

    const freeSpace = length - rx.length;
    const before = ' '.repeat(freeSpace / 2);
    const after = ' '.repeat(freeSpace / 2);

    if (typeof message === 'object') {
        message = JSON.stringify(message);
    }

    return `[${ before }${ level }${ after }]${ !(rx.length % 2) ? ' ' : '' } -` +
        ` ${ moment(time).format('YYYY-MM-DD HH:mm:ss') } : ${ message }`;
});

const Logger = winston.createLogger({
    level: 'silly',
    format: combine(
        colorize(),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.txt', level: 'error' }),
        new transports.File({ filename: 'info.txt', level: 'silly' })
    ]
});

export { Logger };
