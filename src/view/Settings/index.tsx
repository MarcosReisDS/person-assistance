import { FC } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"
import { useNavigate } from "react-router-dom"

interface ISettings { }
const Settings: FC<ISettings> = () => {
    const navigate = useNavigate()
    return (
        <div className="container-settings">
            <div className="container">
                <div className="logo">
                    <button onClick={() => navigate("/home")}><MdArrowForwardIos size={50} /></button>
                    <img src={imgFinance} />
                </div>
                <div className="container-editar">
                    <div className="inputs">
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                    </div>
                    <div className="buttons">
                        <a href="/home">Editar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings