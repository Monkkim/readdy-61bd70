import { Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

const services = [
  {
    icon: 'ri-lightbulb-line',
    title: 'Strategic Planning',
    description: 'Develop comprehensive business strategies that align with your vision and drive sustainable growth in competitive markets.'
  },
  {
    icon: 'ri-team-line',
    title: 'Leadership Development',
    description: 'Enhance your leadership skills and build high-performing teams that execute with precision and passion.'
  },
  {
    icon: 'ri-line-chart-line',
    title: 'Performance Optimization',
    description: 'Identify bottlenecks and implement proven systems to maximize productivity and profitability across your organization.'
  },
  {
    icon: 'ri-compass-3-line',
    title: 'Career Transition',
    description: 'Navigate career changes with confidence and clarity, positioning yourself for success in new roles and industries.'
  },
  {
    icon: 'ri-focus-3-line',
    title: 'Executive Coaching',
    description: 'One-on-one coaching sessions tailored to C-suite executives facing complex business challenges and decisions.'
  },
  {
    icon: 'ri-rocket-line',
    title: 'Startup Acceleration',
    description: 'Fast-track your startup journey with expert guidance on scaling, fundraising, and building sustainable business models.'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">
            What We Offer
          </p>
          <h1 className="font-serif text-6xl font-bold text-gray-900 mb-6">
            Transform Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive coaching services designed to elevate your business performance and unlock your leadership potential.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <i className={`${service.icon} text-3xl text-orange-500 group-hover:text-white transition-colors`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <Link to="/" className="text-orange-500 font-semibold inline-flex items-center gap-2 cursor-pointer hover:gap-3 transition-all whitespace-nowrap">
                  Get Started
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Schedule a free consultation to discuss how our coaching services can help you achieve your goals.
          </p>
          <Link
            to="/"
            className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
