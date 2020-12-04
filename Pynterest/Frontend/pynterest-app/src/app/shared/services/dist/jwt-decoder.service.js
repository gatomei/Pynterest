"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.JwtDecoderService = void 0;
var core_1 = require("@angular/core");
var JwtDecoderService = /** @class */ (function () {
    function JwtDecoderService(jwtHelper, localstorageService) {
        this.jwtHelper = jwtHelper;
        this.localstorageService = localstorageService;
    }
    JwtDecoderService.prototype.getAllInfo = function () {
        this.token = this.localstorageService.get("userToken")["jwt"];
        this.decodeToken = this.jwtHelper.decodeToken(this.token);
        return {
            id: this.decodeToken["userId"],
            email: this.decodeToken["email"],
            username: this.decodeToken["sub"],
            fullname: this.decodeToken["fullname"],
            birthDate: this.decodeToken["birthDate"],
            description: this.decodeToken["description"],
            admin: this.decodeToken["admin"]
        };
    };
    JwtDecoderService.prototype.isExpired = function () {
        return this.jwtHelper.isTokenExpired(this.token);
    };
    JwtDecoderService.prototype.getUsername = function () {
        this.token = this.localstorageService.get("userToken")["jwt"];
        this.decodeToken = this.jwtHelper.decodeToken(this.token);
        return this.decodeToken["sub"];
    };
    JwtDecoderService.prototype.getId = function () {
        this.token = this.localstorageService.get("userToken")["jwt"];
        this.decodeToken = this.jwtHelper.decodeToken(this.token);
        return this.decodeToken["userId"];
    };
    JwtDecoderService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], JwtDecoderService);
    return JwtDecoderService;
}());
exports.JwtDecoderService = JwtDecoderService;
