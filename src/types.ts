export interface Scheme {
  id: string;
  name: string;
  department: string;
  category: "women" | "farmer" | "housing" | "pension";
  eligibility: string;
  benefit: string;
  description: string;
  popular?: boolean;
  tag?: string;
  rules?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  time: string;
  source: string;
  image?: string;
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  urgent?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "work" | "agri" | "nature" | "cultural";
  imagePrompt: string; // The query used to select or represent the photo
  imageUrl: string; // Placeholder or generated assets
  description: string;
}

export interface Complaint {
  id: string;
  type: string;
  description: string;
  date: string;
  status: "प्रलंबित" | "प्रगतीपथावर" | "निवारण";
  photo?: string | null;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface ApplicationRecord {
  id: string;
  name: string;
  applicant: string;
  status: "प्रलंबित" | "पूर्ण";
  date: string;
}
