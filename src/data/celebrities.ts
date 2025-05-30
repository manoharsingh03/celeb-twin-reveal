
// Celebrity dataset with diverse backgrounds and film industries
export interface Celebrity {
  name: string;
  imageUrl: string;
  embedding?: number[];
  description: string;
  industry: string;
  region: string;
}

export const celebrities: Celebrity[] = [
  // Hollywood - Male
  {
    name: "Chris Hemsworth",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Thor himself! You've got that godly charm and strong jawline.",
    industry: "Hollywood",
    region: "Australia"
  },
  {
    name: "Ryan Gosling",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Cool, mysterious, and effortlessly handsome. Hey girl, you look amazing!",
    industry: "Hollywood",
    region: "Canada"
  },
  {
    name: "Michael B. Jordan",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Charismatic and powerful - you've got that leading man energy!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Tom Holland",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    description: "Youthful energy and charm - you've got that friendly neighborhood appeal!",
    industry: "Hollywood",
    region: "UK"
  },
  {
    name: "Idris Elba",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    description: "Sophisticated and commanding - you've got that distinguished presence!",
    industry: "Hollywood",
    region: "UK"
  },
  {
    name: "Robert Downey Jr",
    imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&crop=face",
    description: "Genius, billionaire, playboy, philanthropist vibes!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Leonardo DiCaprio",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    description: "Oscar-winning charm and timeless appeal!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Brad Pitt",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
    description: "Classic Hollywood handsomeness and charisma!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Will Smith",
    imageUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    description: "Fresh Prince energy with blockbuster star power!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Ryan Reynolds",
    imageUrl: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=400&h=400&fit=crop&crop=face",
    description: "Witty, charming, and irresistibly funny!",
    industry: "Hollywood",
    region: "Canada"
  },

  // Hollywood - Female
  {
    name: "Emma Stone",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Witty, charming, and absolutely radiant - just like the Oscar winner!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Zendaya",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Stunning, talented, and absolutely iconic - you're a true star!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Scarlett Johansson",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    description: "Bold, beautiful, and absolutely captivating - a true Hollywood icon!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Margot Robbie",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    description: "Radiant and versatile - you shine in every role you take on!",
    industry: "Hollywood",
    region: "Australia"
  },
  {
    name: "Gal Gadot",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    description: "Strong, graceful, and inspiring - a real-life wonder woman!",
    industry: "Hollywood",
    region: "Israel"
  },
  {
    name: "Jennifer Lawrence",
    imageUrl: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&h=400&fit=crop&crop=face",
    description: "Down-to-earth charm with incredible talent!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Emma Watson",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    description: "Intelligent, graceful, and inspirational - pure magic!",
    industry: "Hollywood",
    region: "UK"
  },
  {
    name: "Lupita Nyong'o",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    description: "Elegant, powerful, and absolutely stunning!",
    industry: "Hollywood",
    region: "Kenya"
  },
  {
    name: "Brie Larson",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    description: "Captain Marvel strength with incredible talent!",
    industry: "Hollywood",
    region: "USA"
  },
  {
    name: "Natalie Portman",
    imageUrl: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop&crop=face",
    description: "Brilliant, elegant, and timelessly beautiful!",
    industry: "Hollywood",
    region: "Israel"
  },

  // Bollywood - Male
  {
    name: "Shah Rukh Khan",
    imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop&crop=face",
    description: "The King of Bollywood! You've got that royal charm and charisma.",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Ranveer Singh",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    description: "Energetic, vibrant, and absolutely magnetic personality!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Hrithik Roshan",
    imageUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=400&fit=crop&crop=face",
    description: "Greek God looks with incredible dancing skills!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Ranbir Kapoor",
    imageUrl: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face",
    description: "Charming, talented, and effortlessly cool!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Vicky Kaushal",
    imageUrl: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=400&fit=crop&crop=face",
    description: "Intense, passionate, and incredibly talented!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Kartik Aaryan",
    imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face",
    description: "Fresh face with incredible charm and wit!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Sidharth Malhotra",
    imageUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    description: "Handsome, charming, and student of the year vibes!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Tiger Shroff",
    imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=face",
    description: "Action hero looks with incredible athleticism!",
    industry: "Bollywood",
    region: "India"
  },

  // Bollywood - Female
  {
    name: "Deepika Padukone",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face",
    description: "Elegant, graceful, and absolutely stunning - Bollywood royalty!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Alia Bhatt",
    imageUrl: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop&crop=face",
    description: "Young, talented, and incredibly versatile actress!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Priyanka Chopra",
    imageUrl: "https://images.unsplash.com/photo-1524638431109-93d95c968f03?w=400&h=400&fit=crop&crop=face",
    description: "Global icon with incredible talent and beauty!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Katrina Kaif",
    imageUrl: "https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=400&h=400&fit=crop&crop=face",
    description: "Beautiful, graceful, and absolutely mesmerizing!",
    industry: "Bollywood",
    region: "UK"
  },
  {
    name: "Kareena Kapoor",
    imageUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&h=400&fit=crop&crop=face",
    description: "Bollywood royalty with timeless beauty and style!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Anushka Sharma",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=400&fit=crop&crop=face",
    description: "Natural beauty with incredible acting prowess!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Shraddha Kapoor",
    imageUrl: "https://images.unsplash.com/photo-1518110925495-f977721e4dec?w=400&h=400&fit=crop&crop=face",
    description: "Sweet, charming, and incredibly talented!",
    industry: "Bollywood",
    region: "India"
  },
  {
    name: "Jacqueline Fernandez",
    imageUrl: "https://images.unsplash.com/photo-1505033575518-a36ea2ef75ae?w=400&h=400&fit=crop&crop=face",
    description: "Stunning beauty with incredible dance moves!",
    industry: "Bollywood",
    region: "Sri Lanka"
  },

  // Tollywood - Male
  {
    name: "Prabhas",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3847ae2c9d05?w=400&h=400&fit=crop&crop=face",
    description: "Baahubali strength with incredible screen presence!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Allu Arjun",
    imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=face",
    description: "Stylish star with incredible dancing and acting skills!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Ram Charan",
    imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop&crop=face",
    description: "Mega power star with incredible charisma!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Jr. NTR",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=face",
    description: "Young tiger with powerful acting and dancing!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Mahesh Babu",
    imageUrl: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=400&h=400&fit=crop&crop=face",
    description: "Prince of Tollywood with charming personality!",
    industry: "Tollywood",
    region: "India"
  },

  // Tollywood - Female
  {
    name: "Samantha Ruth Prabhu",
    imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    description: "Beautiful, talented, and incredibly versatile actress!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Rashmika Mandanna",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop&crop=face",
    description: "National crush with incredible charm and talent!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Pooja Hegde",
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=400&h=400&fit=crop&crop=face",
    description: "Stunning beauty with incredible screen presence!",
    industry: "Tollywood",
    region: "India"
  },
  {
    name: "Kajal Aggarwal",
    imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    description: "Beautiful actress with pan-Indian appeal!",
    industry: "Tollywood",
    region: "India"
  },

  // Kollywood - Male
  {
    name: "Vijay",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    description: "Thalapathy with incredible mass appeal and charm!",
    industry: "Kollywood",
    region: "India"
  },
  {
    name: "Dhanush",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop&crop=face",
    description: "Versatile actor with incredible talent and simplicity!",
    industry: "Kollywood",
    region: "India"
  },
  {
    name: "Suriya",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Intense actor with incredible screen presence!",
    industry: "Kollywood",
    region: "India"
  },
  {
    name: "Vikram",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Method actor with incredible dedication!",
    industry: "Kollywood",
    region: "India"
  },

  // Kollywood - Female
  {
    name: "Nayanthara",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    description: "Lady Superstar with incredible grace and talent!",
    industry: "Kollywood",
    region: "India"
  },
  {
    name: "Keerthy Suresh",
    imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    description: "National Award winner with natural beauty!",
    industry: "Kollywood",
    region: "India"
  },
  {
    name: "Trisha",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop&crop=face",
    description: "South Indian beauty with timeless appeal!",
    industry: "Kollywood",
    region: "India"
  },

  // K-pop and Korean Entertainment - Male
  {
    name: "BTS Jin",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Worldwide handsome with incredible vocals!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "BTS V (Taehyung)",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    description: "Visual king with incredible charm and talent!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "BTS Jungkook",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    description: "Golden maknae with incredible talent in everything!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "EXO Sehun",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    description: "Visual perfection with incredible style!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "BIGBANG G-Dragon",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    description: "Fashion icon and music genius!",
    industry: "K-pop",
    region: "South Korea"
  },

  // K-pop and Korean Entertainment - Female
  {
    name: "BLACKPINK Lisa",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Dancing queen with incredible charisma!",
    industry: "K-pop",
    region: "Thailand"
  },
  {
    name: "BLACKPINK Jennie",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Chanel ambassador with incredible style!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "IU",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    description: "Nation's little sister with incredible vocals!",
    industry: "K-pop",
    region: "South Korea"
  },
  {
    name: "TWICE Tzuyu",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    description: "Visual goddess with incredible elegance!",
    industry: "K-pop",
    region: "Taiwan"
  },
  {
    name: "Red Velvet Irene",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    description: "Visual queen with perfect proportions!",
    industry: "K-pop",
    region: "South Korea"
  },

  // Global Sports and Entertainment - Male
  {
    name: "Cristiano Ronaldo",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    description: "GOAT athlete with incredible dedication and style!",
    industry: "Sports",
    region: "Portugal"
  },
  {
    name: "Lionel Messi",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
    description: "Football magician with incredible talent!",
    industry: "Sports",
    region: "Argentina"
  },
  {
    name: "David Beckham",
    imageUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
    description: "Style icon with football legend status!",
    industry: "Sports",
    region: "UK"
  },
  {
    name: "Elon Musk",
    imageUrl: "https://images.unsplash.com/photo-1558203728-00f45181dd84?w=400&h=400&fit=crop&crop=face",
    description: "Visionary genius changing the world!",
    industry: "Tech",
    region: "South Africa"
  },
  {
    name: "The Rock (Dwayne Johnson)",
    imageUrl: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=400&h=400&fit=crop&crop=face",
    description: "The People's Champion with incredible charisma!",
    industry: "Hollywood",
    region: "USA"
  },

  // Global Entertainment - Female
  {
    name: "Taylor Swift",
    imageUrl: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=400&h=400&fit=crop&crop=face",
    description: "Music icon with incredible songwriting talent!",
    industry: "Music",
    region: "USA"
  },
  {
    name: "Beyoncé",
    imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    description: "Queen B with incredible vocals and stage presence!",
    industry: "Music",
    region: "USA"
  },
  {
    name: "Rihanna",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face",
    description: "Multi-talented entrepreneur and music icon!",
    industry: "Music",
    region: "Barbados"
  },
  {
    name: "Ariana Grande",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    description: "Vocal powerhouse with incredible range!",
    industry: "Music",
    region: "USA"
  },
  {
    name: "Selena Gomez",
    imageUrl: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop&crop=face",
    description: "Multi-talented star with incredible heart!",
    industry: "Music",
    region: "USA"
  },

  // Additional diverse celebrities from various regions
  {
    name: "Jackie Chan",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3847ae2c9d05?w=400&h=400&fit=crop&crop=face",
    description: "Martial arts legend with incredible stunts!",
    industry: "Hong Kong Cinema",
    region: "Hong Kong"
  },
  {
    name: "Gong Li",
    imageUrl: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    description: "Elegant Chinese actress with timeless beauty!",
    industry: "Chinese Cinema",
    region: "China"
  },
  {
    name: "Toshiro Mifune",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    description: "Legendary samurai actor with incredible presence!",
    industry: "Japanese Cinema",
    region: "Japan"
  },
  {
    name: "Audrey Hepburn",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    description: "Timeless elegance and grace personified!",
    industry: "Classic Hollywood",
    region: "Belgium"
  },
  {
    name: "Marilyn Monroe",
    imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    description: "Hollywood icon with unforgettable charm!",
    industry: "Classic Hollywood",
    region: "USA"
  }
];
