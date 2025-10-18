export const WelcomeWidget = () => {
  return (
    <div 
      className="fixed left-8 top-1/2 -translate-y-1/2 backdrop-blur-macos-heavy rounded-3xl p-8 shadow-macos-glass z-30 max-w-md animate-fade-in"
      style={{
        background: 'hsl(var(--macos-glass))',
        border: '1px solid hsl(var(--macos-glass-border))',
      }}
    >
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 grid grid-cols-4 gap-1">
          {/* Simple pixel art face */}
          <div className="bg-foreground/80"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-foreground/80"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-foreground/80"></div>
          <div className="bg-foreground/80"></div>
          <div className="bg-transparent"></div>
          <div className="bg-transparent"></div>
          <div className="bg-foreground/80 rounded-full"></div>
          <div className="bg-foreground/80 rounded-full"></div>
          <div className="bg-transparent"></div>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-center">
        Hello, I'm Thanas R
      </h1>
      
      <p className="text-center text-muted-foreground leading-relaxed">
        Welcome to my portfolio website.<br />
        Click on any app below to explore more about me
      </p>
    </div>
  );
};
