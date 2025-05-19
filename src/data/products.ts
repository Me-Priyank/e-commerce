// Sample product data
export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  colors: string[];
  sizes?: string[];
  category: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  date: string;
}

const products: Product[] = [
  {
    id: 'saree1',
    name: 'Embroidered Silk Saree',
    price: 15000,
    images: [
      'https://images.pexels.com/photos/7772528/pexels-photo-7772528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10983781/pexels-photo-10983781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10983778/pexels-photo-10983778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10983766/pexels-photo-10983766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['pink', 'gold', 'white'],
    sizes: ['Free Size'],
    category: 'Saree',
    description: 'Handcrafted pure silk saree with intricate embroidery work. The delicate floral patterns are meticulously hand-embroidered by master artisans using traditional techniques. Perfect for weddings and special occasions.',
    isNew: true,
    date: '2023-09-15'
  },
  {
    id: 'saree2',
    name: 'Banarasi Silk Saree',
    price: 22500,
    images: [
      'https://images.pexels.com/photos/5839215/pexels-photo-5839215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889784/pexels-photo-10889784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889790/pexels-photo-10889790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889792/pexels-photo-10889792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['blue', 'gold'],
    sizes: ['Free Size'],
    category: 'Saree',
    description: 'Exquisite Banarasi silk saree featuring traditional motifs woven in real gold zari. This luxurious piece represents the finest of Indian craftsmanship, showcasing intricate patterns that tell stories of our rich cultural heritage.',
    date: '2023-07-20'
  },
  {
    id: 'saree3',
    name: 'Designer Georgette Saree',
    price: 12000,
    images: [
      'https://images.pexels.com/photos/10889793/pexels-photo-10889793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889795/pexels-photo-10889795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889796/pexels-photo-10889796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/10889797/pexels-photo-10889797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['pink', 'white'],
    sizes: ['Free Size'],
    category: 'Saree',
    description: 'Lightweight georgette saree with contemporary embellishment and design. Perfect blend of traditional aesthetics with modern sensibilities. Ideal for evening parties and festive celebrations.',
    isSale: true,
    discount: 15,
    date: '2023-05-10'
  },
  {
    id: 'lehenga1',
    name: 'Bridal Lehenga Set',
    price: 45000,
    images: [
      'https://images.pexels.com/photos/2950650/pexels-photo-2950650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2950655/pexels-photo-2950655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2950654/pexels-photo-2950654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2950651/pexels-photo-2950651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['red', 'gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Lehenga',
    description: 'Opulent bridal lehenga set featuring heavy zardozi work, crystal embellishments, and intricate thread embroidery. The set includes a lehenga, choli, and dupatta, all crafted from the finest fabrics and adorned with traditional motifs.',
    isNew: true,
    date: '2023-10-05'
  },
  {
    id: 'lehenga2',
    name: 'Festive Lehenga Choli',
    price: 28000,
    images: [
      'https://images.pexels.com/photos/3075797/pexels-photo-3075797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3075769/pexels-photo-3075769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3075784/pexels-photo-3075784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3075756/pexels-photo-3075756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['green', 'gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Lehenga',
    description: 'Elegant festive lehenga featuring a mix of contemporary design and traditional craftsmanship. The vibrant colors and sophisticated embellishments make it perfect for festive celebrations and special occasions.',
    date: '2023-08-15'
  },
  {
    id: 'kaftan1',
    name: 'Embellished Silk Kaftan',
    price: 18500,
    images: [
      'https://images.pexels.com/photos/2797086/pexels-photo-2797086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/9693696/pexels-photo-9693696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/9693698/pexels-photo-9693698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/9693699/pexels-photo-9693699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['blue', 'gold'],
    sizes: ['S', 'M', 'L'],
    category: 'Kaftan',
    description: 'Luxurious silk kaftan with hand-embellished details and elegant draping. The perfect blend of comfort and sophistication, ideal for both formal events and elegant dinner parties.',
    date: '2023-09-25'
  },
  {
    id: 'kaftan2',
    name: 'Printed Resort Kaftan',
    price: 9500,
    images: [
      'https://images.pexels.com/photos/8386668/pexels-photo-8386668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/8386673/pexels-photo-8386673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/8386674/pexels-photo-8386674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/8386675/pexels-photo-8386675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['white', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Kaftan',
    description: 'Lightweight printed kaftan perfect for resort wear. Features vibrant prints inspired by Indian heritage but with a contemporary twist. Made from breathable fabrics for comfort in warm weather.',
    isSale: true,
    discount: 20,
    date: '2023-06-10'
  },
  {
    id: 'palazzo1',
    name: 'Embroidered Palazzo Set',
    price: 12500,
    images: [
      'https://images.pexels.com/photos/2408666/pexels-photo-2408666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5582215/pexels-photo-5582215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5582219/pexels-photo-5582219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5582222/pexels-photo-5582222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['pink', 'gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Palazzo',
    description: 'Elegant palazzo set featuring a kurta with intricate embroidery and matching palazzo pants. The contemporary silhouette combined with traditional embellishments makes it perfect for semi-formal occasions.',
    date: '2023-07-05'
  },
  {
    id: 'jacket1',
    name: 'Embroidered Silk Jacket',
    price: 19000,
    images: [
      'https://images.pexels.com/photos/2058386/pexels-photo-2058386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2058356/pexels-photo-2058356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2058383/pexels-photo-2058383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2058382/pexels-photo-2058382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['blue', 'gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Jacket',
    description: 'Luxurious silk jacket with intricate hand embroidery and traditional motifs. Can be paired with various outfits to add an elegant layer for special occasions and festivities.',
    isNew: true,
    date: '2023-10-15'
  },
  {
    id: 'jacket2',
    name: 'Velvet Embellished Jacket',
    price: 21500,
    images: [
      'https://images.pexels.com/photos/7389033/pexels-photo-7389033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7389031/pexels-photo-7389031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7389034/pexels-photo-7389034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7389035/pexels-photo-7389035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['maroon', 'gold'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Jacket',
    description: 'Opulent velvet jacket with elaborate embellishments and embroidery. The rich fabric and detailing make it a statement piece for weddings and formal events.',
    date: '2023-08-20'
  },
  {
    id: 'sharara1',
    name: 'Designer Sharara Set',
    price: 16500,
    images: [
      'https://images.pexels.com/photos/5816034/pexels-photo-5816034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5816025/pexels-photo-5816025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5816024/pexels-photo-5816024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5816019/pexels-photo-5816019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['green', 'gold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Sharara',
    description: 'Contemporary sharara set featuring a stylish kurta, wide-legged sharara pants, and a matching dupatta. The modern silhouette combined with traditional elements makes it perfect for festive occasions.',
    isSale: true,
    discount: 10,
    date: '2023-06-25'
  },
  {
    id: 'cape1',
    name: 'Embellished Cape Gown',
    price: 23500,
    images: [
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2112649/pexels-photo-2112649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2112651/pexels-photo-2112651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2112652/pexels-photo-2112652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    colors: ['blue', 'silver'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Cape',
    description: 'Elegant gown with an attached cape, featuring intricate embellishments and a flowing silhouette. The contemporary design with traditional elements makes it perfect for gala events and special occasions.',
    isNew: true,
    date: '2023-09-10'
  }
];

// Get featured products (newest and sale items)
export const featuredProducts = products.filter(product => product.isNew || product.isSale);

// Get all products
export const getAllProducts = () => products;

// Get product by ID
export const getProductById = (id: string) => products.find(product => product.id === id);

// Get related products
export const getRelatedProducts = (id: string, category: string) => {
  return products
    .filter(product => product.id !== id && product.category === category)
    .slice(0, 4);
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};