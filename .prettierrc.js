const fabric = require('@umijs/fabric');

module.exports = {
    ...fabric.prettier,
    printWidth: 120,
    tabWidth: 4,
    trailingComma: 'none'
};
