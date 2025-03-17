export default function Footer() {
    return (
      <footer className="bg-gray-950 py-6">
        <div className="container mx-auto text-center">
          <p className="text-white" style={{fontFamily: 'Inter'}}>&copy; {new Date().getFullYear()} Ly Kimfong. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  