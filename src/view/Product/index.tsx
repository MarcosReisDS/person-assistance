import { FC, useState } from "react";
import { MdArrowDropDown, MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"

import "./styles.scss"
import Input from "../../shared/components/Input";

interface IProduct { }
const Product: FC<IProduct> = () => {

    const [apparence, setApparence] = useState<boolean>(false)
    const [arrowDate, setArrowDate] = useState<boolean>(false)
    const [arrowSelect, setArrowSelect] = useState<boolean>(false)
    const [date, setDate] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    const values = [
        "Fixa",
        "Avulsa"
    ]

    const handleValue = (item: string) => {
        setApparence(false)
        setValue(item)
    }

    return (
        <div className="container-product">
            <div className="container">
                <div className="logo">
                    <a href="/home"><MdArrowForwardIos size={50} /></a>
                    <img src={imgFinance} />
                </div>
                <div className="buttons">
                    <div>
                        <Input type="text" placeholder="Título..." input="input" />
                        <Input type="text" placeholder="Data de...  " input="date" />
                        <MdArrowDropDown className="arrow"/>
                    </div>
                    <div>
                        <Input type="text" placeholder="Descrição..." input="input" />
                    </div>
                    <div>
                        <Input type="number" placeholder="Valor..." input="input" />
                        <Input type="number" placeholder="Parcelas..." input="input" />
                    </div>
                    <div>
                        <Input type="text" value={value} placeholder="Tipo de despesa..." input="select" onClick={() => setApparence(!apparence)} />
                        <MdArrowDropDown className="arrow"/>
                        <div className={apparence ? "drop" : "drop none"}>
                            {values.map((item, index) => (
                                <input type="text" placeholder={item} onClick={() => handleValue(item)} className="input-drop" key={index}/>
                            ))}
                        </div>
                    </div>
                    <div><a href="/produtos">Criar</a></div>
                </div>
            </div>
        </div>
    )
}

export default Product