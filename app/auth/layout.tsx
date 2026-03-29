type AuthLayoutDesignProps = {
  children: React.ReactNode;
};

const AuthLayoutDesign = ({ children }: AuthLayoutDesignProps) => {
  return (
    // ✅ grid alternative
    <div className="grid place-items-center min-h-screen bg-red-700">{children}</div>
  );
};

export default AuthLayoutDesign;
