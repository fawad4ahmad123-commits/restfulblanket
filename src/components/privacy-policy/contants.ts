export const PRIVACY_POLICY = {
  title: 'Privatlivspolitik',

  intro:
    'Vi passer på dine data – ligesom vi passer på din søvn. Når du handler hos os, besøger vores hjemmeside eller blot er nysgerrig på vores produkter, indsamler og behandler vi nogle personoplysninger om dig. Her kan du læse, hvordan vi håndterer dem – med respekt og omtanke.',

  company: {
    name: 'RestfulBlanket',
    address: [
      'Vig Erhvervspark',
      'Søndre Vænge 19E',
      '4560 Vig',
      'CVR: 43362674',
    ],
    phone: '+45 29 82 29 73',
    email: 'kernero@restfulblanket.dk',
    description:
      'Vi er dataansvarlige for de oplysninger, vi modtager og behandler om dig.',
  },

  sections: [
    {
      title: 'Når du besøger restfulblanket.dk',
      content:
        'Når du besøger vores hjemmeside, gemmer vi oplysninger via cookies – men kun med dit samtykke.',
      items: [
        'IP-adresse',
        'Enhed og browser',
        'Hvilke sider du besøger',
        'Hvad du lægger i kurven',
        'Hvis du tilmelder dig nyhedsbrevet (dit navn, din e-mail og eventuelle præferencer)',
      ],
      purpose:
        'Vi bruger oplysningerne til at forbedre hjemmesiden, vise dig relevant indhold og målrette vores markedsføring, hvis du har givet tilladelse til det.',
      legalBasis:
        'Databeskyttelsesforordningen artikel 6, stk. 1, litra a, b, c og f samt Cookiebekendtgørelsens § 3.',
      sharing:
        'Med dit samtykke kan vi dele tekniske oplysninger med eksempelvis WooCommerce, Google, Meta, Klaviyo og lignende tjenester til analyse og annoncering.',
    },
    {
      title: 'Når du handler hos os',
      content:
        'For at kunne sende din ordre har vi brug for nogle oplysninger om dig.',
      items: [
        'Navn, adresse, e-mail og telefonnummer',
        'Produkter du har købt',
      ],
      purpose:
        'Behandling og levering af din ordre, kundeservice samt lovpligtig regnskabsføring.',
      legalBasis:
        'Databeskyttelsesforordningen artikel 6, stk. 1, litra b og f.',
      storage:
        'Vi opbevarer oplysninger om dine køb i op til 5 år i henhold til Bogføringsloven.',
      sharing:
        'Vi deler dine oplysninger med vores logistik- og betalingspartnere. Alle data deles sikkert og kun med parter, som vi har databehandleraftaler med.',
    },
    {
      title: 'Når du søger job hos os',
      content: 'Hvis du sender en jobansøgning til os, kan vi behandle:',
      items: [
        'Navn',
        'Kontaktoplysninger',
        'CV',
        'Uddannelsesoplysninger',
        'Eventuelle straffeattestoplysninger, som du selv giver os',
      ],
      purpose: 'At kunne vurdere og behandle din ansøgning.',
      storage:
        'Maksimalt 6 måneder, medmindre vi aftaler andet. Du kan til enhver tid trække dit samtykke tilbage.',
    },
  ],

  rights: [
    'Indsigt i dine personoplysninger',
    'Rettelse af urigtige oplysninger',
    'Sletning, hvis vi ikke længere har et lovligt grundlag for at opbevare dine oplysninger',
    'Begrænsning af behandling',
    'Indsigelse mod vores behandling',
    'Dataportabilitet',
  ],

  rightsContact: 'kernero@restfulblanket.dk',

  complaint: {
    text: 'Du har altid ret til at indgive en klage til Datatilsynet.',
    url: 'https://www.datatilsynet.dk',
  },
};
