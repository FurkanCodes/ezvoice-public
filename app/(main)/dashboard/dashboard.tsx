

import Card from "@/components/general/card";
import Header from "@/components/general/header";
import React from "react";
function Dashboard() {
  return (
   <>
   
      <Header title={"Overview"} subtitle={"Your daily analytics and statistics"} ></Header>
      {/* Add your dashboard content here */}
     <Card title={"Stats"} >Hey</Card>
      </>
  );
}


export default Dashboard;
