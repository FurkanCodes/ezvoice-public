import React from "react";



const Card = ({title, children}: {title:string, children: React.ReactNode}) =>{

    return       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Example card */}
    <div className="p-6 rounded-lg bg-card border border-border shadow-sm hover:border-primary/30 transition-all duration-200">
    
      <h3 className="font-bold text-xl mb-2">{title}</h3>
    {children}
    </div>
    </div>
    



}

export default Card;