const STORAGE_KEY = 'bestech_testimonials';

export const defaultTestimonials = [
  {
    text: 'Honestly, I was skeptical at first but these guys really know their stuff. They fixed our entire IT mess and saved us a ton of money. The team was always available when we needed them and explained everything in simple terms.',
    author: 'Nic Christofis',
    position: 'IT Manager, Local Business Solutions',
    avatar: '/client1.jpeg',
    rating: 5
  },
  {
    text: 'Working with this team was amazing! They built our custom software exactly how we wanted it, and it actually works better than we expected. The whole process was smooth and they kept us updated every step of the way.',
    author: 'Voila',
    position: 'Project Manager, Tech Startup',
    avatar: '/client2.jpeg',
    rating: 5
  },
  {
    text: "I can't recommend them enough! They helped us get our security up to standard and made sure we were compliant. The team was professional, patient, and really understood our needs. Worth every penny!",
    author: 'Negin',
    position: 'Operations Director, Healthcare Services',
    avatar: '/client3.jpeg',
    rating: 5
  },
  {
    text: "These guys are absolutely amazing! They took our outdated systems and completely modernized everything. The transformation was incredible and our productivity has skyrocketed. Couldn't be happier!",
    author: 'Xavien',
    position: 'IT Director, Tech Solutions Inc',
    avatar: '/client4.jpeg',
    rating: 5
  },
  {
    text: 'The digital transformation initiative led by Bestech Vision Vision revolutionized our customer experience. Their innovative solutions and dedicated support team delivered results that exceeded our KPIs by 60%.',
    author: 'James Wilson',
    position: 'CEO, E-commerce Solutions Inc',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    rating: 5
  },
  {
    text: 'Working with Bestech Vision Vision was a game-changer for our startup. Their technical expertise and strategic guidance helped us scale from 10 to 1000+ users in just 6 months.',
    author: 'Emily Johnson',
    position: 'Founder & CTO, TechStart Innovations',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format',
    rating: 5
  }
];

function isValidRow(row) {
  return row && typeof row.author === 'string' && typeof row.text === 'string';
}

export function loadTestimonials() {
  if (typeof localStorage === 'undefined') return defaultTestimonials;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultTestimonials;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultTestimonials;
    const rows = parsed.filter(isValidRow).map((r) => ({
      text: r.text || '',
      author: r.author || '',
      position: r.position || '',
      avatar: r.avatar || '',
      rating: Number(r.rating) > 0 ? Number(r.rating) : 5
    }));
    return rows.length > 0 ? rows : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

export function saveTestimonials(rows) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}
