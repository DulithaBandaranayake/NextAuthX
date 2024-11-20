"use client";

import axios from "axios";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import styles from "./styles/authemail.module.css"

export default function CheckEmail(){

    const route = useRouter();
    const [user, setUser] = useState({
        email:""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onAuthEmail = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/sendresetpassword", user)
            toast.success("Reset link send to your email");


        } catch (error:any) {
            toast.error(error.response?.data?.error || "Email send failed");
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        if(user.email.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    })

    return (
        <div className={styles["authemail-container"]}>
            <h1 className={styles["authemail-header"]}>{loading ? "Processing..." : "Reset Your Password"}</h1>
            <hr className="w-16 h-1 bg-blue-500 mb-6" />
            <div className={styles["form-container"]}>
                <label htmlFor="email" className={styles["input-label"]}>Email</label>
                <input 
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email:e.target.value})}
                    placeholder="Email"
                    className={styles["input-field"]}
                />
                <button onClick={onAuthEmail} disabled={buttonDisabled}
                    className={styles["submit-btn"]}>{buttonDisabled ? "Fill Email" : "Send"}</button>

                <div className={styles["footer-links"]}>
                    <Link href="/login">Go to login</Link>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}