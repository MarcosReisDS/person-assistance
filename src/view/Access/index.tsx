import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../shared/utils/cookie";
import imgFinance from "../../shared/images/person.png"
import api from "../../shared/api";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import "./styles.scss"

interface IAccess {
    urlCadastro: string
    cadastro: string
}
const Access: FC<IAccess> = ({ urlCadastro, cadastro }) => {

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
                        navigate(`/home/${userLogged.id}`)
                    } else {
                        setErrorMessage({ ...errorMessage, password: true })
                    }
                } else {
                    setErrorMessage({ login: true, password: false })
                }
            })
    }

    const handlePostUser = () => {
        api.post({
            property: "users",
            body: user
        }).then(({ data }) => {
            setCookie("user", JSON.stringify(data), 1)
            navigate(`/home/${data.id}`)

            api.post({
                property: "despesas_avulsas",
                body: {
                    id: data.id,
                    user_id: data.id,
                    despesas: []
                }
            })

            api.post({
                property: "despesas_fixas",
                body: {
                    id: data.id,
                    user_id: data.id,
                    despesas: []
                }
            })
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
                    {urlCadastro === "/login" ? (
                        <>
                            <Input onChange={(e) => setUser({ ...user, login: e.target.value })} type="text" placeholder="Nome..." input="common" />
                            <Input onChange={(e) => setUser({ ...user, password: e.target.value })} type="text" placeholder="Senha..." input="common" />
                        </>
                    ) :
                        urlCadastro === "/register" && (
                            <>
                                <Input onChange={(e) => setUser({ ...user, login: e.target.value })} type="text" placeholder="Nome..." input="common" errorMessage={errorMessage.login ? "Usuário não existe" : ""} />
                                <Input onChange={(e) => setUser({ ...user, password: e.target.value })} type="text" placeholder="Senha..." input="common" errorMessage={errorMessage.password ? "Senha incorreta" : ""} />
                            </>
                        )
                    }
                    <span onClick={() => navigate(urlCadastro)}>{cadastro}</span>
                    <div className="button-acess">
                        {urlCadastro === "/login" ? (
                            <div>
                                <Button onClick={() => handlePostUser()} nameButton="Registrar" />
                            </div>
                        ) :
                            urlCadastro === "/register" && (
                                <div>
                                    <Button onClick={() => handleGetUser()} nameButton="Acessar" />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Access