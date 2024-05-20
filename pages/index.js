import { Inter } from "next/font/google";
import Game from "@/components/Game";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Game/>
  );
}
