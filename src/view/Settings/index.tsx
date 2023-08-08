import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import api from "../../shared/api"
import Input from "../../shared/components/Input"
import Button from "../../shared/components/Button"
import "./styles.scss"

interface ISettings {
}
const Settings: FC<ISettings> = () => {
    const navigate = useNavigate()
    const { id: idUser } = useParams()
    const [userLogin, setUserLogin] = useState<string>("")
    const [userPassword, setUserPassword] = useState<string>("")
    const [edit, setEdit] = useState<boolean>(false)

    const handleGetUser = async () => {
        api.get({
            property: "users",
        }).then(({ data }) => {
            data = data.filter((item: any) => item.id == idUser)
            setUserLogin(data[0].login)
            setUserPassword(data[0].password)
            setEdit(false)
        })
    }

    const handleEdit = () => {
        api.put({
            property: "users",
            body: {
                login: userLogin,
                password: userPassword,
                id: idUser
            }
        }).then(() => {
            setEdit(false)
        })
    }

    useEffect(() => {
        handleGetUser()
    }, [])

    return (
        <div className="container-settings">
            <div className="container">
                <div className="logo">
                    <button onClick={() => navigate(`/home/${idUser}`)}><MdArrowForwardIos size={50} /></button>
                    <img src={imgFinance} />
                </div>
                <div className="container-editar">
                    {edit ? (
                        <>
                            <div className="inputs">
                                <Input input="common" type="text" value={userLogin} onChange={(e) => setUserLogin(e.target.value)} />
                                <Input input="common" type="text" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="inputs">
                                <Input input="common" type="text" value={userLogin} Disabled />
                                <Input input="common" type="text" value={userPassword} Disabled />
                            </div>
                        </>
                    )}

                    <div className="buttons">
                        {edit ? (
                            <>
                                <div>
                                    <Button nameButton="salvar" colorOptional="green" onClick={() => handleEdit()} />
                                </div>
                                <div>
                                    <Button nameButton="cancelar" colorOptional="red" onClick={() => handleGetUser()} />
                                </div>
                            </>
                        ) :
                            <div>
                                <Button nameButton="editar" onClick={() => setEdit(true)} colorOptional="" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings