import { Outlet } from "react-router";
import "./MainLayout.scss"
import { Header } from "../components/Header/Header";
export function MainLayout(){
  return(
    <div className="site-layout_page">
    <Header />

    <main>
      <Outlet />
    </main>
    </div>
  )
}