// Sidebar.tsx (main component stays mostly the same)
"use client"
import { useState, useEffect } from "react";
import SidebarContent from "./sidebar-content";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    
    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            setIsCollapsed(JSON.parse(savedState));
        }
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
        document.documentElement.style.setProperty('--sidebar-width', newState ? '80px' : '294px');
    };

    return (
        <>
            <Button 
                onClick={toggleCollapse}
                className="mb-4"
                size="sm"
            >
                {isCollapsed ? "→" : "←"}
            </Button>
        
            <div className={`flex flex-col h-full transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-full"
            }`}>
                <div className={`flex flex-col h-full ${isCollapsed ? "hidden" : "block"}`}>
                    <SidebarHeader />
                    <SidebarContent isCollapsed={isCollapsed} />
                    {/* <SidebarFooter /> */}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
