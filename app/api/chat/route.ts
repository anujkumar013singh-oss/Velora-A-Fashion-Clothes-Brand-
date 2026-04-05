import { NextResponse } from "next/server";

const fashionKnowledge: Record<string, string> = {
  // Fabrics & Materials
  "silk": "Silk is a natural protein fiber produced by silkworms. Our premium Mulberry silk is known for its softness and subtle luster. Care: Hand wash in cold water or dry clean. Store flat or hanging to prevent creasing.",
  "linen": "Linen is made from flax fibers. It is highly breathable, absorbent, and ideal for warm weather. Our linen pieces are pre-washed for softness. Naturally wrinkles, which is part of its relaxed charm.",
  "cotton": "Organic cotton is used throughout our collections. It is breathable, durable, and becomes softer with every wash. Perfect for everyday wear and layering.",
  "velvet": "Velvet has a plush pile that catches light beautifully. Our crushed velvet has subtle sheen, perfect for evening wear. Avoid water and clean professionally.",
  "wool": "Merino wool is used for our knitwear. It is fine, soft, and naturally temperature-regulating. Can be worn in multiple seasons. Hand wash or dry clean.",
  "leather": "Genuine leather develops a beautiful patina over time. Care: Wipe clean with damp cloth. Condition seasonally. Store in breathable garment bags.",
  "cashmere": "Cashmere comes from the undercoat of cashmere goats. Our grade-A cashmere is incredibly soft and lightweight. Hand wash cold or dry clean for longevity.",
  
  // Style & Trends
  "minimalist": "Minimalism focuses on clean lines, neutral colors, and timeless pieces. Build a capsule wardrobe with structured blazers, silk shirts, tailored trousers, and quality basics.",
  "bohemian": "Boho style features flowy silhouettes, floral prints, and eclectic patterns. Think maxi dresses, loose-fitting tops, and layered jewelry.",
  "classic": "Classic style emphasizes timeless elegance. Invest in trench coats, little black dresses, white button-downs, and quality basics that transcend seasons.",
  "streetwear": "Streetwear blends urban culture with high fashion. Features include oversized silhouettes, bold logos, casual fabrics, and sneakers.",
  "formal": "Formal wear includes tuxedos, evening gowns, and business suits. Black tie events call for floor-length gowns or sleek cocktail dresses.",
  
  // Care Instructions
  "wash": "General care: Hand wash cold or dry clean. Always check the care label. Use mild detergent. Do not wring. Lay flat to dry or hang carefully.",
  "store": "Store clothes in a cool, dry place. Use padded hangers for delicate items. Fold knits to prevent stretching. Keep leather items breathable.",
  "iron": "Iron inside out on appropriate heat setting. Use a press cloth for silk and delicate fabrics. Steam for wrinkle removal.",
  
  // Sizing & Fit
  "size guide": "Our sizes range from XS to XL. Measure bust, waist, and hips. Compare measurements to our size guide for best fit.",
  "measure": "Bust: measure around the fullest part. Waist: narrowest part of torso. Hips: widest part of lower body. Use soft measuring tape.",
  "fit": "Our cuts are designed to be relaxed yet tailored. Size up for a more relaxed fit, size down for a fitted look.",
  
  // Collections
  "summer": "Summer Edit features breathable fabrics like linen and cotton. Includes flowy dresses, lightweight trousers, and casual shorts.",
  "workwear": "Workwear includes tailored blazers, structured dresses, and elegant trousers. Professional yet stylish for the office.",
  "partywear": "Partywear features sequins, velvet, and silk. From cocktail dresses to elegant gowns for special occasions.",
  "luxe": "Luxe Edit showcases premium pieces with exquisite craftsmanship. Fine materials and timeless designs.",
  
  // Color Matching
  "color matching": "Neutral colors like black, white, beige, and navy are versatile foundations. Complementary colors create contrast. Monochromatic looks elongate the silhouette.",
  "neutrals": "Black, white, beige, gray, and navy pair with everything. Build your wardrobe foundation with these versatile shades.",
  
  // Layering
  "layering": "Start with a base layer, add insulating pieces, and finish with outerwear. Mix textures for visual interest. Consider proportion and balance.",
  
  // Accessories
  "accessories": "Accessories complete an outfit. Choose statement pieces or subtle accents based on occasion. Quality over quantity.",
  "shoes": "Neutral pumps, ankle boots, and elegant sneakers are versatile. Match metal tones with other accessories.",
};

const greetings = [
  "Hello. I am your AI Stylist. How can I assist with your fashion questions today?",
  "Welcome. I am here to help with styling, fabric care, and fashion advice. What would you like to know?",
];

const stylingAdvice = [
  "A classic white button-down pairs perfectly with tailored trousers for an elegant look.",
  "A structured blazer over a silk slip dress creates a chic layered ensemble.",
  "Accessories transform any outfit. A statement necklace or bold earrings add instant personality.",
  "Mix textures for visual interest. Pair leather with silk, or wool with cotton.",
  "Quality basics form the foundation of a versatile wardrobe.",
];

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const lowerMsg = message.toLowerCase();
    
    let response = "";
    
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
      response = greetings[Math.floor(Math.random() * greetings.length)];
    } else {
      for (const [keyword, answer] of Object.entries(fashionKnowledge)) {
        if (lowerMsg.includes(keyword)) {
          response = answer;
          break;
        }
      }
    }
    
    if (!response) {
      if (lowerMsg.includes("outfit") || lowerMsg.includes("wear") || lowerMsg.includes("style")) {
        response = "I would be happy to help with outfit suggestions. What is the occasion, season, or weather you are dressing for?";
      } else if (lowerMsg.includes("color") || lowerMsg.includes("match")) {
        response = "For color matching guidance, consider the occasion and your existing wardrobe. Would you like specific advice for an outfit?";
      } else if (lowerMsg.includes("trend") || lowerMsg.includes("fashion")) {
        response = "Current trends focus on sustainable fashion, relaxed tailoring, and timeless pieces. What specific trend would you like to know about?";
      } else if (lowerMsg.includes("accessor") || lowerMsg.includes("shoe") || lowerMsg.includes("bag")) {
        response = "Accessories complete an outfit. What type of accessory are you looking to pair with your outfit?";
      } else if (lowerMsg.includes("what") || lowerMsg.includes("which")) {
        response = "That is a good question. Could you tell me more about the occasion or your style preferences?";
      } else if (lowerMsg.includes("how")) {
        response = "I would be glad to guide you. Our style experts recommend starting with quality basics. What specific advice do you need?";
      } else if (lowerMsg.includes("recommend") || lowerMsg.includes("suggest") || lowerMsg.includes("advice")) {
        response = "For personalized recommendations, I would like to learn more about your style. What colors and silhouettes do you prefer?";
      } else {
        response = stylingAdvice[Math.floor(Math.random() * stylingAdvice.length)];
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));
    
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
