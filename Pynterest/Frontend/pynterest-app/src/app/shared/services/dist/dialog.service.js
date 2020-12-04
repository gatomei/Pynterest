"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogService = void 0;
var core_1 = require("@angular/core");
var follow_dialog_component_1 = require("../components/follow-dialog/follow-dialog.component");
var add_pin_dialog_component_1 = require("../components/add-pin-dialog/add-pin-dialog.component");
var create_board_dialog_component_1 = require("../components/create-board-dialog/create-board-dialog.component");
var DialogService = /** @class */ (function () {
    function DialogService(followDialog, addPinDialog, addBoardDialog, showBoardDialog) {
        this.followDialog = followDialog;
        this.addPinDialog = addPinDialog;
        this.addBoardDialog = addBoardDialog;
        this.showBoardDialog = showBoardDialog;
    }
    DialogService.prototype.openFollowDialog = function (_currentUserFollowModel, _loggedInUserFollowingModel, _dialogTitle) {
        var data = {
            dialogTitle: _dialogTitle,
            currentUserFollowModel: _currentUserFollowModel,
            loggedInUserFollowingModel: _loggedInUserFollowingModel
        };
        this.followDialog.open(follow_dialog_component_1.FollowDialogComponent, { data: data, panelClass: 'custom-dialog-container' });
    };
    DialogService.prototype.openAddPinDialog = function () {
        this.addPinDialog.open(add_pin_dialog_component_1.AddPinDialogComponent, { panelClass: 'custom-dialog-container' });
    };
    DialogService.prototype.openAddBoardDialog = function (data) {
        this.addBoardDialog.open(create_board_dialog_component_1.CreateBoardDialogComponent, {
            data: data,
            panelClass: 'custom-dialog-container'
        });
    };
    DialogService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DialogService);
    return DialogService;
}());
exports.DialogService = DialogService;
