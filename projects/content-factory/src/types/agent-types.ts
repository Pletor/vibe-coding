export interface AgentMessage {
  from: string;
  to: string;
  type: 'briefing' | 'report' | 'decision' | 'escalation' | 'task' | 'status';
  priority: 'high' | 'medium' | 'low';
  payload: any;
  timestamp: Date;
  requiresResponse: boolean;
  id: string;
}

export interface HelmarAutonomy {
  canDecideAutonomously: string[];
  requiresApproval: string[];
  mustReport: string[];
}

export interface DailyPlan {
  date: Date;
  contentThemes: string[];
  budgetAllocation: BudgetAllocation;
  departmentTasks: DepartmentTask[];
  kpis: KPI[];
  priorities: Priority[];
}

export interface BudgetAllocation {
  total: number;
  content: number;
  production: number;
  distribution: number;
  marketing: number;
  operations: number;
}

export interface DepartmentTask {
  department: 'content' | 'production' | 'distribution' | 'revenue';
  taskId: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  deadline: Date;
  assignedTo: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
}

export interface KPI {
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface Priority {
  id: string;
  description: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
  deadline: Date;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface DailyReport {
  date: Date;
  performance: PerformanceMetrics;
  revenue: RevenueMetrics;
  content: ContentMetrics;
  issues: Issue[];
  achievements: Achievement[];
  tomorrowsPlan: string[];
}

export interface PerformanceMetrics {
  tasksCompleted: number;
  tasksTotal: number;
  successRate: number;
  systemUptime: number;
  responseTime: number;
}

export interface RevenueMetrics {
  dailyRevenue: number;
  monthlyRevenue: number;
  target: number;
  growth: number;
  sources: RevenueSource[];
}

export interface RevenueSource {
  platform: string;
  amount: number;
  percentage: number;
}

export interface ContentMetrics {
  postsCreated: number;
  videosProduced: number;
  audioStoriesGenerated: number;
  blogPostsWritten: number;
  engagementRate: number;
  reachTotal: number;
}

export interface Issue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  department: string;
  status: 'open' | 'in-progress' | 'resolved';
  reportedAt: Date;
  resolvedAt?: Date;
}

export interface Achievement {
  id: string;
  type: 'milestone' | 'performance' | 'revenue' | 'content';
  description: string;
  value: number;
  date: Date;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  timeline: string;
  budget: number;
  expectedROI: number;
  risks: string[];
  success_metrics: string[];
}

export interface DepartmentManager {
  name: string;
  department: string;
  status: 'online' | 'offline' | 'busy';
  currentTasks: DepartmentTask[];
  performance: PerformanceMetrics;
  lastUpdate: Date;
}

export interface ContentPlan {
  platforms: string[];
  themes: string[];
  frequency: { [platform: string]: number };
  target_audience: string[];
  content_types: string[];
  posting_schedule: PostingSchedule[];
}

export interface PostingSchedule {
  platform: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  content_type: string;
}

export interface AIModel {
  name: string;
  provider: 'openai' | 'anthropic' | 'google';
  model: string;
  purpose: string;
  cost_per_token: number;
}

export interface ExternalAPI {
  name: string;
  type: 'content' | 'media' | 'distribution' | 'analytics';
  status: 'active' | 'inactive' | 'error';
  usage: number;
  limit: number;
  cost: number;
}
