const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = () => {
 if(PHASE_DEVELOPMENT_SERVER){
    return {
        env: {
            mongodb_username: 'thiago_040404',
            mongodb_password: 'ymZr4TVJNkTcooTc',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'chores-dev',
        },
    };
 }
    return {
        env: {
            mongodb_username: 'thiago_040404',
            mongodb_password: 'ymZr4TVJNkTcooTc',
            mongodb_clustername: 'cluster0',
            mongodb_database: 'chores',
        },
    };

};