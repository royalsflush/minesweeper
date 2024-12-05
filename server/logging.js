import winston from 'winston';

// Add severity label for Stackdriver log parsing
const addSeverity = winston.format(info => {
  info.severity = info.level;
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    addSeverity(),
    winston.format.timestamp(),
    winston.format.json()
    // format.prettyPrint(), // Uncomment for local debugging
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
