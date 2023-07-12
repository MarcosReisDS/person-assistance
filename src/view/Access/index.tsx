import { FC } from "react";
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";

interface IAccess {
    urlCadastro: string
    cadastro: string
    button: string
}
const Access: FC<IAccess> = ({ urlCadastro, cadastro, button }) => {
    return (
        <div className="container-access">
            <div className="container">
                <div className="logo">
                    <img src={imgFinance} />
                </div>
                <div className="container-inputs">
                    <Input type="text" placeholder="Nome..." input="input" />
                    <Input type="text" placeholder="Senha..." input="input" />
                    <span><a href={urlCadastro}>{cadastro}</a></span>
                    <div className="button-acess">
                        <Button marginTop="40px" nameButton={button} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Access