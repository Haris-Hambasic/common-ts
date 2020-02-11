import winston from 'winston'

interface LoggerOptions {
  appName: string
}

export const createLogger = (options: LoggerOptions) => {
  let loggerColorizer = winston.format.colorize()

  let loggerTransport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      loggerColorizer,
      winston.format.ms(),
      winston.format.printf((args: any) => {
        let { level, message, component, timestamp, ms } = args
        return `${timestamp} ${loggerColorizer.colorize(
          'debug',
          ms,
        )} ${level} ${component} → ${message}`
      }),
    ),
  })

  let rootLogger = winston.createLogger({
    level: 'debug',
    transports: [loggerTransport],
  })

  return rootLogger.child({ component: options.appName })
}
