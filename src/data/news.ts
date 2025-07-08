export type NewsItem = {
    id: number
    title: string
    slug: string
    description: string
    content: string
    image: string
    category: string
};

const placeholder =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23cccccc%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23666%22%20dy%3D%22.3em%22%20font-size%3D%2248%22%20font-family%3D%22Arial%22%20text-anchor%3D%22middle%22%3ENews%3C%2Ftext%3E%3C%2Fsvg%3E'

export const news: NewsItem[] = [
    {
        id: 1,
        title: 'Next.js 15 Released',
        slug: 'nextjs-15-released',
        description: 'The Next.js team announces version 15 with new features.',
        content: 'Full article about the new Next.js 15 release and its features.',
        image: placeholder,
        category: 'technology',
    },
    {
        id: 2,
        title: 'Local Elections Results',
        slug: 'local-elections-results',
        description: 'Citizens voted in the local elections held yesterday.',
        content: 'Detailed report about the results of the local elections.',
        image: placeholder,
        category: 'politics',
    },
    {
        id: 3,
        title: 'Championship Final Highlights',
        slug: 'championship-final-highlights',
        description: 'Highlights from the exciting championship final.',
        content: 'Everything that happened during the championship final match.',
        image: placeholder,
        category: 'sports',
    },
    {
        id: 4,
        title: 'New Smartphone Review',
        slug: 'new-smartphone-review',
        description: 'We review the latest smartphone on the market.',
        content: 'An in-depth review of the newest smartphone features.',
        image: placeholder,
        category: 'technology',
    },
    {
        id: 5,
        title: 'Government Announces Budget',
        slug: 'government-announces-budget',
        description: 'The government presented its budget for the next year.',
        content: 'Analysis of the newly announced budget and its implications.',
        image: placeholder,
        category: 'politics',
    },
    {
        id: 6,
        title: 'Local Team Wins Championship',
        slug: 'local-team-wins-championship',
        description: 'Celebrations as the local team secures the title.',
        content: 'A recap of the final game that secured the championship.',
        image: placeholder,
        category: 'sports',
    },
];
