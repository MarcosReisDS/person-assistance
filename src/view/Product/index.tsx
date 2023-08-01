import { FC, useEffect, useState } from "react";
import { MdArrowDropDown, MdArrowForwardIos } from "react-icons/md"
import imgFinance from "../../shared/images/person.png"
import { months } from "../../shared/utils/statics";
import "./styles.scss"
import Input from "../../shared/components/Input";
import api from "../../shared/api";
import { DespesaAvulsa, DespesaFixa } from "../../shared/utils/types";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";
import { useParams } from 'react-router-dom';


interface IProduct {
    isEditType?: 'fixa' | 'avulsa' | null
}
const Product: FC<IProduct> = ({ isEditType = null }) => {

    const { id: idDespesa } = useParams();

    const navigate = useNavigate()
    const [dataFieldsAvulsa, setDataFieldsAvulsa] = useState<DespesaAvulsa>({
        name: "",
        mes: new Date().getMonth(),
        ano: new Date().getFullYear(),
        total_parcelas: 0,
        value_parcela: 0,
        total_value: 0
    })
    const [dataFieldsFixa, setDataFieldsFixa] = useState<{ name: string, value: number }>({
        name: "",
        value: 0
    })
    const [apparenceDespesa, setApparenceDespesa] = useState<boolean>(false)
    const [apparenceMes, setApparenceMes] = useState<boolean>(false)
    const [valueDespesa, setValueDespesa] = useState<string>("")
    const [valueMes, setValueMes] = useState<string>("")
    const [typeDespesa, setTypeDespesa] = useState<"fixa" | "avulsa" | null>(null)

    const values: { name: string, value: "fixa" | "avulsa" }[] = [
        {
            name: "Fixa",
            value: "fixa"
        },
        {
            name: "Avulsa",
            value: "avulsa"
        }
    ]

    const handleValueDespesa = (item: { name: string, value: "fixa" | "avulsa" }) => {
        setApparenceDespesa(false)
        setTypeDespesa(item.value)
        setValueDespesa(item.name)
    }

    const handleSetDataFieldsAvulsa = (field: "ano" | "mes" | "name" | "total_parcelas" | "total_value" | "value_parcela", value: any) => {
        setDataFieldsAvulsa(dataFields => ({
            ...dataFields,
            [field]: value
        }))
    }

    const handleSetDataFieldsFixa = (field: "name" | "value", value: any) => {
        setDataFieldsFixa(dataFields => ({
            ...dataFields,
            [field]: value
        }))
    }

    const handlePostProductsAvulso = async () => {
        // if (idDespesa) {
        //     api.get({
        //         property: "despesas_avulsas",
        //         query: {
        //             id: Number(idDespesa)
        //         }
        //     }).then(({ data }) => {
        //         if (idDespesa) {
        //             data = { ...data, ...dataFieldsAvulsa }
        //         }

        //         api.put({
        //             property: "despesas_avulsas",
        //             body: data
        //         }).then(() => {
        //             navigate("/produtos")
        //         })
        //     })

        // } else {
        //     api.post({
        //         property: "despesas_avulsas",
        //         body: dataFieldsAvulsa
        //     }).then(() => {
        //         navigate("/produtos")
        //     })
        // }

        api.get({
            property: "despesas_avulsas"

        }).then(({ data }) => {
            const lastId = data[0].despesas[data[0].despesas.length - 1].id
            if (idDespesa) {
                data[0].despesas = data[0].despesas.map((despesa: any) => {
                    return despesa.id == idDespesa ? { ...dataFieldsAvulsa, id: Number(idDespesa) } : despesa
                })
            } else {
                data[0].despesas.push({ ...dataFieldsAvulsa, id: lastId + 1 })
            }

            api.put({
                property: "despesas_avulsas",
                body: data[0]
            }).then(() => {
                navigate("/produtos")
            })
        })
    }

    const handlePostProductsFixo = async () => {
        api.get({
            property: "despesas_fixas"

        }).then(({ data }) => {
            const lastId = data[0].despesas[data[0].despesas.length - 1].id
            if (idDespesa) {
                data[0].despesas = data[0].despesas.map((despesa: any) => {
                    return despesa.id == idDespesa ? { ...dataFieldsFixa, id: Number(idDespesa) } : despesa
                })
            } else {
                data[0].despesas.push({ ...dataFieldsFixa, id: lastId + 1 })
            }

            api.put({
                property: "despesas_fixas",
                body: data[0]
            }).then(() => {
                navigate("/produtos")
            })
        })
    }

    useEffect(() => {
        if (isEditType && idDespesa) {
            if (isEditType === 'fixa') {
                api.get({
                    property: 'despesas_fixas'
                }).then(({ data }) => {
                    const despesa = data[0]?.despesas?.find((despesa: any) => despesa?.id == idDespesa)
                    setDataFieldsFixa({
                        name: despesa.name,
                        value: despesa.value
                    })
                    setValueDespesa('Fixa')
                    setTypeDespesa('fixa')
                })
            }

            if (isEditType === 'avulsa') {
                api.get({
                    property: 'despesas_avulsas'
                }).then(({ data }) => {
                    const despesa = data[0]?.despesas?.find((despesa: any) => despesa?.id == idDespesa)
                    setDataFieldsAvulsa({
                        name: despesa.name,
                        mes: despesa.mes,
                        ano: despesa.ano,
                        total_parcelas: despesa.total_parcelas,
                        value_parcela: despesa.value_parcela,
                        total_value: despesa.total_value
                    })
                    setValueDespesa('Avulsa')
                    setTypeDespesa('avulsa')
                })
            }
        }
    }, [])

    return (
        <div className="container-product">
            <div className="container">
                <div className="logo">
                    <button onClick={() => navigate(-1)}><MdArrowForwardIos size={50} /></button>
                    <img src={imgFinance} />
                </div>
                <div className="buttons">
                    <div>
                        <Input type="text" value={valueDespesa} placeholder="Tipo de despesa..." input="select" onClick={() => setApparenceDespesa(!apparenceDespesa)} />
                        <MdArrowDropDown className="arrow" />
                        <div className={apparenceDespesa ? "drop" : "drop none"}>
                            {values.map((item, index) => (
                                <input type="text" placeholder={item.name} onClick={() => handleValueDespesa(item)} className="input-drop" key={index} />
                            ))}
                        </div>
                    </div>
                    {typeDespesa === "avulsa" ?
                        (
                            <>
                                <div>
                                    <Input value={dataFieldsAvulsa?.name} type="text" onChange={(e) => handleSetDataFieldsAvulsa("name", e.target.value)} placeholder="Título..." input="common" />
                                </div>
                                <div>
                                    <div className="container-select">
                                        <Input value={idDespesa ? months[dataFieldsAvulsa?.mes].name : valueMes} type="text" onClick={() => setApparenceMes(!apparenceMes)} placeholder="Mês..." input="select" />
                                        <MdArrowDropDown className="arrow" />
                                        <div className={apparenceMes ? "drop" : "drop none"}>
                                            {months.map((item, index) => (
                                                <input type="text" onClick={() => { handleSetDataFieldsAvulsa("mes", index); setApparenceMes(false); setValueMes(item.name) }} placeholder={item.name} className="input-drop" key={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <Input value={idDespesa ? dataFieldsAvulsa?.ano : undefined} type="number" onChange={(e) => handleSetDataFieldsAvulsa("ano", e.target.valueAsNumber)} placeholder="Ano..." input="common" />
                                </div>
                                <div>
                                    <Input value={idDespesa ? dataFieldsAvulsa?.total_value : undefined} type="number" onChange={(e) => { handleSetDataFieldsAvulsa("total_value", e.target.valueAsNumber); handleSetDataFieldsAvulsa("value_parcela", e.target.valueAsNumber) }} placeholder="Valor..." input="common" />
                                    <Input value={idDespesa ? dataFieldsAvulsa?.total_parcelas : undefined} type="number" onChange={(e) => handleSetDataFieldsAvulsa("total_parcelas", e.target.valueAsNumber)} placeholder="Parcelas..." input="common" />
                                </div>
                            </>
                        ) : typeDespesa === "fixa" && (
                            <div>
                                <Input value={dataFieldsFixa?.name} type="text" onChange={(e) => handleSetDataFieldsFixa("name", e.target.value)} placeholder="Título..." input="common" />
                                <Input value={idDespesa ? dataFieldsFixa?.value : undefined} type="number" onChange={(e) => handleSetDataFieldsFixa("value", e.target.valueAsNumber)} placeholder="Valor..." input="common" />
                            </div>
                        )
                    }
                    {typeDespesa === "fixa" && (
                        <div className="new-product">
                            <Button nameButton={idDespesa ? "Editar" : "Criar"} onClick={() => handlePostProductsFixo()} />
                        </div>
                    )}
                    {typeDespesa === "avulsa" && (
                        <div className="new-product">
                            <Button nameButton={idDespesa ? "Editar" : "Criar"} onClick={() => handlePostProductsAvulso()} />
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default Product