"use client";

import axios from "axios";
import { log } from "console";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import styles from "./styles/verifyemail.module.css"
import toast, {Toaster} from "react-hot-toast";

export default function VerifyEmailPage(){

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail',
                {token}
            )
            setVerified(true);
        } catch (error:any) {
            setError(true);
            toast.error(error.response?.data?.error || "Verification failed");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        [1];
        setToken(urlToken || "");
    },[]);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className={styles["verifyemail-container"]}>
            <h1 className={styles["verifyemail-header"]}>Email Verify</h1>

            <div className={styles["form-container"]}>
                {verified && (
                    <div>
                        <h2 className={styles["verifyemail-subheader"]}>✅ Your Email Verified</h2>
                        <div className={styles["footer-links"]}>
                            <Link href="/login">Login</Link>
                        </div>
                    </div>
                )}

                {error && (
                    <div>
                        <h2 className={styles["verifyemail-subheader"]}>😿 Token Error</h2>
                        <div className={styles["footer-links"]}>
                            <Link href="/signup">Go to signup</Link>
                        </div>
                    </div>
                )}
            </div>
            <Toaster/>
        </div>
    )
}