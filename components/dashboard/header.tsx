import LogoutButton from "../general/logout-button";
import { ModeToggle } from "../ui/mode-toggle"

const DashboardHeader = () => {
    return (
      <div className="h-full w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold ">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
    );
  };

export default DashboardHeader;