const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path')
const error_file = path.join(__dirname, '../logs/error.log');
const info_file = path.join(__dirname, '../logs/info.log');
const DailyRotateFile = require('winston-daily-rotate-file');

myFormat = printf(({ timestamp, message}) => {
    return `${timestamp}: ${message}`;
  });

module.exports = class Logger {

  
   
    static logger = createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            myFormat
          ),
        transports: [
            // new winston.transports.Console(),
            new transports.DailyRotateFile({filename:error_file, level:'error', maxSize: '20m', maxFiles: '14d'}),
            new transports.DailyRotateFile({filename:info_file,  maxSize: '20m', maxFiles: '14d'})
        ]
    });
    
}