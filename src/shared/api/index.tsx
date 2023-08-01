import axios from "axios";
import { IRequest, IRequestGet, IRequestPost } from "../utils/types/request.interface";
import { getCookie } from "../utils/cookie";
import { id } from "date-fns/locale";

class Api {
    private apiUrl = "" as string;

    private config = (req: IRequest) => {
        switch (req.property) {
            case "users":
                this.apiUrl = `${process.env.REACT_APP_BASE}/users`
                break;
            case "despesas_fixas":
                this.apiUrl = `${process.env.REACT_APP_BASE}/despesas_fixas`
                break;
            case "despesas_avulsas":
                this.apiUrl = `${process.env.REACT_APP_BASE}/despesas_avulsas`
                break;
        }
    }

    get(req: IRequestGet) {
        this.config(req)
        let query: string = "";
        let objQueryes: any = req.query || {};
        let id

        if (objQueryes.id) {
            id = objQueryes.id
            delete objQueryes.id
        }

        if (getCookie("user")) {
            const userLogged = JSON.parse(getCookie("user"))
            objQueryes.user_id = userLogged.id
        }
        if (req.query) {
            query = new URLSearchParams(objQueryes).toString()
        }

        return axios.get(`${this.apiUrl}${id ? '/' + id : ''}/?${query}`)
    }

    post(req: IRequestPost) {
        this.config(req)
        if (getCookie("user")) {
            let userLogged = JSON.parse(getCookie("user"))
            req.body.user_id = userLogged.id
        }
        return axios.post(`${this.apiUrl}`, req.body)
    }

    put(req: IRequestPost) {
        this.config(req)
        return axios.put(`${this.apiUrl}/${req.body.id}`, req.body)
    }
}

export default new Api()