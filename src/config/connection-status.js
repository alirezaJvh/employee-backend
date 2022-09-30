const statuses = [
    {
        status: 'open',
        logMsg: 'Connected to the database.'
    },
    {
        status: 'connected',
        logMsg: 'Connection Established'
    },
    {
        status: 'reconnected',
        logMsg: 'Connection Reestablished'
    },
    {
        status: 'disconnected',
        logMsg: 'Connection Disconnected'
    },
    {
        status: 'close',
        logMsg: 'Connection Closed'
    }, 
    {
        status: 'error',
        logMsg: 'Error'
    }
]

export { statuses }