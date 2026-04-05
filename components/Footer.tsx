import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-velora-black text-velora-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold tracking-widest">VELORA</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Modern luxury fashion for the global citizen. Designed with elegance, crafted with purpose.
            </p>
            <div className="flex space-x-4">
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Trending</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} VELORA. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-gray-500">
             {/* Payment Icons Placeholder */}
             <div className="flex gap-2">
                <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center text-[8px]">VISA</div>
                <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center text-[8px]">MC</div>
                <div className="w-8 h-5 bg-gray-800 rounded flex items-center justify-center text-[8px]">AMEX</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon }: { Icon: any }) {
  return (
    <a href="#" className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
      <Icon size={14} />
    </a>
  );
}
