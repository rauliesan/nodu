export type ExerciseType =
  | 'multiple_choice'
  | 'true_false'
  | 'fill_blank'
  | 'parsons_order'
  | 'spot_bug'
  | 'predict_output'
  | 'match_pairs'
  | 'code_runner';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  hint?: string;
  explanation: string;
  points: number;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

export interface TrueFalseExercise extends BaseExercise {
  type: 'true_false';
  statement: string;
  correctValue: boolean;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  codeTemplate: string;
  blankToken: string;
  acceptableAnswers: string[];
  availableTokens: string[];
}

export interface ParsonsOrderExercise extends BaseExercise {
  type: 'parsons_order';
  shuffledBlocks: {
    id: string;
    code: string;
  }[];
  correctOrder: string[];
}

export interface SpotBugExercise extends BaseExercise {
  type: 'spot_bug';
  codeLines: string[];
  buggyLineIndex: number;
  bugExplanation: string;
}

export interface PredictOutputExercise extends BaseExercise {
  type: 'predict_output';
  code: string;
  options: string[];
  correctOptionIndex: number;
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'match_pairs';
  pairs: {
    left: string;
    right: string;
  }[];
}

export interface CodeRunnerExercise extends BaseExercise {
  type: 'code_runner';
  starterCode: string;
  expectedOutput: string;
}

export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillBlankExercise
  | ParsonsOrderExercise
  | SpotBugExercise
  | PredictOutputExercise
  | MatchPairsExercise
  | CodeRunnerExercise;

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  order: number;
  type: 'standard' | 'review';
  xpReward: number;
  intro: {
    headline: string;
    markdownContent: string;
    codeSnippet?: string;
  };
  exercises: Exercise[];
}

export interface UnitCheckpoint {
  id: string;
  title: string;
  minimumPassPercentage: number;
  exercises: Exercise[];
}

export interface PracticalProject {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  validationRule: {
    type: 'output_match';
    expectedOutput: string;
  };
}

export interface CourseUnit {
  id: string;
  title: string;
  order: number;
  description: string;
  colorAccent: string;
  lessons: Lesson[];
  checkpoint: UnitCheckpoint;
  project?: PracticalProject;
}

export interface CourseMetadata {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  language: 'python' | 'javascript' | 'sql' | 'typescript' | 'rust';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  version: string;
  estimatedHours: number;
  author: {
    name: string;
    url?: string;
  };
  prerequisites: string[];
  certificateEligible: boolean;
  units: CourseUnit[];
}
