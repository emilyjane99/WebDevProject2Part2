"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, firstName, lastName, emailAddress, password) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
    }
    displayAsString() {
        return `{userID: ${(this.userId)}, firstName: ${(this.firstName)}, lastName: ${(this.lastName)}, emailAddress: ${(this.emailAddress)}}`;
    }
}
exports.User = User;
//# sourceMappingURL=users.js.map