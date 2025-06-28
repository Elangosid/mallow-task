import { LogOutIcon } from "lucide-react";
import { logout } from "../../../features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_FIELD_NAME } from "../../constant/common";


export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        const token = Cookies.get(ACCESS_TOKEN_FIELD_NAME);
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };


    return (
        <>
            <nav className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">Userlist Manager</span>
                </div>
                <div>
                    <span className="flex gap-x-3 items-center">
                        Elon Musk
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 border-red-500 p-2 rounded-xl text-white hover:bg-red-600"
                        >
                            <LogOutIcon className="w-5 h-5" />
                        </button>
                    </span>
                </div>
            </nav>
        </>
    );
}

