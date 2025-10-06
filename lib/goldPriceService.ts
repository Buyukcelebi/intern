
interface GoldPriceResponse {
  price: number;
  timestamp: string;
}

let cachedPrice: number | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getGoldPricePerGram(): Promise<number> {
  const now = Date.now();
  
  if (cachedPrice && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedPrice;
  }

  try {
    const response = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: {
        'x-access-token': 'goldapi-demo'
      },
      next: { revalidate: 300 }
    }).catch(() => null);

    if (response?.ok) {
      const data = await response.json();
      const pricePerOunce = data.price || 2000;
      const pricePerGram = pricePerOunce / 31.1035;
      
      cachedPrice = pricePerGram;
      cacheTimestamp = now;
      
      return pricePerGram;
    }
    
    const fallbackPricePerOunce = 2050;
    const pricePerGram = fallbackPricePerOunce / 31.1035;
    
    cachedPrice = pricePerGram;
    cacheTimestamp = now;
    
    return pricePerGram;
  } catch (error) {
    console.error('Error fetching gold price:', error);
    
    return cachedPrice || 64.3;
  }
}

export async function calculateProductPrice(
  popularityScore: number,
  weight: number
): Promise<number> {
  const goldPrice = await getGoldPricePerGram();
  const price = (popularityScore + 1) * weight * goldPrice;
  
  return Math.round(price * 100) / 100;
}

