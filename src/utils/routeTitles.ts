const routeTitles = new Map<string, string>([
  ['/', 'Robert Schimanek'],
  ['/blog', 'Blog'],
  ['/blog/expertise', 'Expertise'],
  ['/blog/publications', 'Publications'],
  ['/projects', 'Projects'],
  ['/expertise', 'Expertise'],
  ['/posts', 'Posts'],
  ['/this-site', 'This Site'],
  ['/imprint', 'Imprint'],
  ['/404', 'Not Found'],
  ['/expertise/data-engineering-and-etl', 'Data Engineering and ETL'],
  ['/expertise/machine-learning-and-ai-development', 'Machine Learning and AI Development'],
  ['/expertise/data-analytics-and-business-intelligence', 'Data Analytics and Business Intelligence'],
  ['/expertise/web-development', 'Web Development'],
  ['/expertise/human-machine-interfaces', 'Human Machine Interfaces'],
  ['/expertise/mobile-development', 'Mobile Development'],
])

export function getRouteTitle(path: string): string {
  return routeTitles.get(path) || 'Robert Schimanek'
}
