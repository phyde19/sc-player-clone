import Image from "next/image";
import App from "./ui/App";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-start p-24">
      <App />
    </main>
  );
}
