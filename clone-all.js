const fs = require('fs');
var dir = './cloned-repos';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const { execSync } = require("child_process");

execSync("git clone https://github.com/PracticaDS/pdes-tp-backend-waynes-tech cloned-repos/factory-backend")
execSync("git clone https://github.com/PracticaDS/pdes-tp-waynes-tech cloned-repos/factory-frontend")