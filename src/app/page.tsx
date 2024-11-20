"use client";
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

export default function Home() {

  const route = useRouter()

  const logout = async () => {
    try {

      await axios.get("/api/users/logout")
      toast.success("You logout")
      route.push("/login");

    } catch (error:any) {
      toast.error(error.response?.data?.error || "Logout failed");
    }
  }

  return (
      <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={100} height={50} className={styles.logoImage}/>
          </div>
          <button className={styles.logoutButton} onClick={logout}>
              Logout
          </button>
      </nav>

      {/* Main Section */}
      <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Nextjs Home</h1>
          <p className={styles.description}>
              This is a simple dark-themed single-page application.
          </p>
          <a 
              href="https://example.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.ctaButton}
          >
              Get Started
          </a>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
          <p>© 2024 Dulitha Bandaranayake. All Rights Reserved.</p>
      </footer>
  </div>
  );
}
