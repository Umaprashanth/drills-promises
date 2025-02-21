
import { appendFile, writeFile } from "fs"
import fs from "fs/promises"

function createFile(path,data){
    return fs.writeFile(path,data)
}

function readingFile(path){
    return fs.readFile(path,"utf-8")
}

function deleteFile(path){
    return fs.unlink(path)
}

function appendingFile(path,data){
    return fs.appendFile(path,data)
}

function writingFile(path,data){
    return fs.writeFile(path,data)
}

function convertingToUpper(data,fileName){
    return Promise.allSettled([
        fs.writeFile(fileName, data.toUpperCase()),
        fs.writeFile("./filenames.txt",fileName)
    ])
}

function convertingToLower(){
    return readingFile('./upperCase.txt').then((data) => {
        const sentences = data.toLocaleLowerCase().split('. ').filter((ele)=>ele.length >0).join('\n')
        writingFile('./lowerCase.txt',sentences)
        .then(()=>{
            return appendingFile('./filenames.txt', '\n./lowerCase.txt')
        })
    })
}


function sortText(){
    return readingFile("./lowerCase.txt").then((data)=>{
        
        const sortedText = data.split(' ').filter((ele)=>ele.length >0).join('\n')
        return writingFile('./sorted.txt', sortedText).then(()=>{
            appendingFile('./filenames.txt',"\n./sorted.txt")
        })
    })
}

function deletingFiles(){
    return readingFile('./filenames.txt').then((data)=>{
        data = data.split('\n').filter((ele)=> ele.length >0)
        for (let i = 0; i<data.length; i++){
            deleteFile(`./${data[i]}`).then(()=>{
                console.log(`${data[i]} file has been deleted`)
            })
        }
    })
}

let filePath = "./upperCase.txt"


readingFile("./lipsum.txt")
.then((data)=> {
    console.log('creating the upperCaseData.txt');
    return convertingToUpper(data,filePath)
})
.then(()=> convertingToLower())
.then(()=> sortText())
.then(()=> deletingFiles())
.catch((error)=> console.log(error.message))