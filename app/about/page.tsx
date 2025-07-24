import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 md:h-96">
        <Image src="/placeholder.svg?height=400&width=1920" alt="Balenciaga Atelier" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-light tracking-wider text-center">ABOUT BISCENIC</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-20">
            <div>
              <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-6 tracking-wide">OUR HERITAGE</h2>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Founded by visionary designer Lomon Christopher, Biscenic was born from a relentless pursuit of
                artistry, form, and human connection. More than a design house, Biscenic stands as a sanctuary where
                craftsmanship meets sensory innovation.
              </p>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Rooted in the belief that furniture transcends function, Biscenic redefines living spaces as immersive
                artforms—crafted with precision, emotion, and a devotion to timeless beauty. Revered for harmonizing
                architectural grace with modern technology, Biscenic transforms the ordinary into profound expressions
                of comfort and style.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                With each creation, Biscenic carries forward a legacy of bold imagination—an evolving testament to
                design that speaks, stirs, and remains.
              </p>
            </div>
            <div className="relative aspect-square">
              <Image src="/images/biscenic-logo.png" alt="Biscenic Logo" fill className="object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 md:mb-20">
            <div className="relative aspect-square order-2 lg:order-1">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Modern Balenciaga"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-6 tracking-wide">MODERN VISION</h2>
              <p className="text-gray-700 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                Today, under the creative direction of Demna, Balenciaga continues to push boundaries while honoring its
                founder's legacy of innovation and craftsmanship.
              </p>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Our commitment to excellence extends beyond design to encompass sustainability, ethical practices, and a
                vision for the future of luxury fashion.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6 md:mb-8 tracking-wide">OUR VALUES</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-4 tracking-wide">INNOVATION</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Pushing the boundaries of fashion through cutting-edge design and technology.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-4 tracking-wide">CRAFTSMANSHIP</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Maintaining the highest standards of quality and attention to detail.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-4 tracking-wide">SUSTAINABILITY</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Committed to responsible practices and environmental stewardship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
