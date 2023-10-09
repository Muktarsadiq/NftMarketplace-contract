import "../styles/globals.css";
//import 'tailwindcss/tailwind.css'; // If using the default setup
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">R3flex Marketplace</p>
        <div className="flex mt-4">
          <Link href="/" legacyBehavior>
            <a className="mr-4 text-pink-500">
              Home
            </a>
          </Link>
          <br />
          <Link href="/createItem" legacyBehavior>
            <a className="mr-6 text-pink-500">
              Sell NFT
            </a>
          </Link>
          <br />
          <Link href="/myAssets" legacyBehavior>
            <a className="mr-6 text-pink-500">
              My NFTs
            </a>
          </Link>
          <br />
          <Link href="/dashboard" legacyBehavior>
            <a className="mr-6 text-pink-500">
              Dashboard
            </a>
          </Link>
          <br />
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

