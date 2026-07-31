export type BookStage = {
  id: string;
  title: string;
  body: string;
};

export type LibraryBook = {
  id: string;
  title: string;
  author: string;
  cover: string;
  stages: BookStage[];
};

export const books: LibraryBook[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/images/library/atomic-habits.jpeg",
    stages: [
      {
        id: "book",
        title: "Atomic Habits",
        body:
          "A practical framework for building remarkable results through consistent, incremental improvement rather than dramatic change."
      },
      {
        id: "idea",
        title: "Big results come from tiny systems.",
        body:
          "Success isn't built through occasional moments of brilliance. It's the outcome of small actions repeated consistently over time."
      },
      {
        id: "reflection",
        title: "Victor's Reflection",
        body:
          "This book reinforced my belief that sustainable leadership is built through disciplined systems. Every organisation grows to the level of the systems it consistently executes."
      }
    ]
  },

  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/images/library/deep-work.jpeg",
    stages: [
      {
        id: "book",
        title: "Deep Work",
        body:
          "A case for eliminating distraction and creating space for focused, meaningful work."
      },
      {
        id: "idea",
        title: "Focus is becoming a competitive advantage.",
        body:
          "The ability to concentrate deeply is increasingly rare—and therefore increasingly valuable."
      },
      {
        id: "reflection",
        title: "Victor's Reflection",
        body:
          "Strategy requires uninterrupted thinking. Some of the most important decisions I've made came from creating room to think before reacting."
      }
    ]
  },

  {
    id: "good-to-great",
    title: "Good to Great",
    author: "Jim Collins",
    cover: "/images/library/good-to-great.jpeg",
    stages: [
      {
        id: "book",
        title: "Good to Great",
        body:
          "An exploration of why some organisations outperform others over the long term."
      },
      {
        id: "idea",
        title: "Greatness is intentional.",
        body:
          "Sustainable excellence is created through disciplined leadership, disciplined people and disciplined execution."
      },
      {
        id: "reflection",
        title: "Victor's Reflection",
        body:
          "The organisations that last don't chase every opportunity. They become exceptional at what matters most."
      }
    ]
  },

  {
    id: "start-with-why",
    title: "Start With Why",
    author: "Simon Sinek",
    cover: "/images/library/start-with-why.jpeg",
    stages: [
      {
        id: "book",
        title: "Start With Why",
        body:
          "A powerful reminder that purpose inspires action more effectively than instruction."
      },
      {
        id: "idea",
        title: "People buy into purpose before process.",
        body:
          "Clear vision creates alignment. Alignment creates momentum."
      },
      {
        id: "reflection",
        title: "Victor's Reflection",
        body:
          "Whether building communities or businesses, I've found that clarity of purpose consistently outperforms clever execution."
      }
    ]
  },

  {
    id: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/images/library/the-psychology-of-money.jpeg",
    stages: [
      {
        id: "book",
        title: "The Psychology of Money",
        body:
          "Understanding that behaviour often matters more than intelligence when making financial decisions."
      },
      {
        id: "idea",
        title: "Good decisions aren't always logical.",
        body:
          "They are often emotional, contextual and deeply human."
      },
      {
        id: "reflection",
        title: "Victor's Reflection",
        body:
          "Leadership isn't only about numbers. It's about understanding the people behind those numbers."
      }
    ]
  }
];