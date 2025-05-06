import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
export default function Layout() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar user={user} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
