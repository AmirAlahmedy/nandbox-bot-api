const winston = require('winston');
const path = require('path')
const error_file = path.join(__dirname, '../logs/error.log');
const info_file = path.join(__dirname, '../logs/info.log');

module.exports = class Logger {
   
    static logger = winston.createLogger({
        level: 'info',
        transports: [
            // new winston.transports.Console(),
            new winston.transports.File({filename:error_file, level:'error'}),
            new winston.transports.File({filename:info_file})
        ]
    });
    
    
    // const DailyRotateFile = require('winston-daily-rotate-file');
    // logger.configure({
    //     level: 'verbose',
    //     transports:[
    //         new DailyRotateFile()
    //     ]
    // })
}