import * as winston from 'winston';
import * as moment from 'moment';

const { transports } = winston;
const { combine, printf, timestamp, colorize } = winston.format;

const myFormat = printf(({ message, level, timestamp }) => {
    let length = 9;
    let rx = level.match(/debug|error|info|warn|silly|verbose/)[0];

    if (!rx) rx = 'INFO';
    level = level.replace(rx, rx.toUpperCase());

    let freeSpace = length - rx.length;
    let before = ' '.repeat(freeSpace / 2), after = ' '.repeat(freeSpace / 2);

    return `[${ before }${ level }${ after }]${ !(rx.length % 2) ? ' ' : '' } - ${ moment(timestamp).format('YYYY-MM-DD hh:mm:ss') } : ${ message }`;
});

const logger = winston.createLogger({
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

export { logger };
