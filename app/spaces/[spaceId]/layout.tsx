import { SideBar } from "./components/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {children}
      <SideBar />
    </div>
  );
}
