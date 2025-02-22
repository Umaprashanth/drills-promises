/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/


import fs from "fs";

function readingFile(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err,data) => {
            if (err) {
                reject(err.message)
                return 
            }
            resolve(data)
        })
    })
}

function writingFile(path,data,message){
    return new Promise ((resolve,reject) =>{
        fs.writeFile(path, data, (err)=>{
            if (err){
                reject(err.message)
                return
            }
            resolve(message)
        })
    })
}

function appendingFile(path,data,message){
    return new Promise ((resolve,reject)=>{
        fs.appendFile(path,data, (err)=>{
            if (err){
                reject(err.message)
                return
            }
            resolve(message)
        })
    })
}

function deleteFiles(path){
    return new Promise((resolve,reject)=>{
        fs.unlink(path,(err)=>{
            if (err){
                reject(err.message)
                return
            }
            resolve("files has been deleted")
        })      
    })
}

function convertingToUpper(data){
    return new Promise((resolve,reject)=>{
        writingFile('./filenames.txt', './upperCaseData.txt','Storing the name of the file in filenames.txt').then((data)=>{
            console.log(data);
            data = data.toUpperCase()
            return writingFile('./upperCaseData.txt', data, 'storing the uppercase data into file')   
        }).then((data)=>{
            resolve(data)
        }).catch((error)=>{
            reject(error)
        })
    })
}

function convertingToLower(){

    return readingFile('./upperCaseData.txt')
            .then((upperCaseData)=>{
                let lowerCaseData = upperCaseData.toLowerCase()
                let sentences = lowerCaseData.split('. ').filter(Boolean).join('\n')

                let appendPromise = appendingFile('./filenames.txt','\n./splitContent.txt', 'appending the splitContent file name to filenames.txt')
                let writePromise = writingFile('./splitContent.txt', sentences, 'writing the split contents to splitContent.txt')

                return Promise.all([appendPromise,writePromise])
            }).then(() =>{
                return "lower case conversion is completed"
            })
}


function sortText(){
    return new Promise((resolve,reject) =>{
        Promise.all([

            readingFile("./splitContent.txt"),
            readingFile('./upperCaseData.txt')

        ]).then(([splitData, upperCase]) =>{
            let combined = `${splitData} , ${upperCase}`

            let combinedData = combined.split(' ').sort().join('\n')

            let appendPromise = appendingFile('./filenames.txt','\n./combined.txt','adding combined filename')

            let writePromise = writingFile('./combined.txt',combinedData,'adding content to combined.txt')

            return Promise.all([appendPromise,writePromise])
        }).then(([appendPromise,writePromise])=>{
            console.log(appendPromise)
            resolve(writePromise)
            
        }).catch((err)=>{
            reject(err.message)
        })
    })
}

function deletingFiles(){
    return new Promise((resolve,reject)=>{

        readingFile('./filenames.txt').then((data)=>{
            
            let filenames = data.split('\n').filter(Boolean)
            let count = 0
            for(let ele of filenames){
                deleteFiles(`./${ele}`).then( (data) => {
                    console.log(`${ele}`,data);
                    count++;
                    if(count == filenames.length){
                        resolve('All deleted all files');
                    }
                }).catch( (err)=>{
                    reject(err);
                })
            }
        }).catch( (err)=>{
            reject(err);
        })
    })
}


readingFile('./lipsum.txt')
    .then((data) =>{
        console.log("lipsum file read");
        return convertingToUpper(data)
    })
    .then((data)=>{
        console.log(data);
        return convertingToLower()
    })
    .then((data)=>{
        console.log(data)
        return sortText()
    })
    .then(()=>{
        return deletingFiles()
    })
    .catch((error)=>{
        console.log(error);
    })