import { FC } from "react"
import { VscSettingsGear } from "react-icons/vsc"
import { MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"

interface IHome { }
const Home: FC<IHome> = () => {
    return (
        <div className="container-home">
            <div className="container">
                <a className="setting" href="/configuracoes">
                    <VscSettingsGear size={30} color="#000" />
                </a>
                <div className="logo">
                    <img src={imgFinance} />
                </div>
                <div className="buttons">
                    <a href="/produto">Cadastrar nova despesa<MdArrowForwardIos size={35}/></a>
                    <a href="/produtos">Listar todas as despesas<MdArrowForwardIos size={35}/></a>
                </div>
                <div className="logout">
                    <a href="/login">Logout</a>
                </div>
            </div>
        </div>
    )
}

export default Home