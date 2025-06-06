import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton, UserProfile } from "@clerk/nextjs";
import Image from "next/image";
import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Toaster/>
      <div className="max-w-[1800px] mx-auto p-4">
        <Header/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />

        </div>

      </div>

    </div>
  );
}
