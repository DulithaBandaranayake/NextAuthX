"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles/login.module.css";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login successful");
            router.push("/");
        } catch (error:any) {
            toast.error(error.response?.data?.error || "Login failed");
            
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles["login-container"]}>
            <h1 className={styles["login-header"]}>
                {loading ? "Processing..." : "Login"}
            </h1>
            <hr className="w-16 h-1 bg-blue-500 mb-6" />
            <div className={styles["form-container"]}>
                <label htmlFor="email" className={styles["input-label"]}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className={styles["input-field"]}
                />
                <label htmlFor="password" className={styles["input-label"]}>
                    Password
                </label>
                <div className={styles["password-container"]}>
                    <input
                        id="password"
                        type={passwordVisible ? "text" : "password"}
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
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
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={styles["submit-btn"]}
                >
                    {buttonDisabled ? "Enter Credentials" : "Login"}
                </button>
                <div className={styles["footer-links"]}>
                    <Link href="/signup">Go to Signup</Link>
                    <Link href="/authemail">Forgot Password?</Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
