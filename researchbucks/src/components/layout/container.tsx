export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 container">
      {children}
    </div>
  );
}
