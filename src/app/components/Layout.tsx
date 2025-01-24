import Header from "./Header";
import SideMenu from "./SideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideMenu />
        <main className="flex   -1 overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  )
}

