import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Sidebar } from "../Sidebar";
import { cn } from "@/lib/utils";
import { Header } from "../Header";

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      {user && (
        <Sidebar
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      )}
      <div
        className={cn("flex-1 flex flex-col transition-all duration-300", {
          "ml-16": user && isCollapsed,
          "ml-64": user && !isCollapsed,
        })}
      >
        {!user && <Header />}
        <main className="flex flex-1 flex-col overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
