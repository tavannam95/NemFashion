import {Injectable} from '@angular/core';

const USER_TOKEN = 'user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() {
    }

    /**Xoá token cũ ở Local Storage và lưu token mới*/
    public saveUserToken(userToken: any) {
        window.localStorage.removeItem(USER_TOKEN);
        window.localStorage.setItem(USER_TOKEN, JSON.stringify(userToken));
    }

    public getUserToken() {
        const userToken = window.localStorage.getItem(USER_TOKEN);
        if (userToken) {
            return JSON.parse(userToken);
        }
        return {};
    }

    public isLoggedIn() {
        const authToken = this.getUserToken();
        return authToken !== undefined && authToken?.token !== undefined;
    }

    getToken() {
        const authToken = this.getUserToken();
        return authToken !== null && authToken?.token !== null ? authToken?.token : null;
    }

    clearToken() {
        window.localStorage.removeItem(USER_TOKEN);
    }

    clean() {
        window.localStorage.clear();
    }

}
