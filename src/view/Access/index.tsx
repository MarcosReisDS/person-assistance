import { FC, useEffect, useState } from "react";
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import api from "../../shared/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../shared/utils/cookie";

interface IAccess {
    urlCadastro: string
    cadastro: string
    button: string
}
const Access: FC<IAccess> = ({ urlCadastro, cadastro, button }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState<{ login: string, password: string }>({
        login: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<{ login: boolean, password: boolean }>({
        login: false,
        password: false
    })

    const handleGetUser = () => {
        api.get({
            property: "users",
            query: {
                login: user.login,
            }
        })
            .then(({ data }) => {
                if (data.length > 0) {
                    const userLogged = data[0]
                    if (user.password === userLogged.password) {
                        setCookie("user", JSON.stringify(userLogged), 1)
                        navigate("/home")
                    } else {
                        setErrorMessage({ ...errorMessage, password: true })
                    }
                } else {
                    setErrorMessage({ login: true, password: false })
                }
            })
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <div className="container-access">
            <div className="container">
                <div className="logo">
                    <img src={imgFinance} />
                </div>
                <div className="container-inputs">
                    <Input onChange={(e) => setUser({ ...user, login: e.target.value })} type="text" placeholder="Nome..." input="common" errorMessage={errorMessage.login ? "Usuário não existe" : ""} />
                    <Input onChange={(e) => setUser({ ...user, password: e.target.value })} type="text" placeholder="Senha..." input="common" errorMessage={errorMessage.password ? "Senha incorreta" : ""} />
                    <span>Não tem cadastro?</span>
                    <div className="button-acess">
                        <div>
                            <Button onClick={() => handleGetUser()} nameButton={button} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Access