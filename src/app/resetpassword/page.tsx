"use client";

import axios from "axios";
import { log } from "console";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {use, useEffect, useState} from "react";
import styles from "./styles/resetpassword.module.css"
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword(){

    const route = useRouter();
    const [token, setToken] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [user, setUser] = useState({
        password:"",
        confirmpassword:""
    })
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const updateNewPassword = async () => {
        try {
            setLoading(true);
            setButtonDisabled(true);
            const response = await axios.post('/api/users/resetpassword',
                {
                    token,
                    password: user.password,
                    confirmpassword: user.confirmpassword
                }
            )
            toast.success("Successfully reset your password")
            route.push("/login")

        } catch (error:any) {
            setError(true);
            setLoading(false);
            setButtonDisabled(false);

            toast.error(error.response?.data?.error || "Error change password");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        [1];
        setToken(urlToken || "");
    },[]);

    useEffect(() => {
        setButtonDisabled(!(user.password && user.confirmpassword));
    }, [user]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return(
        <div className={styles["resetpassword-container"]}>
            <h1 className={styles["resetpassword-header"]}>{loading ? "Processing..." : "Reset Password"}</h1>
            <hr className="w-16 h-1 bg-blue-500 mb-6" />
            <div className={styles["form-container"]}>
                <label htmlFor="password" className={styles["input-label"]}>Email</label>
                <div className={styles["password-container"]}>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="Password"
                        className={styles["input-field"]}
                    />
                    <span
                        className={styles["password-toggle"]}
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? "👁️" : "🙈"}
                    </span>
                </div>
                <label htmlFor="confirmpassword" className={styles["input-label"]}>Password</label>
                <div className={styles["password-container"]}>
                    <input
                        id="confirmpassword"
                        type={confirmPasswordVisible ? "text" : "password"}
                        value={user.confirmpassword}
                        onChange={(e) =>
                            setUser({ ...user, confirmpassword: e.target.value })
                        }
                        placeholder="Confirm Password"
                        className={styles["input-field"]}
                    />
                    <span
                        className={styles["password-toggle"]}
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {confirmPasswordVisible ? "👁️" : "🙈"}
                    </span>
                </div>
                <button onClick={updateNewPassword} disabled={buttonDisabled} className={styles["submit-btn"]}>{buttonDisabled ? "Fill" : "Change Password"}</button>
                <div className={styles["footer-links"]}>
                    <Link href="/login">Go to login</Link>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}