import { streamText, tool, convertToModelMessages } from 'ai';
import { z } from 'zod';
import { storeChatMessage } from '@/lib/kv';
import {
  fetchBothSheets,
  fetchWorkSessions,
  fetchWorkouts,
  fetchMoney,
  fetchScreenTime,
} from '@/lib/sheets';
import {
  calculateSleepStats,
  calculateWorkStats,
  calculateWorkoutStats,
  calculateMoneyStats,
  calculateScreenTimeStats,
  calculateOverallStats,
  filterByDays,
} from '@/lib/dashboard/stats';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: 'openai/gpt-4o',
    system: `You are a personal analytics AI assistant with access to the user's comprehensive life tracking data.
    You can analyze sleep patterns, work productivity, fitness activities, spending habits, and screen time.

    Always be insightful, supportive, and data-driven in your responses. When providing analysis:
    - Give specific numbers and trends
    - Offer actionable insights
    - Highlight interesting patterns or correlations
    - Be encouraging about positive trends
    - Suggest improvements based on the data

    Use the available tools to query the user's data before answering questions.`,
    messages: await convertToModelMessages(messages),
    tools: {
      getOverallStats: tool({
        description: 'Get overall daily scores and ratings for a specified time period',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze (e.g., 7, 30, 90). Use -1 for all data.'),
        }),
        execute: async ({ days }) => {
          const { overviewData } = await fetchBothSheets();
          const filtered = filterByDays(overviewData, days);
          const stats = calculateOverallStats(filtered);

          return {
            avgScore: stats.avgScore,
            medianScore: stats.medianScore,
            ratingDistribution: stats.ratingDistribution,
            totalDays: stats.totalDays,
            period: days === -1 ? 'all time' : `last ${days} days`,
          };
        },
      }),

      getSleepStats: tool({
        description: 'Get sleep statistics including duration, quality scores, and sleep stages',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
        }),
        execute: async ({ days }) => {
          const { sleepData } = await fetchBothSheets();
          const filtered = filterByDays(sleepData, days);
          const stats = calculateSleepStats(filtered);

          return {
            avgDuration: stats.avgDuration,
            avgScore: stats.avgScore,
            avgRem: stats.avgRem,
            avgDeep: stats.avgDeep,
            totalNights: stats.totalNights,
            period: `last ${days} days`,
          };
        },
      }),

      getWorkStats: tool({
        description: 'Get work productivity statistics including hours worked, subjects, and focus levels',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
        }),
        execute: async ({ days }) => {
          const workSessions = await fetchWorkSessions();
          const filtered = filterByDays(workSessions, days);
          const stats = calculateWorkStats(filtered);

          return {
            totalHours: stats.totalHours,
            avgHoursPerDay: stats.avgHoursPerDay,
            mostProductiveSubject: stats.mostProductiveSubject,
            subjectHours: stats.subjectHours,
            totalSessions: stats.totalSessions,
            period: `last ${days} days`,
          };
        },
      }),

      getWorkoutStats: tool({
        description: 'Get fitness and workout statistics including calories, heart rate, and workout types',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
        }),
        execute: async ({ days }) => {
          const workouts = await fetchWorkouts();
          const filtered = filterByDays(workouts, days);
          const stats = calculateWorkoutStats(filtered);

          return {
            totalWorkouts: stats.totalWorkouts,
            totalCalories: stats.totalCalories,
            avgCaloriesPerWorkout: stats.avgCaloriesPerWorkout,
            avgHeartRate: stats.avgHeartRate,
            mostCommonType: stats.mostCommonType,
            typeCounts: stats.typeCounts,
            period: `last ${days} days`,
          };
        },
      }),

      getMoneyStats: tool({
        description: 'Get spending statistics including total spent, categories, and top merchants',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
        }),
        execute: async ({ days }) => {
          const transactions = await fetchMoney();
          const filtered = filterByDays(transactions, days);
          const stats = calculateMoneyStats(filtered);

          return {
            totalSpent: stats.totalSpent,
            avgPerTransaction: stats.avgPerTransaction,
            totalTransactions: stats.totalTransactions,
            categorySpending: stats.categorySpending,
            topMerchants: Object.fromEntries(stats.topMerchants),
            period: `last ${days} days`,
          };
        },
      }),

      getScreenTimeStats: tool({
        description: 'Get screen time statistics including total time, top apps, and categories',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
        }),
        execute: async ({ days }) => {
          const screenTime = await fetchScreenTime();
          const filtered = filterByDays(screenTime, days);
          const stats = calculateScreenTimeStats(filtered);

          return {
            totalMinutes: stats.totalMinutes,
            avgPerDay: stats.avgPerDay,
            categoryTime: stats.categoryTime,
            topApps: Object.fromEntries(stats.topApps),
            period: `last ${days} days`,
          };
        },
      }),

      findCorrelations: tool({
        description: 'Analyze correlations between different metrics (e.g., sleep vs productivity, workouts vs mood)',
        inputSchema: z.object({
          days: z.number().describe('Number of days to analyze'),
          metrics: z.array(z.string()).describe('Metrics to correlate (e.g., ["sleep", "work", "overall"])'),
        }),
        execute: async ({ days, metrics }) => {
          const [
            { sleepData, overviewData },
            workSessions,
            workouts,
          ] = await Promise.all([
            fetchBothSheets(),
            fetchWorkSessions(),
            fetchWorkouts(),
          ]);

          const filteredOverview = filterByDays(overviewData, days);
          const filteredSleep = filterByDays(sleepData, days);
          const filteredWork = filterByDays(workSessions, days);
          const filteredWorkouts = filterByDays(workouts, days);

          // Build a correlation dataset by date
          const dataByDate = new Map();

          filteredOverview.forEach(entry => {
            dataByDate.set(entry.date, { overallScore: entry.overallScore, rating: entry.rating });
          });

          filteredSleep.forEach(entry => {
            const existing = dataByDate.get(entry.date) || {};
            dataByDate.set(entry.date, { ...existing, sleepHours: entry.time, sleepScore: entry.score });
          });

          // Calculate work hours per day
          const workHoursByDate = new Map();
          filteredWork.forEach(session => {
            workHoursByDate.set(session.date, (workHoursByDate.get(session.date) || 0) + session.duration);
          });
          workHoursByDate.forEach((hours, date) => {
            const existing = dataByDate.get(date) || {};
            dataByDate.set(date, { ...existing, workHours: hours });
          });

          // Count workouts per day
          const workoutsByDate = new Map();
          filteredWorkouts.forEach(workout => {
            workoutsByDate.set(workout.date, (workoutsByDate.get(workout.date) || 0) + 1);
          });
          workoutsByDate.forEach((count, date) => {
            const existing = dataByDate.get(date) || {};
            dataByDate.set(date, { ...existing, workoutCount: count });
          });

          return {
            message: 'Data collected for correlation analysis',
            dataPoints: Array.from(dataByDate.entries()).map(([date, data]) => ({
              date,
              ...data,
            })),
            metrics,
            period: `last ${days} days`,
          };
        },
      }),
    },
  });

  // Store chat messages for history (optional)
  try {
    for (const message of messages) {
      await storeChatMessage({
        role: message.role,
        content: typeof message.content === 'string' ? message.content : JSON.stringify(message.content),
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    console.error('Failed to store chat message:', error);
  }

  return result.toUIMessageStreamResponse();
}
