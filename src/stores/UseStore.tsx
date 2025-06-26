import { makeAutoObservable } from 'mobx';

export interface UserInfo {
    user_id: string;
    username: string;
    mobile: string,
    display_name: string,
}

class UserStore {

    token = '';

    userInfo: Partial<UserInfo> = {}

    constructor() {
        makeAutoObservable(this);
    }

    setToken(token: string) {
        this.token = token;
    }

    setUserInfo(userInfo: UserInfo) {
        this.userInfo = userInfo;
    }
}

const userStore = new UserStore();

export default userStore;
