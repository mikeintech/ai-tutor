export interface Lesson {
  chapterTitle: string
  title: string
  content: string
  summary: string
}

export interface Chapter {
  title: string
  lessons: Lesson[]
}

export interface LessonPlan {
  summary: string
  chapters: Chapter[]
}

interface SurveyQuestion {
  question: string
  options: string[]
}

interface SurveyData {
  questions: SurveyQuestion[]
}
