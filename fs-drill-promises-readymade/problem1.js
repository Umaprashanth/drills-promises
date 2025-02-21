import fs from "fs/promises"

function createDirectory(path){
    return fs.mkdir(path,{recursive:true})
}

function createFile(path,data){
    return fs.writeFile(path,data)
}

function deleteFile(path){
    return fs.unlink(path)
}


function creatingRandomJsonFiles(numberOfFiles, folderName){

    let data = [
        { name : "abc", age : 25 },
        { name : "def", age : 35 },
        { name : "ghi", age : 45 },
        { name : "jkl", age : 55 }
    ]

    let filePromises = []

    let fileCount = 0

    for (let files = 0; files<numberOfFiles ; files++ ){

        let fileName = folderName + "/" + files + ".json"
        

        filePromises.push(createFile(fileName, JSON.stringify(data,null,2)))
    }

    return Promise.all(filePromises).then(()=> {
        console.log('All the files has been created')
        return folderName
    })
}

function deletingFiles(numberOfFiles, folderName){

    let filePromises = []
    for (let files = 0; files<numberOfFiles ; files++){
        let fileName = folderName + "/" + files + ".json"

        
        filePromises.push(deleteFile(fileName))
    }
    return Promise.all(filePromises).then(()=> {
        console.log("All the files has been deleted");
        
    })
}

let path = "./newFolder"

let noOfFilesRequired = 5

createDirectory(path)
.then(()=>{
    return creatingRandomJsonFiles(noOfFilesRequired, path)
})
.then((path)=>{
    return deletingFiles(noOfFilesRequired,path)
})
.catch((error) => console.log(error.message))
