"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var boards_service_1 = require("./boards.service");
describe('BoardsService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(boards_service_1.BoardsService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
