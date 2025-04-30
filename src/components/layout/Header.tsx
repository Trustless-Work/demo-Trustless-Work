import Image from "next/image";
import { ThemeToggle } from "../utils/theme-toggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Image
            src="/logo.png"
            alt="Trustless Work Logo"
            width={70}
            height={70}
          />
          <p className="text-xl font-bold">
            Trustless Work{" "}
            <span className="text-muted-foreground/80 text-base italic">
              Demo
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
