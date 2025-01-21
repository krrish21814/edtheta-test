import Link from "next/link";

export function Footer() {
  const footerLinks = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    Support: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/faqs" },
      { label: "Partner Support", href: "/partner-support" },
    ],
  };

  return (
    <footer className='bg-gray-50 border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <h3 className='text-2xl font-bold text-emerald-600'>Edtheta</h3>
            <p className='mt-4 text-gray-600'>
              Using modern technology to transform education for students and
              simplify school management worldwide.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className='font-semibold text-gray-900 mb-4'>{category}</h4>
              <ul className='space-y-2'>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-600 hover:text-emerald-600'>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='mt-8 pt-8 border-t text-center text-gray-600'>
          <p>© {new Date().getFullYear()} Edtheta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
