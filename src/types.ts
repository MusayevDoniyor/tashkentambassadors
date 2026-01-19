export interface Ambassador {
  id: number;
  name: string;
  district: string;
  role: string;
  image: string;
  socials: {
    telegram?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface VentureFund {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
}

export interface Mentor {
  id: number;
  name: string;
  image: string;
  role: string;
  expertise: string;
  socials: {
    linkedin?: string;
    telegram?: string;
  };
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "Masterclass" | "Workshop" | "Meetup" | "Pitch Day";
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

export interface TrainingProgram {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Department {
  name: string;
  leader: Ambassador;
  members: Ambassador[];
}

export interface TeamStructure {
  overallLeader: Ambassador;
  deputyLeaders: Ambassador[];
  departments: Department[];
}
