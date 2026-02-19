import Header from "../components/header/Header"


 function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header></Header>
           {children}
        </div>
    )
}

export default MainLayout
