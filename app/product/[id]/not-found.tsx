import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      <h1 className="font-serif text-3xl font-bold text-velora-black md:text-4xl">Product unavailable</h1>
      <p className="mt-4 max-w-md text-gray-600">
        This item could not be loaded. It may have been removed, or the catalog is still updating.
      </p>
      <Link href="/products" className="mt-8">
        <Button size="lg">Back to shop</Button>
      </Link>
    </div>
  );
}
