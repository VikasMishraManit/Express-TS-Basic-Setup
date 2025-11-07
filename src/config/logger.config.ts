import winston from "winston";

const logger = winston.createLogger({
    // define the format
      format: winston.format.combine(
        winston.format.timestamp({format : "MM-DD-YYYY HH:mm:ss"}),
        winston.format.json(),
        // define the custom print
        winston.format.printf(({level,message,timestamp,...data})=>{
         const output = {level,message,timestamp,data};
         return JSON.stringify(output);
        })
      ),

      // define the transport 
      transports : [
        new winston.transports.Console(),
      ]
});

export default logger;