export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-screen-2xl pt-6 px-6 flex-grow min-h-screen">
      {children}
    </div>
  );
}
