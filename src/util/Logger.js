const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path')
const logger_config = require("../../logger-config.json");
const error_file = path.join("./", logger_config.path+"/error.log");
const info_file = path.join("./", logger_config.path+"/info.log");
const DailyRotateFile = require('winston-daily-rotate-file');
console.log(info_file);
let myFormat = printf(({ timestamp, message}) => {
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
            new transports.DailyRotateFile({filename:error_file, level:'error', maxSize: logger_config.maxSize, maxFiles: logger_config.maxSize}),
            new transports.DailyRotateFile({filename:info_file,  maxSize: logger_config.maxSize, maxFiles: logger_config.maxFiles})
        ]
    });
    
}