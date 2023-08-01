import { FC } from "react";
import "./styles.scss"

interface IButton {
    marginTop?: string
    nameButton: string
    onClick?: () => void
}
const Button: FC<IButton> = ({nameButton, onClick}) => {
    return <button className="button-interactive" onClick={onClick}>{nameButton}</button>
}

export default Button