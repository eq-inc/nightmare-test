/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



const expect = require('expect.js');
const nightmare = require('nightmare');


describe('Nightmare test', function () {
    describe('Protoractor test sample', function () {
        describe('Should complete test', function (done) {
            it('Multi evaluate', function (done) {
                (async () => {
                    const client = nightmare({show: false}),
                        text = 'write first protractor test';

                    client.goto('https://angularjs.org/')
                        .type('input[ng-model="todoList.todoText"]', text)
                        .click('input[value="add"]')
                        .evaluate(function () {
                            return document.querySelectorAll('li[ng-repeat="todo in todoList.todos"]');
                        }).then(function (result) {
                            expect(Object.keys(result)).to.have.length(3);
       
                            return client.evaluate(function () {
                                const elements = document.querySelectorAll('li[ng-repeat="todo in todoList.todos"]');

                                return elements[2].querySelector('span').innerText;
                            });
                        }).then(function (result) {
                            expect(result).to.be(text);

                            return client.click('li[ng-repeat="todo in todoList.todos"]:nth-child(2) input')
                                .evaluate(function () {
                                    return document.querySelectorAll('.done-true');
                                });
                        }).then(function (result) {
                            expect(Object.keys(result)).to.have.length(2);

                            client.end().then(function () {
                                done();
                            });
                        });
                })();
            });

            it('Single evaluate', function (done) {
                (async () => {
                    const client = nightmare({show: false}),
                        text = 'write first protractor test';

                    client.viewport(1024, 768)
                        .goto('https://angularjs.org/')
                        .type('input[ng-model="todoList.todoText"]', text)
                        .click('input[value="add"]')
                        .evaluate(function () {
                            const elements = document.querySelectorAll('li[ng-repeat="todo in todoList.todos"]');
                            elements[2].querySelector('input').click();

                            return {
                                elements: elements.length,
                                completes: document.querySelectorAll('.done-true').length,
                                text: elements[2].querySelector('span').innerText
                            };
                        }).then(function (result) {
                            expect(result.elements).to.be(3);
                            expect(result.completes).to.be(2);
                            expect(result.text).to.be(text);
    
                            client.end().then(function () {
                                done();
                            });
                        });
                })();
            });
        });
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
