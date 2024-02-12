class Logger {
    async logToReport(message) {
        await process.emit('test:log', message);
    }
}

module.exports = new Logger();