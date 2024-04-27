export class User{
    constructor(name, password) {    
        this.name = name;
        this.password = password;
    }

    getName() {
        return this.name;
    }
    getPassword() {
        return this.password;
    }
    setName(newName) {
        this.name = newName;
    }
    setPassword(newPassword) {
        this.password = newPassword;
    }
}