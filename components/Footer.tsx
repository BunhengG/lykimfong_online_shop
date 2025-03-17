export default function Footer() {
    return (
      <footer className="bg-rose-500  py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-white" style={{fontFamily: 'Inter'}}>&copy; {new Date().getFullYear()} Siren Shop. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  