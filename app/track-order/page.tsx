import { Button } from "@/components/ui/Button";

export default function TrackOrderPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 shadow-sm max-w-lg w-full rounded-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Track Your Order</h1>
          <p className="text-gray-500">Enter your order details below to check the status.</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Order ID</label>
            <input 
              type="text" 
              placeholder="e.g. VEL-12345" 
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-velora-black transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              placeholder="email@example.com" 
              className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:border-velora-black transition-colors"
            />
          </div>
          <Button className="w-full py-4">Track Order</Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
           <p className="text-sm text-gray-500 mb-2">Need help?</p>
           <a href="/about" className="text-sm font-bold border-b border-black pb-1 hover:text-velora-wine hover:border-velora-wine transition-colors">Contact Support</a>
        </div>
      </div>
    </div>
  );
}
