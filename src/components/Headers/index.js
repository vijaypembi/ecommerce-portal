import "./index.css";
import { useNavigate } from "react-router-dom";
const Headers = () => {
    const navigate = useNavigate();
    return (
        <nav className="nav-tabs">
            {/* <div className="nav-item active">Products</div> */}
            <div className="nav-item" onClick={() => navigate("/stores")}>
                Stores
            </div>
            <div className="nav-item" onClick={() => navigate("/")}>
                Invoices
            </div>
        </nav>
    );
};

export default Headers;
