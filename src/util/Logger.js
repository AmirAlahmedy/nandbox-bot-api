const winston = require('winston');

module.exports = Logger = () =>  {
   
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            // new winston.transports.Console(),
            new winston.transports.File({filename:'../logs/error.log', level:'error'}),
            new winston.transports.File({filename:'./info.log'})
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