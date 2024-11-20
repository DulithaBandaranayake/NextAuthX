"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles/signup.module.css";

export default function SignupPage() {
    const route = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        confirmpassword: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            route.push("/login");
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.confirmpassword));
    }, [user]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    return (
        <div className={styles["signup-container"]}>
            <h1 className={styles["signup-header"]}>
                {loading ? "Processing..." : "Signup"}
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

                <label htmlFor="confirmpassword" className={styles["input-label"]}>
                    Confirm Password
                </label>
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

                <button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    className={styles["submit-btn"]}
                >
                    {buttonDisabled ? "Enter details" : "Signup"}
                </button>
                <div className={styles["footer-links"]}>
                    <Link href="/login">Go to login</Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
}
