const tape = require('tape');
const {customized, alert, confirm, prompt, choose, choosedropdown, choosemultiple} = require('../dist/cjs.js');
tape('Proper Common JS Build', async ({ equal, end }) => {
    equal('function', typeof customized, '"customized" function exported.');
    equal('function', typeof alert, '"alert" function exported.');
    equal('function', typeof confirm, '"confirm" function exported.');
    equal('function', typeof prompt, '"prompt" function exported.');
    equal('function', typeof choose, '"choose" function exported.');
    equal('function', typeof choosedropdown, '"choosedropdown" function exported.');
    equal('function', typeof choosemultiple, '"choosemultiple" function exported.');
    end();
});
