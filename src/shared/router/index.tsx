import { FC } from "react"
import { Routes, Route } from "react-router-dom"
import Access from "../../view/Access"
import Home from "../../view/Home"
import Product from "../../view/Product"
import Listing from "../../view/Listing"
import Settings from "../../view/Settings"

interface IRouter { }
const Router: FC<IRouter> = () => {
    return (
        <Routes>
            <Route path="/login" element={<Access button="Acessar" cadastro="Não tem cadastro?" urlCadastro="/register"/>} />
            <Route path="/register" element={<Access button="Registrar" cadastro="Tem cadastro?" urlCadastro="/login"/>} />
            <Route path="/home" element={<Home />} />
            <Route path="/produto" element={<Product />} />
            <Route path="/produtos" element={<Listing />} />
            <Route path="/configuracoes" element={<Settings />} />
        </Routes>
    )
}

export default Router