import { Footer, Button } from "@/app/components";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-light mb-8">Get In Touch</h1>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-light mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-light mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-light mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                placeholder="Your message..."
              />
            </div>

            <Button type="submit" variant="primary">
              Send Message
            </Button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
