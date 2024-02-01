import type { Metadata } from "next";
import AuthNav from "./components/authNav";


export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AuthNav/>
        <main className="mt-10">
            {children}
        </main>

    </div>)
}
