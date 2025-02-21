// Problem 1:
    
//     Using callbacks and the fs module's asynchronous functions, do the following:
//         1. Create a directory of random JSON files
//         2. Delete those files simultaneously 

import fs from "fs";

function createDirectory(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, { recursive: true }, (err) => {
            if (err) {
                reject(err)}
            else {
                resolve()}
        });
    });
}

function createFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                reject(err)}
            else {
                resolve()}
        });
    });
}

function deleteFile(path) {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err) => {
            if (err) {
                reject(err)}
            else {
                resolve()}
        });
    });
}

function creatingRandomJsonFiles(numberOfFiles, folderName) {
    return new Promise((resolve, reject) => {
        let data = [
            { name: "abc", age: 25 },
            { name: "def", age: 35 },
            { name: "ghi", age: 45 },
            { name: "jkl", age: 55 }
        ];

        let filePromises = [];
        for (let i = 0; i < numberOfFiles; i++) {
            let fileName = `${folderName}/${i}.json`;
            filePromises.push(createFile(fileName, JSON.stringify(data, null, 2)));
        }

        Promise.all(filePromises)
            .then(() => {
                console.log("files have been created");
                resolve();
            })
            .catch((err) => {
                reject(err)});
    });
}

function deletingFiles(numberOfFiles, folderName) {
    return new Promise((resolve, reject) => {
        let filePromises = [];
        for (let i = 0; i < numberOfFiles; i++) {
            let fileName = `${folderName}/${i}.json`;
            filePromises.push(deleteFile(fileName));
        }

        Promise.all(filePromises)
            .then(() => {
                console.log("files have been deleted");
                resolve();
            })
            .catch((err) => {
                reject(err)});
    });
}

let path = "./newFolder";
let noOfFilesRequired = 5;

createDirectory(path)
    .then(() => creatingRandomJsonFiles(noOfFilesRequired, path))
    .then(() => deletingFiles(noOfFilesRequired, path))
    .catch((error) => console.error("Error is", error));



