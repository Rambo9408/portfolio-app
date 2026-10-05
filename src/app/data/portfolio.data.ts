// Single source of truth for all portfolio content (from resume).
// Every design theme renders from this object.

/** A run of terminal text sharing one colour. */
export interface TermSegment {
  t: string;
  c?: 'prompt' | 'out' | 'str' | 'key';
}

export interface TermLine {
  segments: TermSegment[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
}

/**
 * A single engineering decision, told as judgment rather than as documentation.
 *
 * IMPORTANT — these are written deliberately at the level of "what I decided and why,
 * and what I traded away". They must never describe the internals of an employer's live
 * system: no schema, no auth token/session internals, no route or role maps, no sanitizer
 * allowlists, no named security gaps. That material is confidential and, published, would
 * be a security disclosure. Keep any future additions at this altitude.
 */
export interface CaseStudyCard {
  decision: string;
  why: string;
  tradeoff: string;
  result: string;
}

export interface CaseStudy {
  summary: string;
  cards: CaseStudyCard[];
}

export interface ProjectItem {
  name: string;
  description: string;
  tech: string[];
  highlight?: string;
  caseStudy?: CaseStudy;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    firstName: string;
    title: string;
    tagline: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    githubUrl: string;
    linkedin: string;
    linkedinUrl: string;
    resumeUrl: string;
    /** Optional headshot. Leave '' to fall back to the initials badge. */
    photo: string;
    initials: string;
    stats: { value: string; label: string }[];
  };
  terminal: TermLine[];
  skills: SkillGroup[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export const PORTFOLIO: PortfolioData = {
  profile: {
    name: 'Ram Kumar Mishra',
    firstName: 'Ram',
    title: 'Full Stack Software Engineer',
    tagline: 'Angular · Node.js · Docker · Playwright',
    summary:
      'Full Stack Software Engineer with 2+ years of experience building scalable web ' +
      'applications using Angular, Node.js, and MySQL. Experienced in REST APIs, JWT/RBAC, ' +
      'CSRF protection, SSE, backend caching, Docker, CI/CD, Playwright E2E testing, and ' +
      'modular monolithic architecture. Proven track record of delivering secure, ' +
      'production-ready solutions and improving system performance.',
    email: 'er.ram.ku.mishra@gmail.com',
    phone: '+91 8962916427',
    location: 'India',
    github: 'github.com/Rambo9408',
    githubUrl: 'https://github.com/Rambo9408',
    linkedin: 'linkedin.com/in/rammishra9408',
    linkedinUrl: 'https://linkedin.com/in/rammishra9408',
    resumeUrl: 'assets/RAM_MISHRA_Resume.pdf',
    // To use a headshot: drop the file at public/assets/profile.jpg and set
    // photo: 'assets/profile.jpg'. Leave '' to show the initials badge instead.
    photo: 'assets/profile.jpg',
    initials: 'RM',
    stats: [
      { value: '2+', label: 'Years Experience' },
      { value: '10+', label: 'Modules Shipped' },
      { value: '60–70%', label: 'Regression Effort Cut' },
      { value: '20–25%', label: 'Faster API Responses' },
    ],
  },
  terminal: [
    { segments: [{ t: '$ ', c: 'prompt' }, { t: 'whoami' }] },
    { segments: [{ t: 'Ram Kumar Mishra', c: 'out' }] },
    { segments: [{ t: '$ ', c: 'prompt' }, { t: 'cat role.txt' }] },
    { segments: [{ t: '"Full Stack Software Engineer"', c: 'str' }] },
    { segments: [{ t: '$ ', c: 'prompt' }, { t: 'stack --list' }] },
    { segments: [{ t: 'frontend', c: 'key' }, { t: ': Angular, RxJS, TypeScript' }] },
    { segments: [{ t: 'backend', c: 'key' }, { t: ' : Node.js, Express, MySQL' }] },
    { segments: [{ t: 'devops', c: 'key' }, { t: '  : Docker, CI/CD, Playwright' }] },
    { segments: [{ t: '$ ', c: 'prompt' }, { t: 'open --to work' }] },
    { segments: [{ t: '✔ available', c: 'out' }] },
  ],
  skills: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript', 'SQL'] },
    { label: 'Frontend', items: ['Angular', 'RxJS', 'HTML', 'CSS', 'SCSS', 'Tailwind CSS', 'PrimeNG'] },
    {
      label: 'Backend',
      items: ['Node.js', 'Express.js', 'REST APIs', 'TypeORM', 'JWT Auth', 'RBAC', 'CSRF Protection', 'SSE', 'Backend Caching'],
    },
    { label: 'Database', items: ['MySQL', 'MongoDB'] },
    { label: 'Testing', items: ['Playwright', 'Vitest', 'E2E Testing', 'API Testing'] },
    { label: 'DevOps', items: ['Docker', 'CI/CD Pipelines'] },
    { label: 'Tools', items: ['Git', 'GitHub', 'Postman', 'Linux', 'Jira'] },
  ],
  experience: [
    {
      role: 'Software Engineer',
      company: 'Arosys Technologies Pvt Ltd',
      period: 'June 2024 – Present',
      bullets: [
        'Engineered 10+ full-stack modules for the GMATwise platform, improving user workflow efficiency by 25–30%.',
        'Built secure REST APIs using JWT authentication, RBAC, and CSRF protection, reducing unauthorized access risks and strengthening application security across 10+ platform modules.',
        'Optimized real-time notification delivery using SSE, eliminating polling overhead and improving notification delivery responsiveness.',
        'Developed and maintained a Playwright-based End-to-End (E2E) automation framework covering critical user journeys, reducing manual regression effort by 60–70%.',
        'Containerized applications using Docker and integrated CI/CD workflows, reducing release effort and improving deployment consistency across environments.',
        'Implemented backend caching and query optimization strategies, reducing API response times by 20–25% and improving system scalability.',
        'Contributed to a modular monolithic architecture supporting 10+ business modules, improving maintainability and feature development efficiency.',
      ],
    },
  ],
  projects: [
    {
      name: 'GMATwise Platform',
      description:
        'Production-grade test preparation platform built with Angular, Node.js, and MySQL. ' +
        'Designed role-based workflows, analytics-ready result processing, and scalable backend ' +
        'services supporting complex business operations.',
      tech: ['Angular', 'Node.js', 'MySQL', 'RBAC', 'SSE', 'Docker'],
      highlight: 'Flagship product',
      caseStudy: {
        summary:
          'A production test-prep platform: 10+ business modules, role-based workflows for ' +
          'students, staff and admins, and an end-to-end suite covering the critical journeys. ' +
          'The decisions that shaped it, and what each one cost:',
        cards: [
          {
            decision: 'A modular monolith, not microservices',
            why:
              'Ten-plus business modules, one small team, one shared domain vocabulary. ' +
              'Microservices would have bought network hops, distributed tracing and independent ' +
              'deploy pipelines to solve coordination problems we did not have.',
            tradeoff:
              'Module boundaries have to be enforced by convention rather than by the network. ' +
              'Every feature follows the same strict layering — routing, controller, service, ' +
              'schema — so the seams stay visible and a module never reaches into another.',
            result:
              'Changes spanning several modules ship atomically in one deploy. Feature velocity ' +
              'without distributed-systems overhead.',
          },
          {
            decision: 'Session-aware authentication over purely stateless tokens',
            why:
              'Purely stateless tokens are fast and scale beautifully, but they cannot be ' +
              'revoked before they expire. "Log me out everywhere" and multi-device use both ' +
              'need revocation to be immediate, not eventual.',
            tradeoff:
              'It puts a lookup back on the authenticated request path — precisely the cost ' +
              'stateless tokens exist to avoid. Offset with short-lived caching so the common ' +
              'case never reaches the database.',
            result:
              'Immediate revocation and multi-device visibility, without giving up token-based auth.',
          },
          {
            decision: 'Server-Sent Events for notifications, not polling or WebSockets',
            why:
              'Notifications are strictly one-way: server to client. Polling spent most of its ' +
              'requests learning that nothing had changed. WebSockets would have bought a ' +
              'bidirectional channel that nothing in the feature needed.',
            tradeoff:
              'There is no client-to-server channel on that connection. The day a feature needs ' +
              'one, this becomes a WebSocket — a deliberate, reversible bet.',
            result:
              'Polling overhead eliminated; notifications arrive as soon as the server has them.',
          },
          {
            decision: 'In-process caching instead of reaching for Redis',
            why:
              'The API runs as a single process. An in-process cache gives sub-millisecond reads ' +
              'with no extra service to deploy, secure, monitor or pay for. Reaching for Redis ' +
              'first would have been infrastructure bought on speculation.',
            tradeoff:
              'It does not survive horizontal scaling. The moment we run multiple instances this ' +
              'has to become a shared cache with cross-instance invalidation — so that migration ' +
              'path is written down now, not discovered under load later.',
            result:
              'API response times down 20–25%, with caches invalidated explicitly on every write ' +
              'rather than left to expire and serve stale data.',
          },
          {
            decision: 'One schema as the single source of truth',
            why:
              'Hand-written types, runtime validators and API documentation always drift apart — ' +
              'and the documentation is what lies first. Deriving all three from one schema makes ' +
              'that drift structurally impossible.',
            tradeoff:
              'Every endpoint has to be described up front, which is more ceremony than reaching ' +
              'straight for the request body.',
            result:
              'Runtime-validated inputs, compile-time types and API docs that cannot silently go ' +
              'stale — from a single definition.',
          },
          {
            decision: 'Reuse authenticated state across E2E tests',
            why:
              'Driving the login flow before every test cost seconds per test. A slow suite is a ' +
              'suite people stop running, and a suite nobody runs catches nothing.',
            tradeoff:
              'Auth state is prepared once up front, so the tests that specifically exercise ' +
              'logging in have to opt out and drive it for real — otherwise the suite would be ' +
              'assuming the very thing it is meant to verify.',
            result:
              'Per-test auth dropped from seconds to a fraction of one. Manual regression effort ' +
              'down 60–70%.',
          },
          {
            decision: 'Zoneless change detection with signals',
            why:
              'The default approach patches every async browser API to guess when to re-render. ' +
              'Signals make the dependency explicit, so the framework re-renders what actually ' +
              'changed instead of asking everything whether it might have.',
            tradeoff:
              'Nothing updates by magic any more. State that is not a signal has to announce that ' +
              'it changed, which is a real constraint on how components are written.',
            result: 'Fine-grained updates and none of the framework overhead.',
          },
        ],
      },
    },
    {
      name: 'Shopping Cart Application',
      description:
        'Full-stack e-commerce system with authentication, cart, and order workflows. Created ' +
        'REST APIs and a responsive UI to ensure a smooth user experience.',
      tech: ['Angular', 'Node.js', 'Express.js', 'REST APIs', 'MySQL'],
    },
    {
      name: 'FirstLove Mobile App',
      description:
        'Cross-platform mobile application built with Angular, Ionic, and Capacitor. Implemented ' +
        'a reusable component architecture, reducing feature development effort by 30%.',
      tech: ['Angular', 'Ionic', 'Capacitor', 'TypeScript'],
    },
  ],
  education: [
    { degree: 'PG Diploma in Advanced Computing', institution: 'CDAC, Bangalore', period: '2023 – 2024' },
    { degree: 'PG Diploma in Computer Applications', institution: 'CV Raman University', period: '2019' },
    { degree: 'B.E. in Electrical & Electronics Engineering', institution: 'SSITM', period: '2017' },
  ],
};
