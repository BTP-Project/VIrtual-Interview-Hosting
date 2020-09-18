const tape = require('tape');
const {
    alert,
    confirm,
    prompt,
    choose,
    choosedropdown,
    choosemultiple
} = require('../dist/cjs.js');
tape('Demo', async ({
        equal,
        deepEqual,
        end,
        plan
    }) => {
    try {
        {
            await alert('This is a test.');
        }
        {
            await confirm('Are you ready to start the test?');

        }
        {
            const answer = await choosedropdown('Choose your unit.',
                '0: Introduction',
                '1: After The Beginning...');
        }
        {
            const answer = await prompt('What is the answer to the ultimate question?', '0');
            equal('42', answer.trim().toLowerCase());
        }
        {
            const answer = await choose('What is the first letter of the english alphabet?', 'A', 'B', 'C');
            equal('A', answer);
        }
        {
            const answer = await choosemultiple('Who are the Ninja Turtles?',
                "Leonardo", "Ralphael", "Michaelangelo", "Donatelo", "Splinter");
            deepEqual(["Leonardo", "Ralphael", "Michaelangelo", "Donatelo"], answer);
        }
    } catch (error) {
        console.log(`Test ended early: ${error.message}`)
    } finally {
        end();
    }
});
