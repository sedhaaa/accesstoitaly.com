import '../globals.css'; // Fontos: Be kell húzni a stílusokat, hogy szép legyen!

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Restricted Access',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050505]">
        {children}
      </body>
    </html>
  );
}