import { HelmarAutonomy } from '../types/agent-types';

export const HELMAR_AUTONOMY_RULES: HelmarAutonomy = {
  canDecideAutonomously: [
    'Daily content themes and topics',
    'Budget allocation under $1000',
    'Team task assignment and prioritization',
    'Performance optimization strategies',
    'Content scheduling and publishing',
    'A/B testing experiments',
    'Resource allocation across departments',
    'Minor workflow adjustments',
    'Social media engagement responses',
    'Content format selection',
    'Posting frequency optimization',
    'Audience targeting refinements'
  ],
  requiresApproval: [
    'Major strategy pivots or business model changes',
    'Budget expenditure over $1000',
    'New market or platform entry',
    'Staff restructuring or role changes',
    'Partnership agreements and collaborations',
    'Brand guidelines major modifications',
    'Legal compliance deviations',
    'Product pricing changes',
    'Market expansion strategies',
    'Technology stack modifications'
  ],
  mustReport: [
    'Daily performance metrics and KPIs',
    'Revenue and expense summaries',
    'Department status updates',
    'System errors and resolutions',
    'Content performance analytics',
    'Budget utilization reports',
    'Security incidents or breaches',
    'Customer feedback and complaints',
    'Competitive analysis insights',
    'Strategic recommendations'
  ]
};

export const DECISION_THRESHOLDS = {
  BUDGET_LIMIT: 1000,
  REVENUE_DROP_ALERT: 0.2, // 20% drop triggers escalation
  SYSTEM_UPTIME_MINIMUM: 0.999, // 99.9% uptime requirement
  TASK_SUCCESS_RATE_MINIMUM: 0.95, // 95% success rate requirement
  RESPONSE_TIME_MAXIMUM: 300000, // 5 minutes in milliseconds
  CONTENT_QUALITY_MINIMUM: 8, // Minimum 8/10 rating
  ENGAGEMENT_RATE_MINIMUM: 0.03 // 3% minimum engagement rate
};

export const REPORTING_SCHEDULE = {
  DAILY_BRIEFING: '09:00',
  EVENING_REPORT: '18:00',
  WEEKLY_STRATEGY: 'Sunday 10:00',
  MONTHLY_REVIEW: 'First Monday 14:00',
  QUARTERLY_PLANNING: 'First Monday of Quarter 09:00'
};

export const ESCALATION_LEVELS = {
  LEVEL_1: 'autonomous_resolution',
  LEVEL_2: 'department_consultation',
  LEVEL_3: 'owner_notification',
  LEVEL_4: 'external_expert'
};

export const CONTENT_TARGETS = {
  DAILY_POSTS: 10,
  WEEKLY_VIDEOS: 2,
  WEEKLY_AUDIO_STORIES: 3,
  WEEKLY_BLOG_POSTS: 5,
  MONTHLY_EBOOKS: 1,
  MONTHLY_COURSES: 2,
  MONTHLY_FOLLOWERS: 10000
};

export const BUSINESS_TARGETS = {
  MONTHLY_REVENUE: 50000,
  MONTHS_TO_TARGET: 6,
  SYSTEM_UPTIME: 0.999,
  CONTENT_PIECES_DAILY: 100,
  ENGAGEMENT_GROWTH: 0.05, // 5% monthly growth
  CONVERSION_RATE: 0.02 // 2% conversion rate
};
