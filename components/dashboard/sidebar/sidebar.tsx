"use client"
import { useState } from "react";
import SidebarContent from "./sidebar-content";
import SidebarFooter from "./sidebar-footer";
import SidebarHeader from "./sidebar-header";
import { Button } from "@/components/ui/button";

const Sidebar = () =>{
const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    return <div className={`${isCollapsed ? "w-32" : "bg-primary"}`}><Button onClick={() => setIsCollapsed(!isCollapsed)}>Close navbar</Button><SidebarHeader /> <SidebarContent /> <SidebarFooter /></div>
}

export default  Sidebar;