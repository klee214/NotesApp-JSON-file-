const fs = require("fs")
const chalk = require('chalk')

const getNotes = ()=>{
    return "your notes"
};

//adding method
const addNote = (title, content)=>{
    const notes = loadNotes();
    const duplicateNote = notes.find((note)=>note.title===title);
    //const duplicateNotes = notes.filter((note)=>note.title === title)
    
    if(!duplicateNote){
        notes.push({
            title:title,
            content:content
        }) 
        saveNotes(notes)
        console.log("new notes add")
    }else{
        console.log("notes title taken")
    }
}

//writing a notes
const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",dataJSON)
}

//reading a notes
const loadNotes=()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON =dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return []
    }
}

//remove a note
const removeNotes = (title)=>{
    const notes = loadNotes()
    const noteToKeep = notes.filter(note => note.title !== title);

    if(noteToKeep.length === notes.length){
        console.log(chalk.bgRed("remove fail!"))
    }else{
        saveNotes(noteToKeep);
        console.log(chalk.bgGreen("remove success!"));
    }
}

//list all notes title
const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.bgGreen("your notes:"))
    return notes;
}

const readNotes =(title)=>{
    const notes = loadNotes();
    const findNote = notes.find(note=>note.title===title)

    if(findNote){
        console.log(chalk.bgGreen(findNote.title));
        console.log(findNote.content);
    }else{
        console.log(chalk.bgRed("no match"));
    }
}

//exports all method
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes:listNotes,
    readNotes:readNotes
}