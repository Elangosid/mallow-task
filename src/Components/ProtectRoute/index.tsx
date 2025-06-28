
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { ACCESS_TOKEN_FIELD_NAME } from "../constant/common";
import Cookies from "js-cookie";

type Props = {
    children: ReactNode;
};

export default function ProtectRoute({ children }: Props) {
    const token = Cookies.get(ACCESS_TOKEN_FIELD_NAME)
    return token ? <>{children}</> : <Navigate to="/" />;
}
