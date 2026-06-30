export const SEARCH_DATA = [
  // Foundation
  { title:'HTML', subtitle:'Structure & Semantics', path:'/learn/html', tags:['forms','semantic','tables','accessibility'], difficulty:'beginner' },
  { title:'CSS', subtitle:'Styling & Layout', path:'/learn/css', tags:['flexbox','grid','animations','variables','sass','bem'], difficulty:'beginner' },
  { title:'Bootstrap', subtitle:'CSS Framework', path:'/learn/bootstrap', tags:['grid','components','utilities'], difficulty:'beginner' },
  { title:'Tailwind CSS', subtitle:'Utility-first styling', path:'/learn/tailwind', tags:['utility','dark mode','responsive','config'], difficulty:'beginner' },
  { title:'JavaScript', subtitle:'Core language concepts', path:'/learn/javascript', tags:['closures','event loop','async','promises','regex','prototype'], difficulty:'beginner' },
  // React
  { title:'React', subtitle:'Component-based UI', path:'/learn/react', tags:['hooks','useState','useEffect','context','router','performance'], difficulty:'intermediate' },
  // Backend
  { title:'Node.js', subtitle:'Server-side JavaScript', path:'/learn/nodejs', tags:['modules','streams','fs','crypto','pm2','worker threads'], difficulty:'intermediate' },
  { title:'Express', subtitle:'Web framework', path:'/learn/express', tags:['routing','middleware','rest api','validation','error handling'], difficulty:'intermediate' },
  { title:'REST APIs', subtitle:'API design & usage', path:'/learn/apis', tags:['http','postman','axios','status codes'], difficulty:'intermediate' },
  { title:'NestJS', subtitle:'Enterprise backend framework', path:'/learn/nestjs', tags:['modules','controllers','guards','typeorm','decorators'], difficulty:'advanced' },
  { title:'Authentication', subtitle:'JWT & bcrypt', path:'/learn/auth', tags:['jwt','bcrypt','protected routes','oauth','security'], difficulty:'intermediate' },
  { title:'File Uploads', subtitle:'Multer & Cloudinary', path:'/learn/uploads', tags:['multer','cloudinary','s3','validation'], difficulty:'intermediate' },
  { title:'Nodemailer', subtitle:'Send emails from Node', path:'/learn/nodemailer', tags:['smtp','templates','otp','password reset'], difficulty:'intermediate' },
  { title:'Payments', subtitle:'Razorpay & Stripe', path:'/learn/payments', tags:['razorpay','stripe','webhooks','checkout'], difficulty:'advanced' },
  { title:'Socket.io', subtitle:'Real-time communication', path:'/learn/socketio', tags:['events','rooms','websocket','chat'], difficulty:'advanced' },
  // Database
  { title:'MongoDB', subtitle:'NoSQL database', path:'/learn/mongodb', tags:['crud','aggregation','indexes','transactions','atlas'], difficulty:'intermediate' },
  { title:'Mongoose', subtitle:'MongoDB ODM', path:'/learn/mongoose', tags:['schemas','models','middleware','populate','virtuals'], difficulty:'intermediate' },
  { title:'Redis', subtitle:'In-memory data store', path:'/learn/redis', tags:['caching','rate limiting','otp','pub/sub'], difficulty:'advanced' },
  { title:'SQL & Databases', subtitle:'Relational databases', path:'/learn/sql', tags:['queries','joins','postgresql','mysql','orm'], difficulty:'intermediate' },
  // AI Tools
  { title:'LLMs & AI APIs', subtitle:'Gemini, OpenAI, Claude', path:'/learn/llms', tags:['gemini','openai','prompt engineering','rag','embeddings'], difficulty:'advanced' },
  { title:'Deepgram', subtitle:'Speech-to-text API', path:'/learn/deepgram', tags:['stt','live transcription','voice bot','websocket'], difficulty:'advanced' },
  { title:'ngrok', subtitle:'Local tunnel to internet', path:'/learn/ngrok', tags:['tunneling','webhooks','oauth','local dev'], difficulty:'beginner' },
  // DevOps
  { title:'Docker', subtitle:'Containerisation', path:'/learn/docker', tags:['dockerfile','compose','images','volumes'], difficulty:'advanced' },
  { title:'CI/CD', subtitle:'GitHub Actions', path:'/learn/cicd', tags:['github actions','workflows','deploy','testing'], difficulty:'advanced' },
  { title:'Deployment', subtitle:'Ship to production', path:'/learn/deploy', tags:['vercel','render','pm2','nginx','ssl'], difficulty:'intermediate' },
  // Quality
  { title:'TypeScript', subtitle:'Typed JavaScript', path:'/learn/typescript', tags:['types','interfaces','generics','react+ts'], difficulty:'intermediate' },
  { title:'Testing', subtitle:'Jest & React Testing Library', path:'/learn/testing', tags:['jest','rtl','supertest','mocking'], difficulty:'advanced' },
  { title:'Logging & Errors', subtitle:'Winston, Morgan, Sentry', path:'/learn/error-tracking', tags:['winston','morgan','sentry','logging'], difficulty:'advanced' },
  { title:'Git & GitHub', subtitle:'Version control', path:'/learn/git', tags:['commands','branching','prs','github actions'], difficulty:'beginner' },
  // Build
  { title:'App Clones', subtitle:'Build real products', path:'/clones', tags:['myntra','spotify','netflix','instagram','twitter'], difficulty:'advanced' },
  { title:'Mini Projects', subtitle:'10 guided builds', path:'/mini-projects', tags:['task tracker','weather app','shopping cart','blog api'], difficulty:'beginner' },
  // Features
  { title:'Interview Prep', subtitle:'Q&A for every technology', path:'/interview', tags:['questions','answers','javascript','react','node','mongodb'], difficulty:'intermediate' },
  { title:'Daily Challenge', subtitle:'AI-generated coding challenge', path:'/challenge', tags:['practice','coding','gemini','daily'], difficulty:'intermediate' },
  { title:'My Snippets', subtitle:'Your personal code library', path:'/snippets', tags:['saved','code','personal'], difficulty:'beginner' },
  { title:'Flashcards', subtitle:'Study mode from starred items', path:'/flashcards', tags:['study','review','spaced repetition'], difficulty:'beginner' },
  { title:'Resume Tracker', subtitle:'Skills checklist for your resume', path:'/resume', tags:['skills','resume','job','checklist'], difficulty:'beginner' },
  { title:'Starred Items', subtitle:'Saved code blocks', path:'/starred', tags:['bookmarks','saved','starred'], difficulty:'beginner' },
];

export const DIFFICULTY_COLOR = {
  beginner:     '#16a34a',
  intermediate: '#ca8a04',
  advanced:     '#ea580c',
};
