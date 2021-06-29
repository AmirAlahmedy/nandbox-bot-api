const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const path = require('path')
const logger_config = require("../../logger-config.json");
let error_file = path.join("./", logger_config.path+"/error.log");
let info_file = path.join("./", logger_config.path+"/info.log");
const DailyRotateFile = require('winston-daily-rotate-file');

console.log(info_file);

let myFormat = printf(({ timestamp, message}) => {
    return `${timestamp}: ${message}`;
  });

 
module.exports = class Logger {

    constructor(level, maxFiles, maxSize) {
      this.level = level;
      this.maxFiles = maxFiles;
      this.maxSize = maxSize
    }

    static logger = createLogger({
        level: this.level,
        format: combine(
            timestamp(),
            myFormat
          ),
        transports: [
            new transports.DailyRotateFile({
              filename: error_file, 
              level:'error', 
              maxSize: this.maxSize ? this.maxSize:logger_config.maxSize, 
              maxFiles: this.maxFiles ? this.maxFiles:logger_config.maxFiles
            }),
            new transports.DailyRotateFile({
              filename: info_file,  
              maxSize: this.maxSize ? this.maxSize:logger_config.maxSize, 
              maxFiles: this.maxFiles ? this.maxFiles:logger_config.maxFiles
            })
        ]
    });
    
}
