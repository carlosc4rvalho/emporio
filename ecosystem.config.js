module.exports = {
    apps: [
        {
            name: 'emporiomaziero_frontend',
            script: 'npm',
            args: 'start',
            cwd: './frontend',
            instances: 1,
            max_memory_restart: '1G',
            kill_timeout: 5000,
            exec_mode: 'cluster',
            watch: ['build'],
            watch_options: {
                followSymlinks: false
            },
            env: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'emporiomaziero_backend',
            script: 'npm',
            args: 'start',
            cwd: './backend',
            instances: 1,
            max_memory_restart: '1G',
            kill_timeout: 5000,
            exec_mode: 'cluster',
            watch: ['build'],
            watch_options: {
                followSymlinks: false
            },
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};  