let inquirer = require('inquirer');
let fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');


function getLicense() {
    let reqUrl = 'https://api.github.com/licenses';
    let licenseArr = [];
    fetch(reqUrl)
    .then(response => {
        if (!response.ok) {
            return ('error fetching data');
        }
        return response.json();
    })
    .then(data => {
        for (let i = 0;i < data.length; i++) {
            let license = data[i];
            // console.log(license)
            let licenseInfo = license.spdx_id;
            licenseArr.push(licenseInfo)
        }
        return licenseArr
    })
    return licenseArr
}


function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log("Error!", err)
        } else {
            console.log("ReadME successfully created");
        }
    })
}

function init() {
    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Give a brief description of your project'
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Are there any special installation instructions?'
        },
        {
            type: 'input',
            name: 'applicationUsage',
            message: 'how do you use your application?'
        },
        {
            type: 'input',
            name: 'contributionGuidlines',
            message: 'How can developers contribute to the project?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'how can a user test this application'
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Which license are you going to use?',
            choices: getLicense()
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        }
    ];
    inquirer
        .prompt(questions)
        .then((answers) => {
            const readMeContent = generateMarkdown(answers);
            const fileName = 'README.md';

            writeToFile(fileName, readMeContent);
        })
}

init();