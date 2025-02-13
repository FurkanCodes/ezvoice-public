import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const appConfig = [
    {
        title: "Dashboard",
        icon: "📊",
        path: "/dashboard"
    },
    {
        title: "Analytics",
        icon: "📈",
        path: "/analytics"
    },
    {
        title: "Projects",
        icon: "📁",
        path: "/projects"
    },
    {
        title: "Messages",
        icon: "💬",
        path: "/messages"
    },
    {
        title: "Settings",
        icon: "⚙️",
        path: "/settings"
    }
];

const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const router = useRouter();

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className="grow p-4">
            <AnimatePresence>
                {!isCollapsed && appConfig.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                            duration: 0.3,
                            delay: idx * 0.1,
                            ease: "easeOut"
                        }}
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        onClick={() => handleNavigate(item.path)}
                    >
                        <div className="cursor-pointer rounded-lg p-2 transition-all hover:bg-primary/80 group">
                            <div className="flex items-center space-x-3">
                                <motion.span 
                                    className="text-xl"
                                    whileHover={{ 
                                        rotate: [0, -10, 10, -10, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                >
                                    {item.icon}
                                </motion.span>
                                <span className="font-medium text-gray-700 transition-colors duration-200 group-hover:text-white dark:text-gray-200 dark:group-hover:text-white">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default SidebarContent;
