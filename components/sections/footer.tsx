import { Facebook, Heart, Instagram, Twitter } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-zinc-900 text-white pt-14">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-white/70">
            <li>About us</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-white/70">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Ride with us</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-white/70">
            <li>Terms & Conditions</li>
            <li>Refund & Cancellation</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow us</h4>
          <div className="text-white/70 flex gap-3"><Facebook/> <Instagram/> <Twitter/> </div>
          <h4 className="font-semibold mt-6 mb-3">Receive exclusive offers in your mailbox</h4>
          <form className="flex gap-2">
            <input placeholder="Enter Your email" className="flex-1 rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60" />
            <button className="rounded-xl bg-foodSecondary hover:bg-foodPrimary px-4 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(255,179,14,0.35)]">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col md:flex-row items-center justify-between text-white/70 text-sm">
          <p>All rights Reserved © Your Company, 2021</p>
          <p>Made with ❤️ by Themewagon</p>
        </div>
      </div>
    </footer>
  );
}
