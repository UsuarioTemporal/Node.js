const fs = require('fs')
const fetch = require('node-fetch')
const colors = require('colors')
let arrToDo = []

const saveDB = ()=>{
    return new Promise((resolve,reject)=>{
        let data =JSON.stringify(arrToDo)
        fs.writeFile('db/data.json',data,err=>{
            if(err) return reject(err)
            return resolve(data)
        })
    })
}

const loadingDB = ()=>{
    try {
        arrToDo = require('../db/data.json')
    } catch{
        arrToDo = []
    }
}
const create = (description,complete)=>{
    loadingDB()
    
    let toDo = {
        description,
        complete
    }
    arrToDo.push(toDo)
    saveDB().then(result=>console.log(result.green))
            .catch(err=>console.log(err.red))
    return toDo
}
const toList = ()=>{
    loadingDB()
    if(arrToDo.length) return arrToDo
    return `Array vacio`.red
}

const update = (description,complete)=>{
    loadingDB()
    let index = arrToDo.findIndex(task=>task.description===description)
    if(index<0) return console.log('No existe'.red)
    arrToDo[index].complete=complete
    saveDB()
    return console.log('Actualizado'.green)
}
const deleteElement = (description)=>{
    loadingDB()
    let index = arrToDo.findIndex(task=>task.description===description)
    if(index<0) return console.log('No existe'.red)
    arrToDo.splice(index,1)
    saveDB()
    return console.log('Elimiando'.green)
}
const toListOf=(complete)=>{
    loadingDB()
    arrToDo.forEach(task=>{
        if(task.complete===complete) return console.log(task);
    })
}
module.exports = {
    create,
    toList,
    update,
    deleteElement,
    toListOf
}