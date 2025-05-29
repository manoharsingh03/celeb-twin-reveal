
// Celebrity dataset with precomputed embeddings
export interface Celebrity {
  name: string;
  imageUrl: string;
  embedding?: number[];
  description: string;
}

export const celebrities: Celebrity[] = [
  {
    name: "Chris Hemsworth",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Thor himself! You've got that godly charm and strong jawline."
  },
  {
    name: "Emma Stone",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Witty, charming, and absolutely radiant - just like the Oscar winner!"
  },
  {
    name: "Ryan Gosling",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Cool, mysterious, and effortlessly handsome. Hey girl, you look amazing!"
  },
  {
    name: "Zendaya",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Stunning, talented, and absolutely iconic - you're a true star!"
  },
  {
    name: "Michael B. Jordan",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Charismatic and powerful - you've got that leading man energy!"
  },
  {
    name: "Scarlett Johansson",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    description: "Bold, beautiful, and absolutely captivating - a true Hollywood icon!"
  },
  {
    name: "Tom Holland",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    description: "Youthful energy and charm - you've got that friendly neighborhood appeal!"
  },
  {
    name: "Margot Robbie",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    description: "Radiant and versatile - you shine in every role you take on!"
  },
  {
    name: "Idris Elba",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    description: "Sophisticated and commanding - you've got that distinguished presence!"
  },
  {
    name: "Gal Gadot",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    description: "Strong, graceful, and inspiring - a real-life wonder woman!"
  }
];
