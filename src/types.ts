export type Mode = 'landing' | 'doctor' | 'patient' | 'caregiver';

export type DoctorTab = 'dashboard' | 'patients' | 'new-assessment' | 'reports' | 'ai-assistant' | 'settings' | 'clinical-analysis' | 'guidelines' | 'medications' | 'health-planner' | 'diet-planner' | 'food-scanner' | 'follow-up-engine' | 'drug-interaction-engine' | 'population-analytics' | 'digital-health-twin' | 'demo';

export type PatientTab = 'dashboard' | 'my-health' | 'reports' | 'recommendations' | 'history' | 'education' | 'profile' | 'ai-companion' | 'medications' | 'health-planner' | 'diet-planner' | 'food-scanner' | 'follow-up-engine' | 'drug-interaction-engine' | 'population-analytics' | 'digital-health-twin' | 'smart-intake';

export type RiskLevel = 'High' | 'Moderate' | 'Low';

export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskCategory = 'Exercise' | 'Hydration' | 'Vitals Check' | 'Medication' | 'Sleep' | 'Lab Check' | 'Mental Health' | 'Nutrition';

export interface HealthTask {
  id: string;
  title: string;
  priority: TaskPriority;
  time: string; // e.g., '07:30 AM'
  category: TaskCategory;
  completed: boolean;
  reasoning: string; // Why AI generated this task based on Disease, Age, BMI, Doctor Recommendations, Risk Level
  encouragingMessage: string; // Message displayed on completion
  points: number; // e.g., 10, 15, 20
  iconType: 'walk' | 'water' | 'bp' | 'sugar' | 'sleep' | 'meds' | 'lab' | 'meditation' | 'generic';
}

export interface DayProgress {
  day: string; // e.g. 'Mon', 'Tue'
  score: number; // 0-100
  tasksCompleted: number;
  totalTasks: number;
}

export interface DoseSchedule {
  morning: boolean;
  afternoon: boolean;
  night: boolean;
}

export interface MedicationHistoryLog {
  id: string;
  date: string;
  time: string;
  doseSlot: 'Morning' | 'Afternoon' | 'Night';
  status: 'taken' | 'missed' | 'skipped';
  notes?: string;
}

export interface FullMedication {
  id: string;
  name: string;
  strength: string; // e.g. '1000 mg'
  dosage?: string; // legacy shorthand compatibility
  frequency?: string; // legacy shorthand compatibility
  schedule: DoseSchedule;
  timing: 'Before Food' | 'After Food' | 'With Food';
  startDate: string;
  endDate: string;
  duration: string; // e.g. '90 Days'
  purpose: string;
  sideEffects: string[];
  refillReminder: boolean;
  refillDate?: string;
  refillPillsRemaining?: number;
  missedDoseReminder: boolean;
  reminderTimes?: string[];
  takenToday: boolean;
  takenTimesToday?: {
    morning?: boolean;
    afternoon?: boolean;
    night?: boolean;
  };
  historyLogs?: MedicationHistoryLog[];
}

export interface Vitals {
  bpSystolic: number;
  bpDiastolic: number;
  heartRate: number;
  bmi: number;
  glucose: number; // mg/dL
  hba1c: number; // %
  ldl: number; // mg/dL
  weightKg: number;
}

export interface ActivityItem {
  id: string;
  date: string;
  type: 'assessment' | 'lab' | 'referral' | 'vital' | 'medication';
  title: string;
  description: string;
  badgeText?: string;
  badgeType?: 'danger' | 'warning' | 'success' | 'info';
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string; // e.g. "Son", "Daughter", "Primary Physician", "Local Emergency Hospital"
  phone: string;
  email?: string;
  isPrimary: boolean;
  notes?: string;
}

export interface PendingTest {
  id: string;
  testName: string;
  category: 'Lab Test' | 'Diagnostic Imaging' | 'Specialist Screening' | 'ECG';
  orderedBy: string;
  dueDate: string;
  status: 'Scheduled' | 'Pending Sample' | 'Overdue' | 'Awaiting Results';
  instructions: string;
  facilityLocation?: string;
}

export interface UpcomingReferral {
  id: string;
  specialty: string; // e.g. "Endocrinology", "Cardiology", "Nephrology"
  specialistName?: string;
  reason: string;
  status: 'Authorized' | 'Scheduled' | 'Action Needed';
  appointmentDate?: string;
  clinicPhone?: string;
  urgency: 'Routine' | 'Urgent';
  referralId: string;
}

export interface UpcomingAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string; // e.g., '2026-08-10'
  time: string; // e.g., '10:30 AM'
  location: string;
  purpose: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  prepInstructions?: string;
  clinicPhone?: string;
}

export interface CaregiverReminder {
  id: string;
  time: string;
  title: string;
  description: string;
  category: 'Medication' | 'Vitals' | 'Appointment' | 'Refill' | 'Daily Task';
  completed: boolean;
  frequency: 'Daily' | 'Weekly' | 'Once';
  createdBy?: string;
}

export interface CaregiverAlert {
  id: string;
  date: string;
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  message: string;
  resolved: boolean;
  resolvedAt?: string;
  category: 'Adherence' | 'Vitals' | 'Appointment' | 'Emergency';
}

export type FollowUpCategory =
  | 'Next Appointment'
  | 'Repeat Investigations'
  | 'Medicine Review'
  | 'Doctor Follow-up'
  | 'Risk Reassessment';

export type FollowUpStatus = 'Scheduled' | 'Upcoming' | 'Completed' | 'Missed';

export interface FollowUpItem {
  id: string;
  category: FollowUpCategory;
  title: string;
  dueDate: string; // YYYY-MM-DD
  time?: string;
  status: FollowUpStatus;
  priority: 'High' | 'Medium' | 'Low';
  
  // Triggers/Inputs for AI intelligence generation
  basedOnDisease: string;
  basedOnRisk: RiskLevel;
  basedOnDoctorDecision: string;
  basedOnPreviousReport: string;
  
  actionInstructions: string;
  doctorNotes?: string;
  completedAt?: string;
  completionNotes?: string;
  reminderSent: boolean;
  reminderSentAt?: string;
  missedAlertGenerated?: boolean;
}

export type InteractionCategory =
  | 'Drug-Drug Interactions'
  | 'Drug-Disease Interactions'
  | 'Duplicate Therapy'
  | 'Contraindications'
  | 'Monitoring Recommendations';

export type InteractionSeverity = 'Severe' | 'Major' | 'Moderate' | 'Minor';

export interface DrugInteractionItem {
  id: string;
  category: InteractionCategory;
  severity: InteractionSeverity;
  involvedAgents: string[]; // e.g. ["Lisinopril", "Spironolactone"] or ["Metformin", "Chronic Kidney Disease Stage 3"]
  title: string;
  mechanism: string; // Detailed pharmacological mechanism
  clinicalImpact: string; // Clinical consequence or risk
  suggestedMonitoring: string; // Required lab parameters or vital checks
  alternativeDiscussionPoints: string[]; // Actionable therapeutic alternatives or clinician options
  isAcknowledged?: boolean;
  acknowledgedByDoctor?: string;
  acknowledgedAt?: string;
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  avatar: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  primaryDoctor: string;
  conditions: string[];
  lastAssessmentDate: string;
  vitals: Vitals;
  pendingReferral: boolean;
  referralSpecialist?: string;
  recentActivity: ActivityItem[];
  medications: FullMedication[];
  weeklyVitalsHistory: { day: string; bpSystolic: number; glucose: number; steps: number }[];
  emergencyContacts?: EmergencyContact[];
  pendingTests?: PendingTest[];
  upcomingReferrals?: UpcomingReferral[];
  upcomingAppointments?: UpcomingAppointment[];
  caregiverAlerts?: CaregiverAlert[];
  caregiverReminders?: CaregiverReminder[];
  caregiverName?: string;
  caregiverRelation?: string;
  followUpItems?: FollowUpItem[];
}

export interface AssessmentRecord {
  id: string;
  patientId: string;
  date: string;
  doctorName: string;
  symptoms: string[];
  vitals: Vitals;
  lifestyleFactors: {
    smoking: 'Never' | 'Former' | 'Active';
    alcohol: 'None' | 'Moderate' | 'Heavy';
    physicalActivityMinutesPerWeek: number;
    dietQuality: 'Poor' | 'Moderate' | 'Optimal';
  };
  predictedDiseases: {
    disease: string;
    riskScore: number; // %
    riskLevel: RiskLevel;
    keyFactors: string[];
  }[];
  screeningRecommendations: string[];
  specialistReferralNeeded: boolean;
  specialistType?: string;
  doctorNotes: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  category: 'Lab Test' | 'ECG' | 'Imaging' | 'Genomics';
  uploadDate: string;
  fileSize: string;
  status: 'Reviewed' | 'Pending AI Summary' | 'Requires Attention';
  summary: string;
  abnormalItems: {
    parameter: string;
    value: string;
    normalRange: string;
    severity: 'High' | 'Low' | 'Normal';
  }[];
}

export interface Recommendation {
  id: string;
  category: 'Diet & Nutrition' | 'Exercise & Fitness' | 'Medication' | 'Screening';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  actionableStep: string;
}

export type IndianCuisineRegion = 'Gujarati' | 'Maharashtrian' | 'Punjabi' | 'South Indian' | 'North Indian' | 'Jain';
export type DietaryPreference = 'Vegetarian' | 'Non Vegetarian' | 'Jain';
export type HealthConditionTarget = 'Diabetes' | 'Hypertension' | 'CKD' | 'Heart Disease' | 'Weight Loss' | 'Weight Gain';

export interface MealItem {
  dishName: string;
  quantity: string;
  description: string;
  benefits: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  cookingTip?: string;
}

export interface FoodAvoidance {
  foodItem: string;
  reason: string;
  category: string;
}

export interface FoodAlternative {
  unhealthyFood: string;
  healthyAlternative: string;
  benefit: string;
}

export interface IndianDietPlan {
  id: string;
  title: string;
  region: IndianCuisineRegion;
  dietType: DietaryPreference;
  conditions: HealthConditionTarget[];
  isBudgetFriendly: boolean;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  breakfast: MealItem;
  morningSnack: MealItem;
  lunch: MealItem;
  eveningSnack: MealItem;
  dinner: MealItem;
  hydrationPlan: {
    targetLiters: number;
    recommendedBeverages: string[];
    hydrationTips: string;
  };
  foodsToAvoid: FoodAvoidance[];
  healthyAlternatives: FoodAlternative[];
  clinicalRationale: string;
  dietitianNotice: string;
}

export type SuitabilityStatus = 'Suitable' | 'Moderate' | 'High Risk' | 'Avoid';

export interface ConditionSuitability {
  condition: 'Diabetes' | 'Hypertension' | 'CKD' | 'Heart Disease';
  status: SuitabilityStatus;
  reasoning: string;
}

export interface FoodScanAlternative {
  dishName: string;
  description: string;
  benefits: string;
  estimatedCalories: number;
}

export interface FoodScanResult {
  dishName: string;
  confidence: number; // e.g. 94 (%)
  portionSize: string; // e.g., "1 plate (approx 250g)"
  macros: {
    calories: number;
    protein: number; // g
    carbs: number; // g
    fat: number; // g
    fiber: number; // g
    sugar: number; // g
    sodium: number; // mg
  };
  conditionSuitability: ConditionSuitability[];
  healthierAlternatives: FoodScanAlternative[];
  rationale: string;
  summaryNote: string;
  disclaimer: string;
}

// ==========================================
// Agentic Pipeline Types
// ==========================================

export interface IntakeResult {
  symptoms: string[];
  duration: string | null;
  severity_mentioned: string | null;
  context: string | null;
}

export interface TriageResult {
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
  suspected_risk: string;
  rationale: string;
  red_flags: string[];
  suggested_action: 'DISPATCH_AMBULANCE' | 'SCHEDULE_PCP' | 'LOG_AND_NUDGE';
}

export interface ActionTaken {
  action: string;
  status: 'success' | 'failed' | 'pending';
  details?: string;
}

export interface OrchestrationResult {
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
  actions: ActionTaken[];
  hospital?: { name: string; address: string; distance: string; eta: string };
  appointment?: { doctor: string; date: string; time: string };
  nudge?: string;
}

export interface EmpathyResult {
  spokenText: string;
  audioBase64?: string;
}

export interface AgentPipelineResult {
  intake: IntakeResult;
  triage: TriageResult;
  orchestration: OrchestrationResult;
  empathy: EmpathyResult;
}

export type AgentStatus = 'idle' | 'processing' | 'complete' | 'error';

