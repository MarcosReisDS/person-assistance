import { FC } from "react";
import { MdArrowForwardIos, MdRemoveRedEye } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { PiCheckCircleBold } from "react-icons/pi"
import imgFinance from "../../shared/images/person.png"
import "./styles.scss"

interface IListing { }
const Listing: FC<IListing> = () => {
    return (
        <div className="container-listing">
            <div className="container">
                <div className="logo">
                    <a href="/home"><MdArrowForwardIos size={50} /></a>
                    <img src={imgFinance} />
                </div>
                <div className="separet">

                    <div className="date">
                        <select>
                            <option value="">Maio</option>
                        </select>
                        <span>Despesas referente a Maio</span>
                    </div>
                    <div className="container-tables">
                        <table className="table-total">
                            <tr>
                                <th>Despesas fixas</th>
                                <th>Despesas avulsas</th>
                                <th>Valor total</th>
                            </tr>
                            <tr>
                                <td>700,00</td>
                                <td>1800,00</td>
                                <td>2500,00</td>
                            </tr>
                        </table>
                        <table className="table-expenses">
                            <tr>
                                <th>Parcelas</th>
                                <th>Título</th>
                                <th>Valor</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Televisão</td>
                                <td>400,00</td>
                                <td><a href=""><MdRemoveRedEye color="#000" size={16}/></a></td>
                                <td><a href="/produto"><FaEdit color="#000" size={16}/></a></td>
                                <td><PiCheckCircleBold color="#000" size={25}/></td>
                            </tr>
                        </table>
                        <div className="new">
                            <a href="/produto">Nova despesa</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Listing