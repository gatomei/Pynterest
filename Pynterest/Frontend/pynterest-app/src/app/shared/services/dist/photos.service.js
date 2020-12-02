"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhotosService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("environments/environment");
var PhotosService = /** @class */ (function () {
    function PhotosService(httpClient) {
        this.httpClient = httpClient;
    }
    PhotosService.prototype.getPhotosForFeed = function () {
        var getPhotosEndpoint = environment_1.environment.baseAPIAuth + "/photos";
        return this.httpClient.get(getPhotosEndpoint);
    };
    PhotosService.prototype.addPhoto = function (photo) {
        var addPhotoEndpoint = environment_1.environment.baseAPIAuth + "/photos";
        return this.httpClient.post(addPhotoEndpoint, photo);
    };
    PhotosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PhotosService);
    return PhotosService;
}());
exports.PhotosService = PhotosService;
