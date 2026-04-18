import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-br from-[#1E3A5F] to-[#2C5282]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            About the Coach
          </h1>
          <p className="text-xl text-orange-200">
            Transforming Leaders, Building Legacies
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 text-gray-800 mb-20">
            <p className="font-serif text-2xl leading-relaxed">
              With over 15 years of experience in executive leadership and business transformation, I've helped hundreds of entrepreneurs and executives break through barriers and achieve extraordinary results. My approach combines proven business strategies with personalized coaching methodologies that drive real, measurable outcomes.
            </p>
            <p className="font-serif text-2xl leading-relaxed">
              I believe that every business leader has untapped potential waiting to be unleashed. Through our partnership, you'll gain clarity on your vision, develop actionable strategies, and build the confidence to make bold decisions that propel your business forward.
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-12">
            <div className="text-center">
              <div className="text-7xl font-bold text-[#1E3A5F] mb-2">500+</div>
              <div className="text-gray-600 font-medium">Clients Coached</div>
            </div>
            <div className="text-center">
              <div className="text-7xl font-bold text-[#1E3A5F] mb-2">15</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-7xl font-bold text-[#1E3A5F] mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-7xl font-bold text-[#1E3A5F] mb-2">$50M+</div>
              <div className="text-gray-600 font-medium">Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Let's work together to unlock your full potential and achieve extraordinary results.
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
            Schedule a Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
