type AuthLayoutDesignProps = {
  children: React.ReactNode;
};

const AuthLayoutDesign = ({ children }: AuthLayoutDesignProps) => {
  return <div className="grid place-items-center min-h-screen">{children}</div>;
};

export default AuthLayoutDesign;
