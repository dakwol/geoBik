import BaseModelAPI from "../BaseModelAPI";
import apiConfig from "../apiConfig";
import axiosClient from "../axiosClient";
import { API_LANDPLOAT_MODEL } from "./const";

class LandploatsApiRequest extends BaseModelAPI {
    constructor() {
        super(API_LANDPLOAT_MODEL.url);
    }
    async getConstruction<T>(urlParams?:string) {
        return this.makeRequest<T>(axiosClient.get, {urlParams: urlParams, method: API_LANDPLOAT_MODEL.methods.getConstruction.url});
    }
    async getConstructionById<T>(id?:string) {
        return this.makeRequest<T>(axiosClient.get, {id: id, method: API_LANDPLOAT_MODEL.methods.getConstructionById.url});
    }
    async createInspection(id:string, data:any) {
        return this.makeRequest(axiosClient.post, { id: id, method: API_LANDPLOAT_MODEL.methods.createInspection.url, body: data });
    }
    async uploadImage(data:any) {
        return this.makeRequest(axiosClient.post, { method: API_LANDPLOAT_MODEL.methods.uploadImage.url, body: data });
    }
}

export default LandploatsApiRequest;