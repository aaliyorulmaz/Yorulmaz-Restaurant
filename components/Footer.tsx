export default function Footer() {
  return (
    <footer className="border-t border-bone/10 py-7 text-sm text-bone/75">
      <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-2">
        <p>© {new Date().getFullYear()} Yorulmaz Et Restoranı</p>
        <p>Konyaaltı, Antalya</p>
      </div>
    </footer>
  );
}
