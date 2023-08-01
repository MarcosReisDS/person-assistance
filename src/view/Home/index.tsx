import { FC } from "react"
import { VscSettingsGear } from "react-icons/vsc"
import { MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"
import Button from "../../shared/components/Button"
import { deleteCookie, getCookie } from "../../shared/utils/cookie"
import { useNavigate } from "react-router-dom"

interface IHome { }
const Home: FC<IHome> = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        deleteCookie("user")
        navigate("/login")
    }
    
    return (
        <div className="container-home">
            <div className="container">
                <button className="setting" onClick={() => navigate("/configuracoes")}>
                    <VscSettingsGear size={30} color="#000" />
                </button>
                <div className="logo">
                    <img src={imgFinance} />
                </div>
                <div className="buttons">
                    <button onClick={() => navigate("/produto")}>Cadastrar nova despesa<MdArrowForwardIos size={35} /></button>
                    <button onClick={() => navigate("/produtos")}>Listar todas as despesas<MdArrowForwardIos size={35} /></button>
                </div>
                <div className="logout">
                    <div>
                        <Button nameButton="Logout" onClick={handleLogout}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home