#!/usr/bin/env node

const updater = require('./lyrica-update');

function helpAndExit() {
    console.log();
    console.log('  Usage: lyrica <command>');
    console.log();
    console.log('  Commands:');
    console.log();
    console.log('    update           Update config.json by fetching metadata from cloud.');
    process.exit(1);
}

if (process.argv[2]) {
    switch (process.argv[2]) {
        case 'update':
            updater.run();
            break;
        default:
            helpAndExit();
    }
}
else {
    helpAndExit();
}