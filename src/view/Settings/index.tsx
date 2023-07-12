import { FC } from "react"
import { MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"

interface ISettings { }
const Settings: FC<ISettings> = () => {
    return (
        <div className="container-settings">
            <div className="container">
                <div className="logo">
                    <a href="/home"><MdArrowForwardIos size={50} /></a>
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