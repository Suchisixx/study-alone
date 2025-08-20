import Navbar from './Navbar';
import './Layout.css'


export default function Layout({ children }) {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">{children}</div>
        </div>
    );
}