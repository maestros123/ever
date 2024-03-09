import Header from "../components/Layots/Header/Header";

interface LayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}
const Layout: React.FC<LayoutProps> = ({ children, showHeader = false }) => {
    return (
        <div>
            {showHeader && <Header />}
            {children}
        </div>
    );
};

export default Layout;