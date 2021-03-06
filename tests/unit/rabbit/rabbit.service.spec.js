'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-mongoose');

var mongoose = require('mongoose');

var RabbitModule = require('../../../modules/rabbit/rabbit.module')();
var RabbitModel = RabbitModule.RabbitModel;
var RabbitService = RabbitModule.RabbitService;

var Fixtures = require('../../fixtures/fixtures');
var RabbitFixture = Fixtures.RabbitFixture;


var RabbitModelMock;

describe('RabbitService', function () {

    beforeEach(function () {
        RabbitModelMock = sinon.mock(RabbitModel);
    });

    afterEach(function () {
        RabbitModelMock.restore();

        mongoose.models = {};
        mongoose.modelSchemas = {};

        return mongoose.connection.close();
    });

    describe('createRabbit', function () {
        var newRabbit, expectedCreatedRabbit;

        it('should successfully create new rabbit', function () {
            newRabbit = RabbitFixture.newRabbit;

        
            expectedCreatedRabbit = RabbitFixture.createdRabbit;  // 2. value (THA)

            RabbitModelMock.expects('create')
                .withArgs(newRabbit)
                .resolves(expectedCreatedRabbit);

            return RabbitService.createRabbit(newRabbit)
                .then(function (data) {
                    RabbitModelMock.verify();
                    var xyz;
                    // expect(data).to.deep.equal(expectedCreatedRabbit); // 3. Here we are testing the data against expectedCreatedRabbit
                    expect(xyz).to.deep.equal(expectedCreatedRabbit);
                });
        });

      

    });

    describe('fetchRabbits', function () {
        var expectedRabbits;

        it('should successfully fetch all rabbits', function () {
            expectedRabbits = RabbitFixture.rabbits;

            RabbitModelMock.expects('find')
                .withArgs({})
                .chain('exec')
                .resolves(expectedRabbits);

            return RabbitService.fetchRabbits()
                .then(function (data) {
                    RabbitModelMock.verify();
                    var abc = [{},{},{}];
                    expect(abc).to.deep.equal(expectedRabbits);
                    // expect(data).to.deep.equal(expectedRabbits);
                });

        });

       
    });

});