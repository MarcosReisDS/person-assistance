import { FC, useState } from "react";
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import "./styles.scss"
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { ptBR } from 'date-fns/locale';

registerLocale('pt-BR', ptBR)
setDefaultLocale('pt-BR')

interface IInput {
    placeholder: string
    type: string
    input: string
    value?: string
    onClick?: () => void
}
const Input: FC<IInput> = ({ placeholder, type, input, onClick, value }) => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const mundaca = () => {
        if (input === "input")
            return <input className="input" type={type} placeholder={placeholder} />

        if (input === "date")
            return <DatePicker className="input none date" selected={selectedDate} placeholderText={placeholder} onChange={(e) => setSelectedDate(e)} onKeyDown={(e) => e.preventDefault()} dateFormat="dd/MM/yyyy" />

        if (input === "select")
            return <input className="input none" value={value} type={type} placeholder={placeholder} onClick={onClick} onKeyDown={(e) => e.preventDefault()} />
    }
    return (
        <div className="container-input">
            {mundaca()}
        </div>
    )
}

export default Input