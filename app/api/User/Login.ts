import BaseModelAPI from "../BaseModelAPI";
import { API_LOGIN_MODEL } from "./const";

class LoginApiRequest extends BaseModelAPI {
    constructor() {
        super(API_LOGIN_MODEL.url);
    }
}

export default LoginApiRequest;
