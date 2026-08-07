import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-8">
          Have questions about our resources or need support with your downloads? We're here to help.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
              <p className="text-gray-600">support@skacademia.sn</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
              <p className="text-gray-600">+221 77 000 00 00</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Office</h3>
              <p className="text-gray-600">Dakar, Senegal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/2">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={5} className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg transition-colors text-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
