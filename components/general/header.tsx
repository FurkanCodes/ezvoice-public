const Header = ({title, subtitle}: {title:string, subtitle:string}) =>{

    return    <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  </div>
}

export default Header;