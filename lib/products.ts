export interface Product {
  id: number | string
  name: string
  price: string
  image: string
  category: string
  path: string
  description?: string
  images?: string[]
  video?: string
}

export const allProducts: Product[] = [
  {
    id: "lumivase",
    name: "LumiVase",
    price: "$1,600",
    image: "/images/lumivase-bonsai.png",
    category: "vases",
    path: "/products/lumivase",
    description:
      "The Lumivase is a revolutionary piece that blends natural beauty with modern technology. It features a meticulously crafted bonsai tree encased in a clear, illuminated display, creating a serene and captivating focal point for any room. The integrated LED lighting enhances the intricate details of the bonsai, bringing a touch of nature indoors with a contemporary twist.",
    images: [
      "/images/lumivase-bonsai.png",
      "/images/living-room-bonsai.png",
      "/images/living-room-bonsai-sofa.png",
      "/images/exhibition-bonsai-chair.png",
      "/images/bedroom-bonsai-dark.png",
      "/images/bedroom-bonsai-light.jpeg",
    ],
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-output-FBB4EFE2-3C8F-4AC1-BA2C-9DCF93DB8C64-aCyWsPwinrPikXKNKX1J6m8ktfLfz6.MOV",
  },
  {
    id: "modern-platform-bed",
    name: "Modern Platform Bed",
    price: "$2,800",
    image: "/images/modern-platform-bed.png",
    category: "beds",
    path: "/products/modern-platform-bed",
    description:
      "Experience unparalleled comfort and minimalist design with our Modern Platform Bed. Crafted from solid oak with a sleek, low-profile frame, it offers robust support and a contemporary aesthetic that complements any bedroom decor. Its integrated LED lighting creates a serene ambiance.",
    images: [
      "/images/modern-platform-bed.png",
      "/images/bed-light-wood-spheres.png",
      "/images/bed-dark-wood-platform.jpeg",
      "/images/bed-dark-wood-spheres.png",
      "/images/bed-rustic-wood.jpeg",
    ],
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-output-B5EF8C49-5F6E-4248-B770-B44009522226-D7mp1L22JlAj8KZbjx2ohW8cOvCz6p.mov",
  },
  {
    id: "crystal-display-vase",
    name: "Crystal Display Vase",
    price: "$850",
    image: "/images/crystal-vase.png",
    category: "vases",
    path: "/products/crystal-display-vase",
    description:
      "The Crystal Display Vase is a masterpiece of clarity and form, designed to showcase your most cherished items. Crafted from high-quality, lead-free crystal, its faceted surface catches and refracts light, creating a dazzling display. Perfect for floral arrangements or as a standalone sculptural piece.",
    images: ["/images/crystal-vase.png", "/images/crystal-vase-grey-base.png", "/images/crystal-vase-wood-base.jpeg"],
  },
  {
    id: "sculptural-coffee-table",
    name: "Sculptural Coffee Table",
    price: "$1,950",
    image: "/images/IMG_8312.PNG",
    category: "tables",
    path: "/products/sculptural-coffee-table",
    description:
      "A true statement piece, our Sculptural Coffee Table combines artistic form with functional design. Crafted from a unique blend of polished concrete and reclaimed wood, its organic curves and robust presence make it the focal point of any living space. Perfect for those who appreciate art in everyday objects.",
    images: ["/images/IMG_8312.PNG", "/images/212DC255-CF3B-4665-AF90-01E876129C0D.PNG", "/images/IMG_8437.jpg"],
  },
  {
    id: "collection-two",
    name: "Collection Two Bed",
    price: "$3,500",
    image: "/images/collection-two-bed.png",
    category: "beds",
    path: "/products/collection-two",
    description:
      "Introducing the centerpiece of Collection Two: a bed that redefines modern luxury. With its sleek lines, minimalist aesthetic, and plush upholstery, this bed is designed for ultimate comfort and sophisticated style. Crafted from premium materials, it promises a serene retreat and a striking focal point for any contemporary bedroom.",
    images: [
      "/images/collection-two-bed.png",
      "/images/collection-two-spherical-bed.png",
      "/images/bed-dark-wood-platform.jpeg",
      "/images/bed-rustic-wood.jpeg",
    ],
  },
]
