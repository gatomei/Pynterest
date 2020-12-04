"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var photos_service_1 = require("./photos.service");
describe('PhotosService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(photos_service_1.PhotosService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
