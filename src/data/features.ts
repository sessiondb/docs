/**
 * Feature definitions for the SessionDB landing page.
 * "Available now" = open source core; "Roadmap" = in development / planned.
 */

export interface AvailableFeature {
	id: string;
	title: string;
	description: string;
}

export interface RoadmapFeature {
	id: string;
	title: string;
	description: string;
	badge: 'PLANNED' | 'BETA';
}

/** Features available in the open source core today. */
export const availableNowFeatures: AvailableFeature[] = [
	{
		id: 'secure-query-runner',
		title: 'Secure Query Runner',
		description: 'Browser-based SQL execution for MySQL and Postgres with permission checks and history.',
	},
	{
		id: 'schema-discovery',
		title: 'Schema Discovery',
		description: 'Automatic metadata sync: see tables, columns, and types without exposing DB credentials.',
	},
	{
		id: 'identity-user-management',
		title: 'Identity & User Management',
		description: 'Users, roles, and granular permissions so only the right people reach the gateway.',
	},
	{
		id: 'data-level-access-control',
		title: 'Data-Level Access Control',
		description: 'Control access by instance → database → schema → table → column.',
	},
	{
		id: 'audit-logging',
		title: 'Audit Logging',
		description: 'Full transparency: every query and access change is logged for compliance.',
	},
	{
		id: 'approval-workflow',
		title: 'Approval Workflow',
		description: 'Human-in-the-loop: request database access and credentials; approvers grant or deny.',
	},
	{
		id: 'db-user-provisioning',
		title: 'DB User Provisioning',
		description: 'Create and manage database users and credentials through the gateway.',
	},
	{
		id: 'instance-ai-config',
		title: 'Instance & AI Config',
		description: 'Connect your DBs and bring your own AI keys (BYOK) for SQL generation and explanation.',
	},
	{
		id: 'multi-database-support',
		title: 'Multi-Database Support',
		description: 'One gateway for PostgreSQL and MySQL via a pluggable dialect layer.',
	},
	{
		id: 'query-history-scripts',
		title: 'Query History & Scripts',
		description: 'Run SQL, save scripts, and keep a searchable history of executions.',
	},
];

/** Roadmap features (in development or planned). No commercial wording. */
export const roadmapFeatures: RoadmapFeature[] = [
	{
		id: 'live-session-management',
		title: 'Live Session Management',
		description: 'Monitor and terminate active DB connections in real time.',
		badge: 'PLANNED',
	},
	{
		id: 'alerting-metrics',
		title: 'Alerting & Metrics',
		description: 'Health dashboards and notifications for database anomalies.',
		badge: 'PLANNED',
	},
	{
		id: 'reporting',
		title: 'Reporting',
		description: 'Automated insights and query performance history.',
		badge: 'PLANNED',
	},
	{
		id: 'ttl-time-based-access',
		title: 'TTL & Time-Based Access',
		description: 'Time-bound credentials and expiring grants for temporary access.',
		badge: 'PLANNED',
	},
];
