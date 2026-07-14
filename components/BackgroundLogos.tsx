const scatteredLogos = [
  { path: "python/python-original.svg", top: "8%", left: "5%", size: "50px", rotate: "-15deg" },
  { path: "react/react-original.svg", top: "18%", left: "82%", size: "70px", rotate: "12deg" },
  { path: "cplusplus/cplusplus-original.svg", top: "42%", left: "8%", size: "45px", rotate: "25deg" },
  { path: "nextjs/nextjs-original.svg", top: "68%", left: "88%", size: "65px", rotate: "-10deg" },
  { path: "javascript/javascript-original.svg", top: "12%", left: "42%", size: "60px", rotate: "8deg" },
  { path: "typescript/typescript-original.svg", top: "82%", left: "12%", size: "55px", rotate: "-20deg" },
  { path: "laravel/laravel-original.svg", top: "58%", left: "78%", size: "50px", rotate: "15deg" },
  { path: "mysql/mysql-original.svg", top: "35%", left: "92%", size: "45px", rotate: "-5deg" },
  { path: "git/git-original.svg", top: "78%", left: "48%", size: "40px", rotate: "18deg" },
  { path: "github/github-original.svg", top: "48%", left: "54%", size: "60px", rotate: "-12deg" },
  { path: "php/php-original.svg", top: "88%", left: "38%", size: "50px", rotate: "22deg" },
  { path: "java/java-original.svg", top: "5%", left: "74%", size: "48px", rotate: "-8deg" },
  { path: "postgresql/postgresql-original.svg", top: "62%", left: "4%", size: "55px", rotate: "15deg" },
  { path: "html5/html5-original.svg", top: "28%", left: "28%", size: "50px", rotate: "-25deg" },
  { path: "css3/css3-original.svg", top: "52%", left: "24%", size: "45px", rotate: "10deg" },
  { path: "fastapi/fastapi-original.svg", top: "92%", left: "68%", size: "50px", rotate: "-15deg" }
];

export default function BackgroundLogos() {
  return (
    <div className="bg-logos-container">
      {scatteredLogos.map((item, index) => (
        <img 
          key={index}
          className="bg-logo-img"
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${item.path}`} 
          alt="background-logo" 
          loading="lazy" 
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            transform: `rotate(${item.rotate})`
          }}
        />
      ))}
    </div>
  );
}
