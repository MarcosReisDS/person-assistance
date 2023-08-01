import { FC, useState } from "react";
import "./styles.scss"

interface IInput {
    placeholder?: string
    type: string
    input: string
    value?: string | number
    onClick?: () => void
    onChange?: (e: any) => void
    errorMessage?: string
}
const Input: FC<IInput> = ({ placeholder, type, input, onClick, value, onChange, errorMessage = "" }) => {

    const change = () => {
        if (input === "common")
            return <input className="input" value={value} type={type} placeholder={placeholder} onChange={onChange} />

        if (input === "select")
            return <input className="input select" value={value} type={type} placeholder={placeholder} onClick={onClick} onKeyDown={(e) => e.preventDefault()} />
    }
    return (
        <div className="container-input">
            {change()}
            {errorMessage.length > 0 && (
                <span className="error">{errorMessage}</span>
            )}
        </div>
    )
}

export default Input