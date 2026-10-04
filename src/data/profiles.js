/* Coding profiles — update the numbers with YOUR real stats.
   GitHub loads live from the public API; the rest have no public API,
   so keep these in sync with your actual profiles. */

export const profiles = [
  {
    id: 'github',
    platform: 'GitHub',
    handle: '@DevPatel-2208',
    url: 'https://github.com/DevPatel-2208',
    icon: 'github',
    color: '#6e7681',
    blurb: 'Repositories, commits & open-source work.',
    chips: ['Open Source', 'MERN Projects'],
    live: true,
  },
  {
    id: 'hackerrank',
    platform: 'HackerRank',
    handle: '@devkpatel426',
    url: 'https://www.hackerrank.com/profile/devkpatel426',
    icon: 'hackerrank',
    color: '#2ec866',
    blurb: 'Coding challenges & verified skill certificates.',
    chips: ['Problem Solving', 'Certifications'],
    live: false,
    // Example once you check your profile: stats: [{ value: '5★', label: 'Problem Solving' }]
    stats: [],
  },
  {
    id: 'unstop',
    platform: 'Unstop',
    handle: '@devpat21899',
    // Verify this URL opens YOUR profile (Unstop format: unstop.com/u/<username>)
    url: 'https://unstop.com/u/devpat21899',
    icon: 'unstop',
    color: '#1c4982',
    blurb: 'Hackathons, coding contests & competitions.',
    chips: ['Hackathons', 'Competitions'],
    live: false,
    stats: [],
    /* Daily practice streak (unstop.com/practice/coding).
       Unstop has no public API, so this number is manual —
       update it with YOUR real current streak, e.g. streak: 47.
       Leave null to hide the badge. */
    streak: null,
    /* Screenshot proof (optional): save your streak screenshot as
       public/unstop-streak.png and set proof: '/unstop-streak.png'.
       It renders as a clickable thumbnail with a full-size lightbox. */
    proof: null,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'dev-patel-0a3166346',
    url: 'https://www.linkedin.com/in/dev-patel-0a3166346',
    icon: 'linkedin',
    color: '#0a66c2',
    blurb: 'Professional network, experience & recommendations.',
    chips: ['Network', 'Experience'],
    live: false,
    stats: [],
  },
]
