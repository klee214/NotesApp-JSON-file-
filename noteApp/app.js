const chalk = require('chalk');
const yargs = require('yargs')
const notes = require('./notes.js');

yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder:{
        content:{
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        },
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.content);
    }
})

yargs.command({
    command:'remove',
    describe:'Removing a note',
    builder: {
        title: {
            describe: "remove note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command:'list',
    describe:'Listing a note',
    handler(){
        notes.listNotes().forEach(element => {
            console.log(element.title);
        });
    }
})

yargs.command({
    command:'read',
    describe:'Reading a note',
    handler(argv){
        notes.readNotes(argv.title);
    }
})

yargs.parse();
