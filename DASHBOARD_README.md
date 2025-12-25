# Personal Analytics Dashboard

A comprehensive, AI-powered analytics dashboard built with Next.js that visualizes and analyzes data from your Google Sheets tracking system. Features password protection, semantic search, and an intelligent AI chat agent.

## Features

### 📊 Analytics Pages
- **Overview**: 7 key statistics, daily score trends, rating distribution, and recent activity feed
- **Sleep**: Duration trends, quality scores, and sleep stage breakdowns
- **Work**: Productivity analytics, hours by subject, and session tracking
- **Workouts**: Fitness stats, calories burned, and workout type analysis
- **Money**: Spending trends, category breakdowns, and top merchants
- **Screen Time**: Digital habit tracking, top apps, and category analysis

### 🔍 Semantic Search
- Natural language search across all your daily notes
- Powered by OpenAI embeddings with cosine similarity matching
- Results cached in Vercel KV for optimal performance
- Automatic embedding generation and refresh capabilities

### 🤖 AI Chat Agent
- Conversational interface to query your data
- 7 specialized tools for analyzing different aspects of your life:
  - Overall stats and ratings
  - Sleep patterns
  - Work productivity
  - Fitness activities
  - Spending habits
  - Screen time usage
  - Correlation analysis between metrics
- Streaming responses for smooth UX
- Chat history stored in Vercel KV

### 🔐 Security
- Password-protected access
- HTTP-only cookies
- Server-side authentication
- Environment variable-based credentials

## Setup Instructions

### 1. Environment Variables

Add the following to your `.env` file:

```env
# Existing Google Sheets credentials (already configured)
GOOGLE_CLIENT_EMAIL=...
GOOGLE_PRIVATE_KEY=...
SPREADSHEET_ID=...
OVERVIEW_WORKSHEET_ID=...
WORK_WORKSHEET_ID=...
SLEEP_WORKSHEET_ID=...
WORKOUT_WORKSHEET_ID=...
MONEY_WORKSHEET_ID=...
SCREENTIME_WORKSHEET_ID=...

# Dashboard Authentication
DASHBOARD_PASSWORD=your_secure_password_here

# AI & Embeddings (Vercel AI Gateway)
AI_GATEWAY_API_KEY=your_vercel_ai_gateway_key_here

# Vercel KV (for embeddings and chat history)
KV_URL=your_vercel_kv_url_here
KV_REST_API_TOKEN=your_vercel_kv_token_here
KV_REST_API_READ_ONLY_TOKEN=your_vercel_kv_readonly_token_here
```

### 2. Get Vercel AI Gateway API Key

1. Go to [vercel.com/ai-gateway](https://vercel.com/ai-gateway)
2. Sign up or log in
3. Navigate to your team's AI Gateway settings
4. Create a new API key
5. Copy the key to `AI_GATEWAY_API_KEY` in your `.env`

### 3. Set Up Vercel KV

1. Go to [vercel.com](https://vercel.com)
2. Navigate to your team's Storage tab
3. Click "Create Database"
4. Select "KV" (Redis)
5. Follow the setup wizard
6. Copy the environment variables:
   - `KV_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
7. Add them to your `.env` file

### 4. Set Dashboard Password

Replace `your_secure_password_here` in `.env` with a strong password:

```env
DASHBOARD_PASSWORD=MySecurePassword123!
```

### 5. Install Dependencies (Already Done)

Dependencies are already installed:
- `ai` - AI SDK core
- `@ai-sdk/react` - React hooks for AI features
- `@vercel/kv` - Vercel KV client
- `lucide-react` - Icons
- `recharts` - Charts (already installed)

### 6. Run the Development Server

```bash
pnpm dev
```

### 7. Access the Dashboard

1. Navigate to `http://localhost:3000/dashboard`
2. You'll be redirected to the login page
3. Enter the password you set in step 4
4. You're in!

## Usage Guide

### Semantic Search

1. Go to **Dashboard > Search**
2. Click "Refresh Embeddings" on your first visit (this generates embeddings for all your notes)
3. Search using natural language:
   - "days I felt productive"
   - "when did I exercise"
   - "what made me happy"
   - "times I slept poorly"

### AI Chat

1. Go to **Dashboard > Chat**
2. Ask questions about your data:
   - "How has my sleep quality been this month?"
   - "What are my most productive work subjects?"
   - "How many calories have I burned working out?"
   - "Is there a correlation between my sleep and productivity?"

The AI has access to 7 tools:
- `getOverallStats` - Daily scores and ratings
- `getSleepStats` - Sleep duration, quality, stages
- `getWorkStats` - Hours worked, subjects, sessions
- `getWorkoutStats` - Calories, heart rate, workout types
- `getMoneyStats` - Spending by category, merchants
- `getScreenTimeStats` - App usage, categories
- `findCorrelations` - Analyze relationships between metrics

## Data Storage

### Vercel KV Structure

**Note Embeddings:**
- Key: `embedding:{date}`
- Contains: date, note text, embedding vector, overall score
- Set: `embeddings:notes` tracks all dates with embeddings

**Chat History:**
- Key: `chat:history`
- List of last 100 messages
- Includes role, content, timestamp

### Caching Strategy

- All data pages use Next.js `cacheLife('hours')` for 1-hour cache
- Embeddings stored permanently in KV
- Chat history stored in KV, limited to 100 messages

## Architecture

```
/dashboard
├── /login              # Authentication page
├── /                   # Overview (7 stats + charts + activity)
├── /sleep              # Sleep analytics with detailed charts
├── /work               # Work productivity stats
├── /workouts           # Fitness tracking
├── /money              # Spending analysis
├── /screen-time        # Digital habit tracking
├── /search             # Semantic search interface
└── /chat               # AI chat agent

/api/dashboard
├── /auth               # Login/logout endpoints
├── /search             # Semantic search (GET) & refresh (POST)
└── /chat               # AI chat with tools
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Vercel AI SDK with AI Gateway
- **Database**: Vercel KV (Redis)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4
- **Data Source**: Google Sheets (existing)

## Customization

### Adding More Charts

Follow the pattern in existing pages:
1. Create chart component in `/components/Dashboard/{Section}/`
2. Import and use in the section page
3. Use Recharts with dark theme styling

### Adding More AI Tools

Edit `/app/api/dashboard/chat/route.ts`:
1. Add a new tool in the `tools` object
2. Define input schema with Zod
3. Implement the `execute` function
4. Return structured data

### Changing AI Provider

The AI SDK uses Vercel AI Gateway by default. To use a specific provider:

```typescript
// OpenAI directly
const result = streamText({
  model: 'openai/gpt-4o',
  // ...
});

// Anthropic
const result = streamText({
  model: 'anthropic/claude-sonnet-4-5-20250929',
  // ...
});

// Google
const result = streamText({
  model: 'google/gemini-2.5-flash',
  // ...
});
```

## Notes Column Format

The semantic search expects daily notes to be in the `r` column (Notes) of your Overview worksheet. Make sure your Google Sheets has this column populated with text content for best search results.

## Troubleshooting

### "No embeddings found" in search
- Click "Refresh Embeddings" button
- Check that your Overview worksheet has notes in the `r` column
- Verify `AI_GATEWAY_API_KEY` is set correctly

### Chat agent not responding
- Check AI Gateway API key
- Verify all worksheet IDs are correct
- Check browser console for errors

### Authentication not working
- Ensure `DASHBOARD_PASSWORD` is set in `.env`
- Try clearing cookies and logging in again
- Check middleware is running

### KV connection errors
- Verify all KV environment variables are set
- Check Vercel KV dashboard for connection status
- Ensure KV database is in the same region as deployment

## Future Enhancements

Ideas for extending the dashboard:
- [ ] Export data as CSV/PDF reports
- [ ] Custom date range filters on all pages
- [ ] Goal setting and progress tracking
- [ ] Weekly/monthly email summaries
- [ ] Data visualization preferences
- [ ] Advanced correlation heatmaps
- [ ] Predictive insights using ML
- [ ] Mobile-responsive improvements
- [ ] Dark/light theme toggle
- [ ] Multiple user support

## License

Private project for personal use.
