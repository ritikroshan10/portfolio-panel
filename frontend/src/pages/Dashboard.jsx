import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Dashboard = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="flex-1 p-4 md:p-6 bg-gradient-to-b from-indigo-100 via-blue-50 to-indigo-100">
          <h2 className="text-3xl font-semibold text-indigo-900 mb-6">📊 Dashboard Overview</h2>
        </main>
      </div>
    </div>
  );

};

export default Dashboard;