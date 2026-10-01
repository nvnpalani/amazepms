export interface ServiceSpec {
  baseMaterial?: string;
  letterFabrication?: string;
  lighting?: string;
  powerSupply?: string;
  durability?: string;
  warranty?: string;
  suitableFor?: string;
  customSizes?: string;
  deliveryTime?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  desc: string;
  image: string;
  images: string[];
  categoryId: string;
  categoryTitle: string;
  categoryColor: string;
  specs?: ServiceSpec;
  features?: string[];
  applications?: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  services: ServiceItem[];
}

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: 'signage-led',
    title: 'LED & Illuminated Signage',
    subtitle: 'High-impact illuminated boards, LED video walls, and modern storefront elevations.',
    color: 'navy',
    services: [
      {
        id: 'led-sign-board',
        name: 'LED Sign Board & Exterior Elevation',
        desc: 'High-impact 3D LED letter signboards and architectural ACP exterior elevation works designed to transform your business front into an eye-catching, premium landmark.',
        image: 'assets/service/led-sign-board.png',
        images: [
       
          'assets/our_work/led-sign-board/led-singage (2).jpg',
          'assets/our_work/led-sign-board/led-singage (3).jpg',
          'assets/our_work/led-sign-board/led-singage (4).jpg',
          'assets/our_work/led-sign-board/led-singage (5).jpg',
          'assets/our_work/led-sign-board/led-singage (6).jpg',
          'assets/our_work/led-sign-board/led-singage (7).jpg',
        ],
        categoryId: 'signage-led',
        categoryTitle: 'LED & Illuminated Signage',
        categoryColor: 'navy',
        specs: {
          baseMaterial: '3mm / 4mm Heavy-Duty ACP Sheet (Aluminium Composite Panel) Front Elevation',
          letterFabrication: 'Precision Laser-Cut 3D Acrylic Cast Embossed Lettering with Vinyl Face',
          lighting: '100% Waterproof Samsung / Epistar 12V High-Lumen Injection LED Modules (IP67 Grade)',
          powerSupply: 'Industrial Grade Rainproof Heavy-Duty SMPS Power Adapter (Short-circuit protected)',
          durability: '5+ Years Long Outdoor Lifespan with UV-Protected Anti-Fade Coating',
          warranty: '1 to 2 Years Comprehensive Warranty on LED Modules & Power Supply',
          suitableFor: 'Jewellery Showrooms, Textile Shops, Bakeries, Supermarkets, Hospitals, Corporate Offices',
          customSizes: '100% Customized to your shop facade dimensions (e.g., 10x3 ft, 12x4 ft, 15x4 ft, 20x5 ft, etc.)',
          deliveryTime: '3 to 5 Working Days (Fabrication & Professional Installation across Tamil Nadu)'
        },
        features: [
          '100% Weatherproof, Rainproof & UV resistant for outdoor endurance',
          'Day & Night High Visibility with Glowing 3D Depth & illumination',
          'Low Power Consumption with Energy Efficient 12V High-Lumen LEDs',
          'Rust-Free Heavy GI Box Pipe Internal Structural Framework'
        ],
        applications: [
          'Jewellery & Gold Showrooms',
          'Textile, Boutique & Garment Stores',
          'Bakeries, Cafes & Restaurants',
          'Supermarkets & Departmental Stores',
          'Hospitals, Clinics & Diagnostic Centers',
          'Commercial Head Offices & IT Parks'
        ]
      },
      {
        id: 'uv-fabric-backlight',
        name: 'UV Fabric Backlight Board',
        desc: 'Seamless frameless textile lightboxes with vibrant, glare-free UV backlighting for modern retail interiors.',
        image: 'assets/service/uvfab.jpeg',
        images: [
          'assets/our_work/uv-fabric-backlight/Led-backlight (1).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (2).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (3).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (4).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (5).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (6).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (7).jpeg',
          'assets/our_work/uv-fabric-backlight/Led-backlight (8).jpeg',
        ],
        categoryId: 'signage-led',
        categoryTitle: 'LED & Illuminated Signage',
        categoryColor: 'navy',
        specs: {
          baseMaterial: 'Precision Extruded Anodized Aluminum Frameless SEG Profile',
          letterFabrication: 'High-Density Backlit Polyester Fabric with Silicone Edge Gasket (SEG)',
          lighting: 'Uniform Edge-Lit / Lattice High-Power LED Backlight Strip',
          powerSupply: 'Slim Internal / External Constant-Voltage 12V/24V SMPS',
          durability: '3+ Years Indoor/Semi-Outdoor with Fade-Free UV Inks',
          warranty: '1 Year Warranty on Electrical Components',
          suitableFor: 'Malls, Airports, Brand Flagship Stores, Showrooms, Corporate Lounges',
          customSizes: 'Any custom size available with easy tool-free graphic change',
          deliveryTime: '2 to 3 Working Days'
        },
        features: [
          'Glare-Free Ultra-Vibrant Fabric Color Reproduction',
          'Tool-Free Quick Fabric Graphics Replacement',
          'Ultra-Slim Frameless Elegant Profile',
          'Even Edge-to-Edge Glare-Free Illumination'
        ],
        applications: [
          'Apparel & Fashion Outlets',
          'Airport & Transit Terminal Displays',
          'Exhibition Stalls & Trade Fair Booths',
          'Automobile Showrooms & Reception Areas'
        ]
      },
      {
        id: 'uv-flex-backlight',
        name: 'UV Flex Backlight Board',
        desc: 'Long-lasting weather-resistant UV printed flex glow signboards for shopfronts with day and night impact.',
        image: 'assets/service/L (3).jpeg',
        images: [
          'assets/our_work/uv-flex-backlight/Led-backlight (1).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (2).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (3).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (4).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (5).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (6).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (7).jpeg',
          'assets/our_work/uv-flex-backlight/Led-backlight (8).jpeg',
        ],
        categoryId: 'signage-led',
        categoryTitle: 'LED & Illuminated Signage',
        categoryColor: 'navy',
        specs: {
          baseMaterial: 'Reinforced GI Galvanized Sheet Metal Lightbox Enclosure',
          letterFabrication: '550 GSM Heavy Star Backlit Flex with UV Curable Anti-Fade Print',
          lighting: 'Energy Efficient High-Lumen Tube Lights or LED Modules',
          powerSupply: 'Standard Integrated AC 220V Heavy Power Circuit',
          durability: '3 to 5 Years Outdoor Weatherproof Durability',
          warranty: '1 Year Warranty on Lighting Fixtures',
          suitableFor: 'Street Shops, Pharmacies, Hardware Stores, Commercial Complexes',
          customSizes: 'From 6x3 ft up to large 40x8 ft storefront hoardings',
          deliveryTime: '2 to 3 Days'
        },
        features: [
          'Heavy 550 GSM Weather-Resistant Star Backlit Media',
          'Anti-Fade UV Printing with High Outdoor Contrast',
          'Cost-Effective Day & Night Branding Solution',
          'Complete Heavy Metal Protective Box Enclosure'
        ],
        applications: [
          'Medical & Pharmacy Stores',
          'Grocery & Departmental Stores',
          'Automobile Repair & Service Stations',
          'Electrical & Hardware Retail Shops'
        ]
      },
      {
        id: 'led-video-wall',
        name: 'Indoor & Outdoor LED Video Wall Display',
        desc: 'Ultra-bright HD commercial LED video screens for events, retail showrooms, advertising, and promotions.',
        image: 'assets/service/LED_wall.png',
        images: [
        ],
        categoryId: 'signage-led',
        categoryTitle: 'LED & Illuminated Signage',
        categoryColor: 'navy',
        specs: {
          baseMaterial: 'Precision CNC Die-Cast Magnesium / Aluminum Cabinets',
          letterFabrication: 'P2.5 / P3 / P4 SMD Commercial LED Display Modules',
          lighting: 'High-Brightness 5500+ Nits (Outdoor Daylight Readable)',
          powerSupply: 'High-Efficiency Redundant SMPS Modules with Cooling Fans',
          durability: '100,000+ Hours Operational Lifespan',
          warranty: '2 Years Comprehensive Warranty with On-Site Support',
          suitableFor: 'Auditoriums, Marriage Halls, Events, Commercial Malls, Showrooms',
          customSizes: 'Modular seamless setup in any aspect ratio (16:9, Ultra-Wide)',
          deliveryTime: '5 to 7 Days (Setup & Calibration included)'
        },
        features: [
          'Ultra-Bright High-Contrast Visuals Readable in Direct Sunlight',
          'Seamless Modular Cabinet Architecture with Zero Gap',
          'Wireless / HDMI / Cloud Video Streaming Control',
          'High Refresh Rate (3840Hz) for Flicker-Free Video & Photo Capture'
        ],
        applications: [
          'Marriage Halls & Convention Centers',
          'Retail Showrooms & Experience Centers',
          'Corporate Boardrooms & Auditoriums',
          'Outdoor Digital Billboards & Stadiums'
        ]
      },
    ]
  },
  {
    id: 'boards-sheets',
    title: 'Boards & Rigid Sheet Works',
    subtitle: 'Premium acrylic boards, reflective signs, and durable sheet branding solutions.',
    color: 'teal',
    services: [
      {
        id: 'acrylic-board',
        name: 'Acrylic Board',
        desc: 'Laser-cut 3D acrylic embossed lettering, corporate reception boards, name plates, and retail displays.',
        image: 'assets/service/acrylic-board.png',
        images: [
          'assets/service/AB-1.jpg',
          'assets/service/AB-2.jpg',
          'assets/service/AB-3.jpg',
          'assets/service/AB-4.jpg',
          'assets/service/AB-5.jpg',
        ],
        categoryId: 'boards-sheets',
        categoryTitle: 'Boards & Rigid Sheet Works',
        categoryColor: 'teal',
        specs: {
          baseMaterial: '3mm to 10mm Pure Cast Acrylic / Frosted / Transparent Sheet',
          letterFabrication: 'CNC Laser-Cut 3D Raised Lettering in Gold, Silver, or Glossy Colors',
          durability: '7+ Years Indoor / Outdoor UV Stable Finish',
          warranty: '1 Year Warranty against Discoloration',
          suitableFor: 'Corporate Offices, Reception Desks, Clinics, Luxury Boutiques',
          customSizes: 'Tailored to door, desk, or lobby wall dimensions',
          deliveryTime: '2 to 3 Working Days'
        },
        features: [
          'Glass-Like High Polish with 10x More Impact Strength than Glass',
          'Golden & Silver Mirror Metallic Acrylic Finish Options',
          'Precision Laser Cutting with Crystal-Clear Smooth Edges',
          'Supplied with Stainless Steel Standoff Stud Bolts'
        ],
        applications: [
          'Corporate Office Reception & Lobby Backdrops',
          'Doctors, Advocates & Professional Nameplates',
          'Hotel, Resort & Restaurant Direction Signage',
          'Jewellery & Luxury Watch Showrooms'
        ]
      },
      {
        id: 'reflective-board',
        name: 'Reflective Board',
        desc: 'High-visibility retro-reflective safety signage, direction boards, road markers, and night-glow signage.',
        image: 'assets/service/reflective-board.png',
        images: [
          'assets/our_work/reflective-board/Reflective_board (1).jpeg',
          'assets/our_work/reflective-board/Reflective_board (2).jpeg',
          'assets/our_work/reflective-board/Reflective_board (3).jpeg',
          'assets/our_work/reflective-board/Reflective_board (4).jpeg',
          'assets/our_work/reflective-board/Reflective_board (5).jpeg',
        ],
        categoryId: 'boards-sheets',
        categoryTitle: 'Boards & Rigid Sheet Works',
        categoryColor: 'teal',
        specs: {
          baseMaterial: '18 / 20 Gauge Heavy Galvanized Iron (GI) or 3mm ACP Base Plate',
          letterFabrication: '3M Commercial / Engineering Grade Retro-Reflective Vinyl Sheeting',
          durability: '5 to 7 Years Long Lifespan under Heavy Weather & Highway Conditions',
          warranty: '3 Years Warranty on Reflectivity and Color Fastness',
          suitableFor: 'Highways, Toll Plazas, Real Estate Sites, Factories, School Zones',
          customSizes: 'Standard Highway Code Sizes or Custom Directional Sizes',
          deliveryTime: '2 to 4 Working Days'
        },
        features: [
          'High Retro-Reflectivity Visible from 300+ Meters at Night',
          'Meets Highway & Traffic Department Safety Standards',
          'Rust-Free Powder-Coated GI Support Structure & Clamps',
          'Resistant to Heavy Rains, High Winds, and Extreme Sunlight'
        ],
        applications: [
          'Real Estate Gated Community & Villa Plot Signboards',
          'Factory & Industrial Campus Safety Caution Boards',
          'National & State Highway Direction Boards',
          'Hospital Emergency & Parking Direction Indicators'
        ]
      },
      {
        id: 'direction-board',
        name: 'Direction Board',
        desc: 'High-visibility industrial direction boards, campus wayfinding signage, factory entrance/exit markers, warehouse bay indicators, and highway route guides.',
        image: 'assets/our_work/reflective-board/d(1).jpeg',
        images: [
          'assets/our_work/reflective-board/d(1).jpeg',
          'assets/our_work/reflective-board/d(2).jpeg',
          'assets/our_work/reflective-board/d(3).jpeg',
        ],
        categoryId: 'boards-sheets',
        categoryTitle: 'Boards & Rigid Sheet Works',
        categoryColor: 'teal',
        specs: {
          baseMaterial: '16 / 18 Gauge Heavy Galvanized Iron (GI) Sheet / 3mm Heavy ACP Base Plate',
          letterFabrication: '3M Commercial / Engineering Grade Retro-Reflective Vinyl with High-Contrast Directional Arrows',
          lighting: 'High-Intensity Retro-Reflective (Visible in Vehicle Headlights up to 300m)',
          powerSupply: 'Passive Retro-Reflective / Optional Solar LED Illuminator',
          durability: '5 to 7 Years Heavy Outdoor Industrial & Highway Endurance',
          warranty: '3 Years Comprehensive Warranty on Reflectivity and Sheet Bonding',
          suitableFor: 'Manufacturing Plants, SIPCOT Industrial Estates, Warehouses, IT Campuses, Hospitals, Logistics Parks',
          customSizes: 'Standard Highway Sizes (4x2 ft, 6x3 ft, 8x4 ft) or Custom Site Wayfinding Specs',
          deliveryTime: '2 to 4 Working Days (Fabrication & On-Site Pole / Wall Installation across Tamil Nadu)'
        },
        features: [
          'Meets Industrial Safety Standards & Highway Wayfinding Specifications',
          'Clear Multi-Directional Arrow Indicators for Seamless Traffic & Visitor Guidance',
          'Rust-Proof Heavy-Duty GI Box Pipe Poles, Clamps & Powder-Coated Framework',
          'High-Reflectivity Coating Visible from 300+ Meters at Night under Vehicle Headlights'
        ],
        applications: [
          'Factory Entrance, Exit, Assembly Unit & Weighbridge Indicators',
          'Warehouse Loading / Unloading Bay & Logistics Yard Guidance',
          'IT Park, Corporate Campus & University Building Wayfinding',
          'Hospital Emergency Ward, Ambulance Bay & Visitor Parking Direction',
          'Real Estate Gated Community & Villa Plot Main Road Approach Indicators'
        ]
      },
      {
        id: 'sunpack-sheet',
        name: 'Sunpack Sheet',
        desc: 'Cost-effective, waterproof fluted PP sunpack boards manufactured for mass outdoor campaigns and promotions.',
        image: 'assets/service/sunpack.png',
        images: [
          'assets/our_work/sunpack-sheet/spo-1.png',
          'assets/our_work/sunpack-sheet/spo-2.png',
          'assets/our_work/sunpack-sheet/spo-3.png',
          'assets/our_work/sunpack-sheet/spo-4.png',
          'assets/our_work/sunpack-sheet/spo-5.png',
          'assets/our_work/sunpack-sheet/spo-6.png',
          'assets/service/spn-1.png'
        ],
        categoryId: 'boards-sheets',
        categoryTitle: 'Boards & Rigid Sheet Works',
        categoryColor: 'teal',
        specs: {
          baseMaterial: '3mm / 4mm Fluted Hollow Corrugated Polypropylene (PP) Sheet',
          letterFabrication: 'High-Speed Screen Printing / UV Flatbed Direct Printing',
          durability: '1 to 2 Years Outdoor Weather Resistance',
          suitableFor: 'Mass Advertising on Electric Poles, Trees, Gates & Walls',
          customSizes: 'Standard 1x1 ft, 1x1.5 ft, 2x1.5 ft, 2x2 ft, 2x3 ft (Custom Available)',
          deliveryTime: '2 to 3 Days (Capacity: 10,000+ sheets per week)'
        },
        features: [
          '100% Waterproof, Washable, and Termite Proof',
          'Extremely Low Cost Per Unit for Bulk Outdoor Visibility',
          'Pre-Punched Corner Eyelets for Easy Cable-Tie Installation',
          'High Volume Production Capacity for Quick Campaign Dispatch'
        ],
        applications: [
          'Real Estate & Plot Promotion Pole Advertisements',
          'Coaching Centers, Schools & College Admission Drives',
          'Political Election Campaign Posters',
          'Broadband, Telecom & Local Service Promotions'
        ]
      },
    ]
  },
  {
    id: 'transit-outdoor',
    title: 'Outdoor & Transit Advertising',
    subtitle: 'Mobile and roadside advertising reaching thousands of commuters every day.',
    color: 'red',
    services: [
      {
        id: 'bus-backside-ads',
        name: 'Bus Backside Ads',
        desc: 'City-wide brand visibility and high recall through transit bus rear panel advertising across city & mofussil routes.',
        image: 'assets/service/bus.png',
        images: [
          'assets/our_work/bus-backside-ads/bus (1).jpg',
          'assets/our_work/bus-backside-ads/bus (2).jpg',
        ],
        categoryId: 'transit-outdoor',
        categoryTitle: 'Outdoor & Transit Advertising',
        categoryColor: 'red',
        specs: {
          baseMaterial: 'Transit Grade Cast Polymeric Vinyl with Anti-UV Clear Overlaminate',
          letterFabrication: 'High-Resolution Solvent Digital Print with High Color Saturation',
          durability: '6 Months to 1 Year Guaranteed Fleet Exposure',
          suitableFor: 'FMCG Brands, Real Estate, Hospitals, Colleges, Retail Chains',
          customSizes: 'Full Rear Panel or Upper Glass Window Placement',
          deliveryTime: '3 to 5 Days from Design Approval'
        },
        features: [
          'High Dwell Time Exposure to Trailing Motorists and Commuters',
          'Moves Across Dense Traffic Junctions and Commercial Arteries',
          'Official Advertising Permits & Transit Approvals Managed',
          'Weekly Monitoring & Route Replacement Assurance'
        ],
        applications: [
          'New Product Launch Campaigns',
          'College & Educational Institute Admissions',
          'Jewellery & Retail Festive Mega Sales',
          'Hospital Special Healthcare Package Promotions'
        ]
      },
      {
        id: 'auto-backside-ads',
        name: 'Auto Backside Ads',
        desc: 'Hyper-local street-level reach targeting crowded city junctions, markets, and residential areas with auto rickshaw ads.',
        image: 'assets/service/auto.png',
        images: [
          'assets/our_work/auto-backside-ads/auto (1).jpg',
          'assets/our_work/auto-backside-ads/auto (2).jpg',
          'assets/our_work/auto-backside-ads/auto (3).jpg',
        ],
        categoryId: 'transit-outdoor',
        categoryTitle: 'Outdoor & Transit Advertising',
        categoryColor: 'red',
        specs: {
          baseMaterial: 'Reinforced Metal Hood / Rexine Board Frame with Clear Shield',
          letterFabrication: 'Waterproof Cast Adhesive Vinyl with Lamination',
          durability: '6 Months Guaranteed Active Fleet Circulation',
          suitableFor: 'Hyper-Local Businesses, Clinics, Coaching Centers, Retail Shops',
          customSizes: 'Standard Auto Rickshaw Rear Hood Dimensions',
          deliveryTime: 'Fleet of 50 to 500 Autos Mobilized in 3 Days'
        },
        features: [
          'Penetrates Deep Into Dense Streets, Markets & Residential Areas',
          'Maximum Eye-Level Visibility for Pedestrians and Bikers',
          'Very Low Cost Per Impression Compared to Traditional Billboards',
          'Complete Auto Driver Network Coordination Managed by AK Creation'
        ],
        applications: [
          'Local Sweet Stalls, Bakeries & Restaurants',
          'Diagnostic Labs & Neighbourhood Clinics',
          'Competitive Exam Coaching & Tuition Centers',
          'Home Appliance & Furniture Showroom Openings'
        ]
      },
      {
        id: 'look-walker-ads',
        name: 'Look Walker Ads',
        desc: 'Eye-catching illuminated wearable backpack walking billboards for crowded areas, markets, and public gatherings.',
        image: 'assets/service/look-walker.jpg',
        images: [
          'assets/our_work/look-walker-ads/look-walker-ads (1).jpg',
          'assets/our_work/look-walker-ads/look-walker-ads (1).png',
          'assets/our_work/look-walker-ads/look-walker-ads (2).png',
        ],
        categoryId: 'transit-outdoor',
        categoryTitle: 'Outdoor & Transit Advertising',
        categoryColor: 'red',
        specs: {
          baseMaterial: 'Lightweight Ergonomic Carbon-Fiber / Aluminum Backpack Frame',
          letterFabrication: 'Backlit Translucent Graphic Film with Edge LED Illumination',
          lighting: 'Rechargeable High-Capacity Lithium-Ion Battery (6 to 8 Hours Continuous Run)',
          suitableFor: 'Product Launches, Mall Activations, Expos, Festival Crowds',
          customSizes: 'Dual-Sided Backlit Panel (Front & Back Visibility)',
          deliveryTime: 'Promoter Team Deployed with 24 Hours Notice'
        },
        features: [
          'Active Human Brand Promoters Engaging Directly with Public',
          'Bright Internal LED Illumination Ideal for Evening Crowds',
          'Can Distribute Sample Flyers & Pamphlets Simultaneously',
          'Geo-Targeted Deployment at Specific Junctions or Mall Entrances'
        ],
        applications: [
          'Grand Store Openings & Launch Events',
          'Exhibitions, Trade Fairs & Shopping Expos',
          'Cinema Theater & Bus Stand Crowded Campaigns',
          'Food Festival & Real Estate Expo Promotions'
        ]
      },
      {
        id: 'road-show-ads',
        name: 'Road Show Ads',
        desc: 'Dynamic mobile campaign vehicles, roadshow vehicle branding, audio announcement setups, and promotional tours.',
        image: 'assets/service/Road-show-ads.jpg',
        images: [
          'assets/our_work/road-show-ads/road-show-ads (1).jpg',
          'assets/our_work/road-show-ads/road-show-ads (2).jpg',
        ],
        categoryId: 'transit-outdoor',
        categoryTitle: 'Outdoor & Transit Advertising',
        categoryColor: 'red',
        specs: {
          baseMaterial: 'Custom Vehicle Fabrication (Tata Ace / Canter / Open Truck)',
          letterFabrication: 'Full Vehicle 360-Degree Vinyl Wrap + 3D Stage Setup',
          lighting: 'Generator-Powered LED Flood Lights & PA Audio Sound System',
          suitableFor: 'District-Wide Awareness, Political Rallies, Brand Awareness',
          customSizes: 'Customized to Vehicle Body Specifications',
          deliveryTime: 'Fabricated & Deployed within 3 to 5 Days'
        },
        features: [
          'Complete Mobile Stage with Loudspeaker & Microphone Facilities',
          'Reaches Towns, Villages, and Urban Centers in a Single Campaign',
          'High Brand Recall through Visual, Audio & Experiential Impact',
          'Turnkey Service with Vehicle, Driver, Permits & Sound System'
        ],
        applications: [
          'Government & Public Awareness Drives',
          'Agricultural Product & Tractor Promotions in Rural Hubs',
          'Political Election Campaign Tours',
          'Mass Consumer FMCG Sampling Campaigns'
        ]
      },
    ]
  },
  {
    id: 'print-interiors',
    title: 'Vinyl, Print & Interior Branding',
    subtitle: 'Promotional print media, customized wallpapers, standees, and floor graphics.',
    color: 'yellow',
    services: [
      {
        id: 'vinyl-foam-sheet-printing',
        name: 'Vinyl & Foam Sheet Printing',
        desc: 'High-resolution vinyl sticker printing, matte/gloss lamination, and rigid high-density foam board / sun board mounting for indoor branding, retail POS, and corporate displays.',
        image: 'assets/service/vinyal.png',
        images: [
          'assets/our_work/vinyl-sticker-printing/v-1.png',
          'assets/our_work/vinyl-sticker-printing/v-2.png',
          'assets/service/vip_ppt-4.jpg',
          'assets/service/vip_ppt-6.jpg',
          'assets/service/vip_ppt-8.jpg',
          
        ],
        categoryId: 'print-interiors',
        categoryTitle: 'Vinyl, Print & Interior Branding',
        categoryColor: 'yellow',
        specs: {
          baseMaterial: 'High-Tack Polymeric Vinyl mounted on 3mm / 5mm / 8mm High-Density Rigid PVC Sun Board / Foam Sheet',
          letterFabrication: 'High-Resolution Eco-Solvent / UV Flatbed Print with Matte or Gloss Thermal Protective Lamination',
          durability: '3 to 5 Years Indoor / Outdoor UV Resistant Lifespan without Warping',
          warranty: '1 Year Color Fastness Warranty',
          suitableFor: 'Retail Showrooms, Exhibition Stalls, Supermarket Aisles, Corporate Office Wall Graphics',
          customSizes: 'From small 1x1 ft up to full 8x4 ft boards, with CNC contour die-cutting',
          deliveryTime: '1 to 2 Working Days (Express dispatch available)'
        },
        features: [
          'Ultra-Sharp High-Resolution Printing with Waterproof & Scratch-Resistant Inks',
          'Mounted on Heavy-Duty Rigid Sun Board / Foam Sheet for Flat, Sturdy Presentation',
          'Protective Matte or Gloss Thermal Lamination prevents Fading & Fingerprints',
          'Lightweight & Easy to Install with Double-Sided Heavy Foam Tape or Screws',
          'Precision Machine Contour Cutting for Custom Logo Shapes & Cutouts'
        ],
        applications: [
          'Retail Store Point-of-Sale (POS) & In-Aisle Promotional Boards',
          'Exhibition Stall Wall Graphics & Information Panels',
          'Office Reception & Conference Room Motivational Wall Graphic Displays',
          'Menu Boards for Cafes, Restaurants & Juice Bars',
          'Shopfront Window Promotional Offers, Decals & Glass Privacy Films',
          'Custom Shape Cutouts, Standee Boards & Event Photo Props'
        ]
      },
      {
        id: 'roll-up-standee',
        name: 'Roll Up Standee',
        desc: 'Portable, lightweight aluminum roll-up standees for exhibitions, conferences, showrooms, and events.',
        image: 'assets/service/roll-up-stand.png',
        images: [
          'assets/our_work/roll-up-standee/R-1.jpg',
          'assets/our_work/roll-up-standee/R-2.png',
          'assets/our_work/roll-up-standee/R-3.png',
          'assets/our_work/roll-up-standee/R-4.png',
          'assets/our_work/roll-up-standee/R-5.png',
        ],
        categoryId: 'print-interiors',
        categoryTitle: 'Vinyl, Print & Interior Branding',
        categoryColor: 'yellow',
        specs: {
          baseMaterial: 'Heavy-Duty Anodized Aluminum Spring Roller Stand Base',
          letterFabrication: 'Non-Curling Non-Tear Satin Poly-Film Media with Anti-Glare Matte Lamination',
          durability: 'Reusable Hardware with Replaceable Graphics Mechanism',
          warranty: '6 Months Hardware Spring Mechanism Warranty',
          suitableFor: 'Conferences, Trade Expos, Hotel Lobbies, Product Showrooms',
          customSizes: 'Standard 6x3 ft and 6x2.5 ft sizes',
          deliveryTime: 'Same-Day or 24-Hour Express Dispatch'
        },
        features: [
          'Sets Up in 30 Seconds with Zero Tools Required',
          'Supplied with Free Heavy-Duty Padded Fabric Carry Bag',
          'Retractable Internal Roller Mechanism Protects Graphics during Travel',
          'Non-Curling Edges Ensure Professional Presentation Always'
        ],
        applications: [
          'Medical & Corporate Conference Entrances',
          'Product Launch Events & Press Meets',
          'Showroom Corner Promotional Displays',
          'College Seminar & Campus Placement Desks'
        ]
      },
      {
        id: 'wall-poster-flayer',
        name: 'Wall Poster & Flayer',
        desc: 'High-volume vibrant marketing flyers, brochures, pamphlets, and glossy commercial wall posters.',
        image: 'assets/service/flayer.png',
        images: [
          'assets/our_work/wall-poster-flayer/Broucher-1.jpg',
          'assets/home/ak_new_about_1789362399471.png'
        ],
        categoryId: 'print-interiors',
        categoryTitle: 'Vinyl, Print & Interior Branding',
        categoryColor: 'yellow',
        specs: {
          baseMaterial: '130 GSM / 170 GSM / 250 GSM / 300 GSM Imported Art Paper',
          letterFabrication: 'Heidelberg 4-Color High-Definition Commercial Offset Printing',
          durability: 'Fade-Proof Inks with Optional Gloss or Matte Thermal Lamination',
          suitableFor: 'Mass Door-to-Door Marketing, Newspaper Inserts, Handouts',
          customSizes: 'A4, A5, A3, Tri-Fold Brochure, Bi-Fold Pamphlets',
          deliveryTime: '2 to 3 Working Days (Quantities: 1,000 to 100,000+ pcs)'
        },
        features: [
          'Ultra-Sharp High-Resolution Printing with Vivid Color Depth',
          'Cost Per Copy as Low as a Few Paise on Bulk Quantities',
          'Precision Machine Folding & Creasing for Tri-Fold Leaflets',
          'Premium Thick Card Stock Options for High-End Catalogs'
        ],
        applications: [
          'Newspaper Insert Flyers for Local Catchment Marketing',
          'Educational Institute Prospectus & Course Pamphlets',
          'Restaurant Delivery Menus & Takeaway Cards',
          'Event Invitations & Commercial Wall Posters'
        ]
      },
      {
        id: 'wallpaper-floor-mat',
        name: 'Wallpaper & Floor Mat',
        desc: 'Customized corporate wall murals, textured aesthetic wallpapers, and branded non-slip floor graphics.',
        image: 'assets/service/floormat.png',
        images: [
          'assets/our_work/wallpaper-floor-mat/wall-paper-1.jpg',
          'assets/home/ak-hero-bg.png'
        ],
        categoryId: 'print-interiors',
        categoryTitle: 'Vinyl, Print & Interior Branding',
        categoryColor: 'yellow',
        specs: {
          baseMaterial: 'Non-Woven Textured Canvas Wallpaper / Heavy Anti-Skid Floor Vinyl',
          letterFabrication: 'Eco-Friendly Odorless UV / Latex High-Density Printing',
          durability: '7+ Years Interior Wall Durability / 1 Year Heavy Footfall Floor Mat',
          suitableFor: 'Offices, Living Rooms, Showrooms, Gyms, Hotel Lobbies',
          customSizes: 'Custom Made to Wall Height & Width with Zero Wastage',
          deliveryTime: '2 to 4 Working Days (Installation assistance provided)'
        },
        features: [
          'Seamless Large-Format Printing Tailored Exactly to Your Wall Dimensions',
          'Anti-Scratch & Heavy Foot Traffic Resistant Floor Laminate',
          'Non-Fading Eco-Friendly Inks Safe for Homes & Hospitals',
          'Textured Leatherette & Fabric Canvas Media Choices'
        ],
        applications: [
          'Corporate Conference Room & Executive Cabin Wall Murals',
          'Fitness Center & Gym Motivational Graphic Walls',
          'Retail Store Entrance Branded Directional Floor Mats',
          'Hospitality, Restaurant & Hotel Thematic Accent Walls'
        ]
      },
    ]
  }
];

export function getAllServices(): ServiceItem[] {
  const list: ServiceItem[] = [];
  SERVICES_CATEGORIES.forEach(cat => {
    cat.services.forEach(s => list.push(s));
  });
  return list;
}

export function getServiceById(id: string): ServiceItem | undefined {
  const clean = id.trim().toLowerCase();

  // Alias & friendly fallback mapping
  const aliasMap: Record<string, string> = {
    'foam-sheet': 'direction-board',
    'direction-boards': 'direction-board',
    'direction-sign': 'direction-board',
    'vinyl-sticker-printing': 'vinyl-foam-sheet-printing',
    'vinyl-foam-sheet': 'vinyl-foam-sheet-printing',
    'foam-sheet-printing': 'vinyl-foam-sheet-printing'
  };

  const targetId = aliasMap[clean] || clean;

  for (const cat of SERVICES_CATEGORIES) {
    const found = cat.services.find(s =>
      s.id.toLowerCase() === targetId ||
      s.id.toLowerCase() === clean ||
      s.name.toLowerCase() === targetId ||
      s.name.toLowerCase().replace(/&/g, '').replace(/\s+/g, '-').includes(clean) ||
      clean.includes(s.id.toLowerCase())
    );
    if (found) return found;
  }
  return undefined;
}

export function getRelatedServices(categoryId: string, currentServiceId: string): ServiceItem[] {
  const cat = SERVICES_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return [];
  return cat.services.filter(s => s.id !== currentServiceId);
}
