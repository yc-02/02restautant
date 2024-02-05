import Navbar from "./components/Navbar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Navbar/>
        <main className="mt-10">
            {children}
        </main>

    </div>


  );
}
