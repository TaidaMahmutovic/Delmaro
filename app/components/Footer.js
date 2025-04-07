import Link from 'next/link'

export default function Footer() {
  return (
    <div className="mt-auto">
      <footer className="bg-gray-100 text-gray-700 py-6">
       
        <div className="text-center text-sm mt-6 border-t pt-4 text-gray-500">
          © {new Date().getFullYear()} Delmaro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
