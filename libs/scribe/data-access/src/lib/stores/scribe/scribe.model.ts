export class ScribeState {
  manuscript?: Manuscript;
  characters: Character[];
  references: Reference[];
  timeline?: Timeline;

  constructor(data: Partial<ScribeState>) {
    this.manuscript = data?.manuscript;
    this.characters = data?.characters || [];
    this.references = data?.references || [];
    this.timeline = data?.timeline;
  }
}

export interface Manuscript {
  title: string;
  authors: string[];
  synopsis: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  scenes: Scene[];
  notes: string[];
}

export interface Scene {
  title: string;
  content: string;
  notes: string[]
}

export interface Character {
  name: string;
  pages: CharacterPage[];
  notes: string[];
}

export interface CharacterPage {
  title: string;
  content: string;
  notes: string[]
}

export interface Reference {
  title: string;
  description: string;
  content: string;
  type: 'image' | 'text'
}

export interface Timeline {
  range: string;
  description: string;
  events: TimelineEvent[];
}

export interface TimelineEvent {
  title: string;
  description: string;
  image: string;
  order: number;
  date: Date;
}
