
const fs = require('fs');
const util = require('util');

const wordcount = require('wordcount');
const configFilePaths = 'config.json';



const readFile = util.promisify(fs.readFile);

async function readFileAsync(filePath) {
  try {
      const content = await readFile(filePath, 'utf8');
      return content;
  } catch (err) {
      console.log(err);
      throw err; 
  }
}

async function processFile(filePath) {
  try{
      const content = await readFileAsync(filePath);
      const wordCount = wordcount(content);
  
      return `${filePath}: ${wordCount} words`;
  }catch (error) {
      return `${filePath}: Error - ${error.message}`;
  }
}


async function processFilesAsync(configFilePath) {
  try {
    const configContent = await readFileAsync(configFilePath);
    const config = JSON.parse(configContent);
    const filePaths = config.files;

    for (const filePath of filePaths) {
      const result = await processFile(filePath);
      console.log(result);
    }  
  } catch (error) {
    console.error(error.message);
  }
}

processFilesAsync(configFilePaths);
