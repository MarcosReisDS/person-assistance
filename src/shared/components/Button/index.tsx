import { FC } from "react";
import "./styles.scss"

interface IButton {
    marginTop: string
    nameButton: string
}
const Button: FC<IButton> = ({marginTop, nameButton}) => {
    return (
        <div className="button" style={{marginTop: `${marginTop}`}}>
            <a href="/home">{nameButton}</a>
        </div>
    )
}

export default Button