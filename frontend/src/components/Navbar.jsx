import { Link, useLocation } from 'react-router-dom';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

export default function Navbar() {
    const url = useLocation();
    return (
        <div style={{
            display: "flex", marginTop: "20px", padding: "10px",
            background: "#799EFF", borderRadius: "20px"
        }}>
            <Link
                to="/"
                style={{
                    color: url.pathname === "/" ? "black" : 'white',
                    textDecoration: 'none',
                    marginRight: '15px',
                    marginLeft: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <AccessAlarmIcon style={{ paddingRight: "7px" }} /> Study Time
            </Link>
            <Link
                to="/to-study"
                style={{
                    color: url.pathname === "/to-study" ? "black" : 'white',
                    textDecoration: 'none',
                    marginLeft: '15px',
                    marginRight: '10px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <StickyNote2Icon style={{ paddingRight: "7px" }} /> Study Lists
            </Link>
        </div>
    );
}