import { Footer, Button } from "@/app/components";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light mb-12">Shopping Cart</h1>

          <div className="border border-white/10 p-8 text-center">
            <p className="text-gray-400 mb-6">Your cart is empty</p>
            <Button href="/collections" variant="primary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
