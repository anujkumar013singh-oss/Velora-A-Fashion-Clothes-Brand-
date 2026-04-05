const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Expanded Image Collection with specific mapping
// Note: Using existing valid Unsplash URLs + new ones found
const NOUN_IMAGES = {
  // DRESSES
  'Gown': [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', // Red gown lifestyle
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800', // Formal event lifestyle
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', // Blue dress lifestyle
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800', // Elegant white dress
  ],
  'Mini Dress': [
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=800', // Silk mini dress
    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800', // Black mini dress lifestyle
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', // Casual mini dress
  ],
  'Midi Dress': [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', // Floral midi lifestyle
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800', // Elegant midi
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800'
  ],
  'Maxi Dress': [
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', // Summer maxi lifestyle
    'https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800', // Flowy maxi
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800'
  ],
  'Slip Dress': [
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=800', // Satin slip dress
    'https://images.unsplash.com/photo-1589363359676-0f33198083a6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800'
  ],

  // TOPS
  'Blouse': [
    'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?auto=format&fit=crop&q=80&w=800', // White blouse lifestyle
    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800', // Silk blouse
    'https://images.unsplash.com/photo-1589363359676-0f33198083a6?auto=format&fit=crop&q=80&w=800'
  ],
  'Shirt': [
    'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&q=80&w=800', // Linen shirt lifestyle
    'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800' // Casual shirt lifestyle
  ],
  'Camisole': [
    'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800'
  ],
  'Tunic': [
    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1551163943-3f6a29e3945a?auto=format&fit=crop&q=80&w=800'
  ],

  // BOTTOMS
  'Trousers': [
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', // Wide leg trousers lifestyle
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800', // Tailored trousers
    'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800'
  ],
  'Skirt': [
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800', // Satin skirt lifestyle
    'https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1582142325950-b05ce2291d25?auto=format&fit=crop&q=80&w=800'
  ],
  'Shorts': [
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800', // Denim shorts lifestyle
    'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&q=80&w=800'
  ],
  'Pants': [
    'https://images.unsplash.com/photo-1584370848010-d7cc637703ef?auto=format&fit=crop&q=80&w=800', // Cargo pants lifestyle
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800'
  ],

  // OUTERWEAR
  'Coat': [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800', // Beige coat lifestyle
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', // Jacket lifestyle
    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
  ],
  'Jacket': [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', // Bomber jacket lifestyle
    'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80&w=800', // Denim jacket lifestyle
    'https://images.unsplash.com/photo-1548126466-4470dfd3a209?auto=format&fit=crop&q=80&w=800'
  ],
  'Blazer': [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800' // Oversized blazer lifestyle
  ],
  'Trench': [
    'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800', // Trench coat lifestyle
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800'
  ],

  // ACCESSORIES
  'Bag': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800', // Leather bag
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
  ],
  'Clutch': [
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
  ],
  'Scarf': [
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800'
  ],
  'Belt': [
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
  ],

  // KNITWEAR
  'Sweater': [
    'https://images.unsplash.com/photo-1624451000854-324b9122822a?auto=format&fit=crop&q=80&w=800', // Cable knit lifestyle
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800', // Oversized sweater lifestyle
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
  ],
  'Cardigan': [
    'https://images.unsplash.com/photo-1624451000854-324b9122822a?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800'
  ],
  'Pullover': [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
  ]
}

const CATEGORIES = ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Knitwear']
const ADJECTIVES = ['Elegant', 'Timeless', 'Modern', 'Classic', 'Chic', 'Sophisticated', 'Luxurious', 'Minimalist', 'Structured', 'Flowy', 'Opulent', 'Refined', 'Effortless', 'Tailored']
const NOUNS_BY_CATEGORY = {
  'Dresses': ['Gown', 'Mini Dress', 'Midi Dress', 'Maxi Dress', 'Slip Dress'],
  'Tops': ['Blouse', 'Shirt', 'Camisole', 'Tunic'],
  'Bottoms': ['Trousers', 'Skirt', 'Shorts', 'Pants'],
  'Outerwear': ['Coat', 'Jacket', 'Blazer', 'Trench'],
  'Accessories': ['Bag', 'Clutch', 'Scarf', 'Belt'],
  'Knitwear': ['Sweater', 'Cardigan', 'Pullover']
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateProduct(isTrending = false, collectionId = null) {
  const category = getRandomItem(CATEGORIES)
  const adj = getRandomItem(ADJECTIVES)
  const noun = getRandomItem(NOUNS_BY_CATEGORY[category] || ['Item'])
  const name = `${adj} ${noun}`
  
  // Get suitable image based on Noun
  const nounImages = NOUN_IMAGES[noun] || NOUN_IMAGES['Gown'] // Fallback
  const image = getRandomItem(nounImages)
  
  // Add a second random image from the same noun category to simulate gallery
  const image2 = getRandomItem(nounImages)
  const images = image === image2 ? image : `${image},${image2}`

  return {
    name,
    price: Math.floor(Math.random() * 800) + 100,
    description: `A ${adj.toLowerCase()} ${noun.toLowerCase()} crafted from the finest materials. This piece exemplifies VELORA's commitment to quality and style. Perfect for the modern wardrobe.`,
    images, // Store as comma separated string if multiple, but schema might expect string. The page splits by comma.
    category,
    tags: isTrending ? 'Trending' : (Math.random() > 0.7 ? 'New' : ''),
    collectionId,
    rating: 4.0 + Math.random(),
    reviews: Math.floor(Math.random() * 50)
  }
}

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.learningModule.deleteMany()

  // Create Collections
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        name: 'Summer Edit',
        slug: 'summer-edit',
        subtext: 'Breezy, elegant styles for the season',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      }
    }),
    prisma.collection.create({
      data: {
        name: 'Luxe Edit',
        slug: 'luxe-edit',
        subtext: 'Premium materials, timeless cuts',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      }
    }),
    prisma.collection.create({
      data: {
        name: 'Workwear',
        slug: 'workwear',
        subtext: 'Sophisticated office essentials',
        image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800',
      }
    }),
    prisma.collection.create({
      data: {
        name: 'Partywear',
        slug: 'partywear',
        subtext: 'Statement pieces for the night',
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
      }
    }),
  ])

  const allProducts = []

  // Add specific product for Summer Edit second preview box
  allProducts.push({
    name: 'Elegant Gown',
    price: 450,
    description: 'A stunning gown crafted from the finest materials.',
    images: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    category: 'Dresses',
    tags: '',
    collectionId: collections[0].id, // Summer Edit
    rating: 4.5,
    reviews: 23
  })

  // Generate 60 Trending Products
  for (let i = 0; i < 60; i++) {
    allProducts.push(generateProduct(true, collections[i % 4].id))
  }

  // Generate 150 Collection Products
  for (let i = 0; i < 150; i++) {
    allProducts.push(generateProduct(false, collections[i % 4].id))
  }

  // Batch insert
  for (const p of allProducts) {
    await prisma.product.create({ data: p })
  }

  // Learning Modules (4 boxes as requested)
  const learningModules = [
    {
      title: 'The Art of Silk',
      description: 'Understanding the origins and care of premium silk.',
      image: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?auto=format&fit=crop&q=80&w=800',
      category: 'Materials'
    },
    {
      title: 'Sustainable Luxury',
      description: 'How ethical sourcing is reshaping the future of fashion.',
      image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800',
      category: 'Sustainability'
    },
    {
      title: 'Wardrobe Essentials',
      description: 'Building a capsule wardrobe that stands the test of time.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      category: 'Styling'
    },
    {
      title: 'History of Haute Couture',
      description: 'A deep dive into the legendary houses of Paris.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800',
      category: 'History'
    }
  ];

  for (const module of learningModules) {
    await prisma.learningModule.create({ data: module })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
