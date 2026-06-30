export const INTERVIEW_QA = {
  javascript: {
    label: 'JavaScript', color: '#ffd166',
    questions: [
      { q:'What is the difference between let, const and var?', a:'var is function-scoped and hoisted. let and const are block-scoped. const cannot be reassigned (but the object it points to can be mutated). Use const by default, let when you need to reassign, avoid var.' },
      { q:'Explain closures with an example.', a:'A closure is when a function retains access to its outer scope even after the outer function has returned. Example: function counter(){ let n=0; return ()=>++n; } const c=counter(); c(); // 1, c(); // 2. The inner function "closes over" n.' },
      { q:'What is the event loop?', a:'JavaScript is single-threaded. The event loop picks tasks from the callback queue and runs them on the call stack when it\'s empty. Order: sync code → microtasks (Promises) → macrotasks (setTimeout). This is why Promise.resolve().then() runs before setTimeout(fn, 0).' },
      { q:'What is the difference between == and ===?', a:'== does type coercion (0 == "0" is true). === checks type AND value (0 === "0" is false). Always use ===.' },
      { q:'What are Promises and async/await?', a:'A Promise represents a future value. .then()/.catch() chains async operations. async/await is syntactic sugar — await pauses execution until the Promise resolves, making async code look synchronous. Always wrap in try/catch.' },
      { q:'What is prototype chain?', a:'Every JS object has a hidden [[Prototype]] link. When you access a property, JS looks on the object first, then up the prototype chain until it finds it or hits null. Classes are syntactic sugar over prototypes.' },
      { q:'Explain the "this" keyword.', a:'this depends on HOW a function is called: 1) Default: global/undefined. 2) Method call (obj.fn()): this = obj. 3) new: this = new object. 4) call/apply/bind: explicit. Arrow functions have no own this — they inherit from lexical scope.' },
      { q:'What is debounce vs throttle?', a:'Debounce: delay execution until N ms after last call (search input). Throttle: execute at most once per N ms (scroll handler). Both prevent excessive function calls.' },
      { q:'What is destructuring?', a:'Extracting values from arrays/objects into variables. const {name, age} = user; const [first, ...rest] = arr. Also works in function params: function fn({name, role="user"}){}.' },
      { q:'What are generators?', a:'Functions that can pause (yield) and resume. function* gen(){ yield 1; yield 2; } const g=gen(); g.next(); // {value:1, done:false}. Used for lazy sequences and async control flow.' },
    ]
  },
  react: {
    label: 'React', color: '#00d4aa',
    questions: [
      { q:'What is the Virtual DOM?', a:'A lightweight JS copy of the real DOM. When state changes, React creates a new virtual DOM, diffs it against the old one (reconciliation), and only updates the changed real DOM nodes. This makes updates fast.' },
      { q:'When does a component re-render?', a:'When: 1) Its own state changes. 2) Its parent re-renders. 3) Context it subscribes to changes. 4) Props change. Prevent unnecessary re-renders with React.memo, useMemo, useCallback.' },
      { q:'useEffect dependency array — what does it do?', a:'[] = run once on mount. [dep] = run when dep changes. No array = run every render. Return a cleanup function for subscriptions/timers. Forgetting deps causes stale closures.' },
      { q:'What is lifting state up?', a:'Moving state to the closest common ancestor when multiple children need the same data. The parent holds the state and passes it + update function as props.' },
      { q:'useCallback vs useMemo?', a:'useMemo caches a computed value. useCallback caches a function reference. Both recalculate only when deps change. Use to prevent child re-renders when passing functions/objects as props.' },
      { q:'What is Context API?', a:'A way to pass data through the component tree without prop drilling. createContext() → Provider wraps the app with value → useContext() in any child to consume. Good for auth, theme, cart. For complex state, use Zustand or Redux.' },
      { q:'Controlled vs uncontrolled components?', a:'Controlled: React controls the input value via state (value={state} + onChange). Uncontrolled: DOM controls it, accessed via useRef. Controlled is preferred in React.' },
      { q:'What is React.memo?', a:'HOC that prevents re-render if props haven\'t changed (shallow comparison). const MemoComp = React.memo(Component). Combine with useCallback for passed function props.' },
      { q:'What is the key prop in lists?', a:'A unique identifier for each list item so React can track changes during reconciliation. Should be stable and unique — use IDs, not array indexes (indexes cause bugs on reorder/delete).' },
      { q:'What is code splitting?', a:'Split your bundle into smaller chunks loaded on demand. React.lazy(() => import("./Page")) + <Suspense fallback={<Loading/>}>. Reduces initial bundle size and speeds up first load.' },
    ]
  },
  nodejs: {
    label: 'Node.js', color: '#5bc17a',
    questions: [
      { q:'What is Node.js and why is it fast?', a:'Node.js is a JavaScript runtime built on Chrome\'s V8 engine. It\'s fast for I/O-heavy workloads because it\'s non-blocking — I/O operations are handled asynchronously via the event loop instead of blocking threads.' },
      { q:'What is the difference between require and import?', a:'require is CommonJS (Node default). import is ES Modules (needs "type":"module" in package.json or .mjs). ESM is the modern standard. require is synchronous, import is async.' },
      { q:'What are streams in Node.js?', a:'Streams process data in chunks instead of loading everything into memory. Types: Readable, Writable, Duplex, Transform. Use for large file processing, HTTP responses, video streaming. pipe() connects streams.' },
      { q:'What is process.env?', a:'An object containing environment variables. Access with process.env.MY_VAR. Use dotenv package to load from .env file. Never hardcode secrets — use env vars.' },
      { q:'What is the purpose of package.json?', a:'Defines project metadata, scripts (dev/build/test), dependencies (needed in prod) and devDependencies (only for development). npm install reads it to install packages.' },
      { q:'What is middleware in Express?', a:'A function that runs between request and response: (req, res, next) => {}. Call next() to pass to the next middleware. Used for logging, auth checks, body parsing, error handling.' },
      { q:'How do you handle errors in async Express routes?', a:'Wrap in try/catch and call next(error). Add error middleware with 4 params: (err, req, res, next). Or use express-async-errors package to auto-catch.' },
      { q:'What is JWT?', a:'JSON Web Token — a signed token with 3 parts: header.payload.signature. Server signs it with a secret. Client sends it in Authorization header. Server verifies signature without DB lookup. Stateless auth.' },
      { q:'What is CORS?', a:'Cross-Origin Resource Sharing — browser security that blocks requests to different origins. Express: app.use(cors({origin:"https://yourfrontend.com"})). Never use cors() without origin restriction in production.' },
      { q:'What is the difference between PUT and PATCH?', a:'PUT replaces the entire resource (all fields required). PATCH partially updates (only send changed fields). In practice, many APIs use PUT for both, but PATCH is semantically correct for partial updates.' },
    ]
  },
  mongodb: {
    label: 'MongoDB', color: '#47a855',
    questions: [
      { q:'What is the difference between SQL and NoSQL?', a:'SQL: tables with fixed schema, ACID transactions, relational. NoSQL (MongoDB): flexible documents (JSON), horizontal scaling, no fixed schema. Use MongoDB for flexible/evolving data; SQL for complex relationships.' },
      { q:'What is an index in MongoDB?', a:'A data structure that speeds up queries by avoiding full collection scans. db.collection.createIndex({field:1}). Without indexes, MongoDB scans every document. Always index fields you query frequently.' },
      { q:'What is the aggregation pipeline?', a:'A series of stages that transform documents. Common stages: $match (filter), $group (aggregate), $sort, $project (shape), $lookup (join), $unwind. More powerful than find() for complex queries.' },
      { q:'What is $lookup?', a:'Left outer join in aggregation. Joins documents from another collection based on a field. $lookup: {from:"orders", localField:"_id", foreignField:"userId", as:"orders"}.' },
      { q:'What is populate() in Mongoose?', a:'Replaces ObjectId references with the actual documents from the referenced collection. User.find().populate("posts") replaces post IDs with full post documents. Similar to a JOIN.' },
      { q:'What is schema validation in Mongoose?', a:'Define types, required fields, min/max, enum, custom validators in the Schema. Mongoose validates before saving. Better to catch bad data early than after DB insert.' },
      { q:'When would you use embedded documents vs references?', a:'Embed when data is always accessed together and doesn\'t grow unboundedly (user profile, address). Reference when data is shared, large, or queried independently (posts, orders, products).' },
      { q:'What are MongoDB transactions?', a:'ACID transactions across multiple documents/collections. Use session: const session = await conn.startSession(); session.startTransaction(); try{...await session.commitTransaction()}catch{await session.abortTransaction()}.' },
      { q:'What is the difference between findOne and find?', a:'findOne returns one document or null. find returns a cursor (all matches). Always use findOne when you expect one result — it\'s clearer and slightly faster.' },
      { q:'What is $unwind?', a:'Deconstructs an array field into separate documents — one document per array element. Needed to aggregate across array contents. After $unwind, use $group to re-aggregate.' },
    ]
  },
  general: {
    label: 'Full Stack / General', color: '#4da6ff',
    questions: [
      { q:'What is REST?', a:'Representational State Transfer — an architecture for APIs. Uses HTTP methods (GET/POST/PUT/DELETE), stateless, resource-based URLs (/users/123), returns JSON. Not a protocol, just conventions.' },
      { q:'What is the difference between authentication and authorisation?', a:'Authentication: who are you? (login, JWT). Authorisation: what are you allowed to do? (admin vs user roles, resource ownership). Auth happens first, then authz.' },
      { q:'What is a race condition?', a:'When two async operations depend on shared state and the outcome depends on timing. Example: two requests both read count=5, both increment, both write 6 instead of 7. Fix with atomic operations or transactions.' },
      { q:'What is N+1 query problem?', a:'Fetching N items then making 1 additional query per item = N+1 queries total. Fix with populate() in Mongoose, SQL JOINs, or DataLoader. Common performance killer.' },
      { q:'What is rate limiting?', a:'Restricting how many requests a client can make in a time window. Prevents abuse and DDoS. Implement with express-rate-limit + Redis store. Return 429 Too Many Requests when exceeded.' },
      { q:'What is a webhook?', a:'An HTTP callback — a URL on your server that another service POSTs to when an event happens (payment completed, message received). You register the URL with the third-party service.' },
      { q:'What is the difference between localStorage and sessionStorage?', a:'localStorage persists until explicitly cleared (survives page refresh and browser close). sessionStorage clears when the tab closes. Both are ~5MB, synchronous, and not accessible cross-origin.' },
      { q:'What is XSS?', a:'Cross-Site Scripting — injecting malicious scripts into web pages viewed by others. Prevent: escape HTML output, use Content Security Policy, HttpOnly cookies, avoid dangerouslySetInnerHTML with user content.' },
      { q:'What is SQL injection? Does MongoDB have it?', a:'Injecting SQL to manipulate queries. MongoDB isn\'t SQL so no SQL injection, but has NoSQL injection — never pass raw user input as query operators. Use Mongoose validation and $eq instead of trusting user-provided operators.' },
      { q:'Explain MVC architecture.', a:'Model (data/business logic), View (UI), Controller (handles requests, connects M and V). In MERN: Model = Mongoose, View = React, Controller = Express routes. Keeps code organised and testable.' },
    ]
  }
};
