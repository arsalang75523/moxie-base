import './globals.css';

export const metadata = {
  title: 'Moxie Dashboard',
  description: 'Track and share your Moxie earnings',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Moxie earnings dashboard" />
        <meta property="og:title" content="Moxie Dashboard" />
        <meta property="og:description" content="Easily track your earnings." />
        <meta property="og:image" content="/next.svg" />
      </head>
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
