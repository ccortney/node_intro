const fs = require('fs');
const process = require('process');
const axios = require('axios');
const path = require('path');

function cat(path, file) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error Reading ${path}: ${err}`)
            process.exit(1);
        }
        else {
            handleOutput(data, file);
        }
    })
}

async function webCat(url, file) {
    try {
        let res = await axios.get(url);
        handleOutput(res.data, file);
    }
    catch (err) {
        console.error(`Error Reading ${url}: ${err}`)
        process.exit(1);
    }
}

function handleOutput(text, file) {
    if (file) {
        fs.writeFile(file, text, 'utf8', function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            } 
                  
        })
    }
    else {
        console.log(text);
    }
}

let file = null;
let path2 = null;

if (process.argv[2] === "--out") {
    path2 = process.argv[4];
    file = process.argv[3];
}
else {
    path2 = process.argv[2];
}

if (path2.slice(0, 4) === "http") {
    webCat(path2, file);
}
else {
    cat(path2, file);
}