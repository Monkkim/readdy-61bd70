import { useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO, TechVentures Inc',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20confident%20female%20CEO%20in%20her%2040s%20with%20short%20brown%20hair%20wearing%20navy%20blazer%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20natural%20smile%2C%20business%20executive%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-001&orientation=squarish',
    rating: 5,
    title: 'Transformed Our Company Culture',
    text: 'Working with this coach completely transformed how we approach leadership and team dynamics. Our revenue increased by 150% in just 18 months, and our team engagement scores have never been higher.'
  },
  {
    name: 'Michael Chen',
    role: 'Founder, GrowthLabs',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20Asian%20male%20entrepreneur%20in%20his%2030s%20with%20black%20hair%20wearing%20gray%20suit%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20confident%20expression%2C%20business%20founder%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-002&orientation=squarish',
    rating: 5,
    title: 'Best Investment I Ever Made',
    text: 'The strategic insights and accountability I received were game-changing. I finally broke through the revenue plateau that had been holding my business back for years. Highly recommend to any serious entrepreneur.'
  },
  {
    name: 'Jennifer Rodriguez',
    role: 'VP of Operations, Innovate Corp',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20Hispanic%20female%20executive%20in%20her%2030s%20with%20long%20dark%20hair%20wearing%20white%20blouse%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20warm%20smile%2C%20business%20leader%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-003&orientation=squarish',
    rating: 5,
    title: 'Clarity and Confidence',
    text: 'I gained the clarity and confidence I needed to step into a VP role. The coaching sessions helped me develop a leadership style that feels authentic and effective. My team has noticed the difference immediately.'
  },
  {
    name: 'David Thompson',
    role: 'Managing Director, Summit Partners',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20Caucasian%20male%20executive%20in%20his%2050s%20with%20gray%20hair%20wearing%20dark%20suit%20and%20tie%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20professional%20demeanor%2C%20senior%20business%20leader%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-004&orientation=squarish',
    rating: 5,
    title: 'Exceptional Results',
    text: 'The ROI on this coaching investment has been phenomenal. Not only did we streamline our operations, but we also identified new revenue streams that added millions to our bottom line. Truly exceptional guidance.'
  },
  {
    name: 'Amanda Foster',
    role: 'Entrepreneur, Foster Consulting',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20blonde%20female%20entrepreneur%20in%20her%2040s%20wearing%20teal%20blazer%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20confident%20smile%2C%20business%20consultant%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-005&orientation=squarish',
    rating: 5,
    title: 'Life-Changing Experience',
    text: 'This coaching program gave me the tools and mindset shifts I needed to scale my consulting business. I went from overwhelmed solopreneur to leading a team of 12 in less than two years. Forever grateful.'
  },
  {
    name: 'Robert Kim',
    role: 'COO, NextGen Solutions',
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20Korean%20male%20executive%20in%20his%2040s%20with%20black%20hair%20wearing%20charcoal%20suit%2C%20clean%20white%20background%2C%20corporate%20photography%20style%2C%20serious%20expression%2C%20business%20operations%20leader%2C%20high-end%20professional%20photo&width=200&height=200&seq=avatar-006&orientation=squarish',
    rating: 5,
    title: 'Strategic Breakthrough',
    text: 'The strategic planning sessions helped us pivot our business model at exactly the right time. We avoided a major market downturn and positioned ourselves as industry leaders. Invaluable expertise and support.'
  }
];

export default function TestimonialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider">
              Client Success Stories
            </p>
          </div>
          <h1 className="font-serif text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trusted by Leaders
            <br />
            Across Industries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our coaching programs have transformed businesses and careers. 
            Real stories from real leaders who achieved extraordinary results.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill text-orange-500 text-lg"></i>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{testimonial.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow" style={{ lineHeight: '1.6' }}>
                  {testimonial.text}
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Write Your
            <br />
            Success Story?
          </h2>
          <p className="text-xl text-orange-50 mb-10 leading-relaxed">
            Join hundreds of leaders who have transformed their businesses and careers 
            through our proven coaching programs.
          </p>
          <button className="bg-white text-orange-600 px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap shadow-lg">
            Schedule Your Consultation
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
