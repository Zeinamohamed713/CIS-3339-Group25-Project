require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
  clients,
  orgs,
  events,
  users,
  services
} = require('./models/models');

const MONGO_URL = process.env.MONGO_URL;
const ORG_ID = process.env.ORG_ID;

if (!MONGO_URL) {
  console.error('MONGO_URL is missing from .env');
  process.exit(1);
}

if (!ORG_ID) {
  console.error('ORG_ID is missing from .env');
  process.exit(1);
}

if (!mongoose.Types.ObjectId.isValid(ORG_ID)) {
  console.error('ORG_ID is not a valid MongoDB ObjectId');
  process.exit(1);
}

const orgId = new mongoose.Types.ObjectId(ORG_ID);

// Required project users
const viewerUsername = process.env.SEED_VIEWER_USERNAME || 'user';
const viewerPassword = process.env.SEED_VIEWER_PASSWORD || 'user';

const editorUsername = process.env.SEED_EDITOR_USERNAME || 'admin';
const editorPassword = process.env.SEED_EDITOR_PASSWORD || 'admin';

function makeObjectId(number) {
  return new mongoose.Types.ObjectId(
    number.toString(16).padStart(24, '0')
  );
}

async function seedOrganization() {
  await orgs.updateOne(
    { _id: orgId },
    {
      $set: {
        name: 'Community Center'
      }
    },
    {
      upsert: true
    }
  );

  console.log('Organization initialized');
}

async function seedUsers() {
  const viewerHash = await bcrypt.hash(viewerPassword, 10);
  const editorHash = await bcrypt.hash(editorPassword, 10);

  await users.updateOne(
    {
      username: viewerUsername,
      org: orgId
    },
    {
      $set: {
        username: viewerUsername,
        password: viewerHash,
        role: 'viewer',
        org: orgId
      },
      $setOnInsert: {
        _id: makeObjectId(9001)
      }
    },
    {
      upsert: true
    }
  );

  await users.updateOne(
    {
      username: editorUsername,
      org: orgId
    },
    {
      $set: {
        username: editorUsername,
        password: editorHash,
        role: 'editor',
        org: orgId
      },
      $setOnInsert: {
        _id: makeObjectId(9002)
      }
    },
    {
      upsert: true
    }
  );

  console.log('Users initialized');
}

async function seedServices() {
 

  const serviceData = [
    {
      _id: makeObjectId(1001),
      name: 'Food Assistance',
      description: 'Provides groceries and food support to community members.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1002),
      name: 'Housing Assistance',
      description: 'Provides housing resources and rental assistance information.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1003),
      name: 'Career Counseling',
      description: 'Career planning, resume support, and job search assistance.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1004),
      name: 'Health Screening',
      description: 'Basic community health and wellness screening services.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1005),
      name: 'Financial Literacy',
      description: 'Budgeting and personal finance education.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1006),
      name: 'Youth Mentoring',
      description: 'Mentoring and educational support for young people.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1007),
      name: 'Senior Support',
      description: 'Resources and assistance for senior community members.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1008),
      name: 'Transportation Help',
      description: 'Transportation resources for appointments and services.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1009),
      name: 'Legal Aid',
      description: 'General legal aid information and referral services.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1010),
      name: 'Computer Training',
      description: 'Basic computer and digital literacy instruction.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1011),
      name: 'Childcare Resources',
      description: 'Information about childcare and family support programs.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1012),
      name: 'Nutrition Education',
      description: 'Nutrition and healthy eating education.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1013),
      name: 'Veteran Assistance',
      description: 'Resources and referrals for veterans and their families.',
      status: 'Active',
      org: orgId
    },
    {
      _id: makeObjectId(1014),
      name: 'Tax Preparation',
      description: 'Basic tax preparation assistance for eligible residents.',
      status: 'Inactive',
      org: orgId
    },
    {
      _id: makeObjectId(1015),
      name: 'Language Classes',
      description: 'Community language and English learning classes.',
      status: 'Active',
      org: orgId
    }
  ];

for (const service of serviceData) {
  await services.updateOne(
    { _id: service._id },
    {
      $setOnInsert: service
    },
    {
      upsert: true
    }
  );
}

console.log('Services initialized');
}

async function seedClients() {
 

  const clientData = [
    {
      _id: makeObjectId(2001),
      firstName: 'Maria',
      middleName: '',
      lastName: 'Garcia',
      email: 'maria.garcia@example.com',
      phoneNumber: {
        primary: '7135551001',
        alternate: ''
      },
      address: {
        line1: '101 Main Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77002'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2002),
      firstName: 'James',
      middleName: '',
      lastName: 'Wilson',
      email: 'james.wilson@example.com',
      phoneNumber: {
        primary: '7135551002',
        alternate: ''
      },
      address: {
        line1: '220 Oak Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77003'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2003),
      firstName: 'Linda',
      middleName: '',
      lastName: 'Martinez',
      email: 'linda.martinez@example.com',
      phoneNumber: {
        primary: '7135551003',
        alternate: ''
      },
      address: {
        line1: '330 Pine Avenue',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77004'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2004),
      firstName: 'Robert',
      middleName: '',
      lastName: 'Brown',
      email: 'robert.brown@example.com',
      phoneNumber: {
        primary: '7135551004',
        alternate: ''
      },
      address: {
        line1: '440 Travis Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77005'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2005),
      firstName: 'Patricia',
      middleName: '',
      lastName: 'Davis',
      email: 'patricia.davis@example.com',
      phoneNumber: {
        primary: '7135551005',
        alternate: ''
      },
      address: {
        line1: '550 Lamar Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77006'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2006),
      firstName: 'Michael',
      middleName: '',
      lastName: 'Rodriguez',
      email: 'michael.rodriguez@example.com',
      phoneNumber: {
        primary: '7135551006',
        alternate: ''
      },
      address: {
        line1: '660 Gray Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77007'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2007),
      firstName: 'Jennifer',
      middleName: '',
      lastName: 'Anderson',
      email: 'jennifer.anderson@example.com',
      phoneNumber: {
        primary: '7135551007',
        alternate: ''
      },
      address: {
        line1: '770 Allen Parkway',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77008'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2008),
      firstName: 'David',
      middleName: '',
      lastName: 'Thomas',
      email: 'david.thomas@example.com',
      phoneNumber: {
        primary: '7135551008',
        alternate: ''
      },
      address: {
        line1: '880 Washington Avenue',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77009'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2009),
      firstName: 'Susan',
      middleName: '',
      lastName: 'Taylor',
      email: 'susan.taylor@example.com',
      phoneNumber: {
        primary: '7135551009',
        alternate: ''
      },
      address: {
        line1: '990 Heights Boulevard',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77008'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2010),
      firstName: 'Joseph',
      middleName: '',
      lastName: 'Moore',
      email: 'joseph.moore@example.com',
      phoneNumber: {
        primary: '7135551010',
        alternate: ''
      },
      address: {
        line1: '111 Westheimer Road',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77006'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2011),
      firstName: 'Karen',
      middleName: '',
      lastName: 'Jackson',
      email: 'karen.jackson@example.com',
      phoneNumber: {
        primary: '7135551011',
        alternate: ''
      },
      address: {
        line1: '122 Richmond Avenue',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77098'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2012),
      firstName: 'Charles',
      middleName: '',
      lastName: 'Martin',
      email: 'charles.martin@example.com',
      phoneNumber: {
        primary: '7135551012',
        alternate: ''
      },
      address: {
        line1: '133 Alabama Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77004'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2013),
      firstName: 'Nancy',
      middleName: '',
      lastName: 'Lee',
      email: 'nancy.lee@example.com',
      phoneNumber: {
        primary: '7135551013',
        alternate: ''
      },
      address: {
        line1: '144 Kirby Drive',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77005'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2014),
      firstName: 'Daniel',
      middleName: '',
      lastName: 'Perez',
      email: 'daniel.perez@example.com',
      phoneNumber: {
        primary: '7135551014',
        alternate: ''
      },
      address: {
        line1: '155 Montrose Boulevard',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77019'
      },
      orgs: [orgId]
    },
    {
      _id: makeObjectId(2015),
      firstName: 'Betty',
      middleName: '',
      lastName: 'Thompson',
      email: 'betty.thompson@example.com',
      phoneNumber: {
        primary: '7135551015',
        alternate: ''
      },
      address: {
        line1: '166 Shepherd Drive',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77007'
      },
      orgs: [orgId]
    }
  ];

  for (const client of clientData) {
  await clients.updateOne(
    { _id: client._id },
    {
      $setOnInsert: client
    },
    {
      upsert: true
    }
  );
}

console.log('Clients initialized');
}

function dateFromToday(days) {
  const date = new Date();
  date.setUTCHours(12, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

async function seedEvents() {
 

  const eventData = [
    {
      _id: makeObjectId(3001),
      org: orgId,
      name: 'Community Health Day',
      services: [
        makeObjectId(1004),
        makeObjectId(1012)
      ],
      date: dateFromToday(-10),
      address: {
        line1: '100 Community Drive',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77002'
      },
      description: 'Health screenings and nutrition information.',
      attendees: [
        makeObjectId(2001),
        makeObjectId(2002),
        makeObjectId(2003)
      ]
    },
    {
      _id: makeObjectId(3002),
      org: orgId,
      name: 'Career Workshop',
      services: [
        makeObjectId(1003),
        makeObjectId(1010)
      ],
      date: dateFromToday(-5),
      address: {
        line1: '200 Career Lane',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77003'
      },
      description: 'Resume and career development workshop.',
      attendees: [
        makeObjectId(2004),
        makeObjectId(2005)
      ]
    },
    {
      _id: makeObjectId(3003),
      org: orgId,
      name: 'Family Resource Fair',
      services: [
        makeObjectId(1001),
        makeObjectId(1011)
      ],
      date: dateFromToday(5),
      address: {
        line1: '300 Family Avenue',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77004'
      },
      description: 'Community resources for families.',
      attendees: [
        makeObjectId(2006),
        makeObjectId(2007)
      ]
    },
    {
      _id: makeObjectId(3004),
      org: orgId,
      name: 'Financial Wellness Class',
      services: [
        makeObjectId(1005)
      ],
      date: dateFromToday(10),
      address: {
        line1: '400 Finance Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77005'
      },
      description: 'Budgeting and personal finance class.',
      attendees: [
        makeObjectId(2008)
      ]
    },
    {
      _id: makeObjectId(3005),
      org: orgId,
      name: 'Youth Mentor Meetup',
      services: [
        makeObjectId(1006)
      ],
      date: dateFromToday(15),
      address: {
        line1: '500 Youth Center Road',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77006'
      },
      description: 'Youth mentoring orientation and community meetup.',
      attendees: []
    },
    {
      _id: makeObjectId(3006),
      org: orgId,
      name: 'Senior Resource Day',
      services: [
        makeObjectId(1007),
        makeObjectId(1008)
      ],
      date: dateFromToday(20),
      address: {
        line1: '600 Senior Way',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77007'
      },
      description: 'Resources and transportation information for seniors.',
      attendees: []
    },
    {
      _id: makeObjectId(3007),
      org: orgId,
      name: 'Legal Information Session',
      services: [
        makeObjectId(1009)
      ],
      date: dateFromToday(25),
      address: {
        line1: '700 Justice Drive',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77008'
      },
      description: 'Legal aid and referral information.',
      attendees: []
    },
    {
      _id: makeObjectId(3008),
      org: orgId,
      name: 'Digital Skills Workshop',
      services: [
        makeObjectId(1010)
      ],
      date: dateFromToday(30),
      address: {
        line1: '800 Technology Road',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77009'
      },
      description: 'Basic computer training workshop.',
      attendees: []
    },
    {
      _id: makeObjectId(3009),
      org: orgId,
      name: 'Housing Resource Meeting',
      services: [
        makeObjectId(1002)
      ],
      date: dateFromToday(35),
      address: {
        line1: '900 Housing Lane',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77010'
      },
      description: 'Housing assistance resources and referrals.',
      attendees: []
    },
    {
      _id: makeObjectId(3010),
      org: orgId,
      name: 'Veteran Support Fair',
      services: [
        makeObjectId(1013)
      ],
      date: dateFromToday(40),
      address: {
        line1: '1000 Veteran Boulevard',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77011'
      },
      description: 'Veteran and family resource fair.',
      attendees: []
    },
    {
      _id: makeObjectId(3011),
      org: orgId,
      name: 'Community Food Distribution',
      services: [
        makeObjectId(1001)
      ],
      date: dateFromToday(45),
      address: {
        line1: '1100 Market Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77012'
      },
      description: 'Food distribution for community residents.',
      attendees: []
    },
    {
      _id: makeObjectId(3012),
      org: orgId,
      name: 'Language Learning Night',
      services: [
        makeObjectId(1015)
      ],
      date: dateFromToday(50),
      address: {
        line1: '1200 Learning Avenue',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77013'
      },
      description: 'Community language learning and conversation practice.',
      attendees: []
    },
    {
      _id: makeObjectId(3013),
      org: orgId,
      name: 'Childcare Information Session',
      services: [
        makeObjectId(1011)
      ],
      date: dateFromToday(55),
      address: {
        line1: '1300 Family Street',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77014'
      },
      description: 'Information about childcare resources.',
      attendees: []
    },
    {
      _id: makeObjectId(3014),
      org: orgId,
      name: 'Nutrition Workshop',
      services: [
        makeObjectId(1012)
      ],
      date: dateFromToday(60),
      address: {
        line1: '1400 Wellness Drive',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77015'
      },
      description: 'Nutrition education and healthy meal planning.',
      attendees: []
    },
    {
      _id: makeObjectId(3015),
      org: orgId,
      name: 'Community Services Expo',
      services: [
        makeObjectId(1001),
        makeObjectId(1003),
        makeObjectId(1005),
        makeObjectId(1008)
      ],
      date: dateFromToday(65),
      address: {
        line1: '1500 Community Center Boulevard',
        line2: '',
        city: 'Houston',
        county: 'Harris',
        zip: '77016'
      },
      description: 'Community-wide resource and services expo.',
      attendees: []
    }
  ];

  for (const event of eventData) {
  await events.updateOne(
    { _id: event._id },
    {
      $setOnInsert: event
    },
    {
      upsert: true
    }
  );
}

console.log('Events initialized');
}

async function initializeDatabase() {
  try {
    console.log('Connecting to MongoDB...');

    await mongoose.connect(MONGO_URL);

    console.log('Database connection successful');

    await seedOrganization();
    await seedUsers();

    // Events reference clients and services,
    // so seed those before events.
    await seedServices();
    await seedClients();
    await seedEvents();

    console.log('');
    console.log('Database initialization complete.');
    console.log(`Organization ID: ${ORG_ID}`);
    console.log(`Viewer username: ${viewerUsername}`);
    console.log(`Editor username: ${editorUsername}`);
  } catch (error) {
    console.error('Database initialization failed:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

initializeDatabase();