import { createConnection } from 'mysql2';
import { faker } from '@faker-js/faker';
import moment from 'moment';

// MySQL Database connection details
const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = 'root';
const DB_NAME = 'applicant';

// Create MySQL connection
const connection = createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: 3307
});

// Function to generate random date of birth between 01-01-1990 and 30-12-2010
function generateDob() {
    const startDate = moment('1990-01-01');
    const endDate = moment('2010-12-30');
    const randomDate = startDate
        .clone()
        .add(Math.random() * (endDate - startDate), 'milliseconds');
    return randomDate.format('YYYY-MM-DD');
}

// Function to generate a random phone number starting with 6, 7, 8, or 9
function generatePhoneNumber() {
    const firstDigit = ['6', '7', '8', '9'][Math.floor(Math.random() * 4)];
    let phoneNumber = firstDigit + '';
    for (let i = 0; i < 9; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
}

// Function to generate random address using Faker
function generateAddress() {
    return (
        faker.location.streetAddress() +
        ', ' +
        faker.location.city() +
        ', ' +
        faker.location.state() +
        ', ' +
        faker.location.zipCode()
    );
}


// Function to generate a random city from Gujarat, India
function generateCity() {
    const cities = [
        'Ahmedabad',
        'Surat',
        'Vadodara',
        'Rajkot',
        'Bhavnagar',
        'Junagadh',
        'Gandhinagar',
        'Anand',
        'Nadiad',
        'Valsad',
        'Mehsana',
        'Navsari',
        'Patan',
        'Morbi',
        'Bharuch',
        'Gandhinagar',
        'Veraval',
        'Dahod',
        'Kheda',
        'Bhuj',
    ];
    return cities[Math.floor(Math.random() * cities.length)];
}

// Function to generate gender based on the first name
function generateGender(firstName) {
    const maleNames = [
        'Aarav',
        'Aditya',
        'Arjun',
        'Aniket',
        'Bharat',
        'Bhavesh',
        'Balram',
        'Birendra',
        'Chirag',
        'Chetan',
        'Charan',
        'Chandni',
        'Deepak',
        'Dinesh',
        'Dev',
        'Durga',
        'Eshan',
        'Ekansh',
        'Ishaan',
        'Indra',
        'Gaurav',
        'Ganesh',
        'Girish',
        'Govind',
        'Harish',
        'Himanshu',
        'Hemant',
        'Hitesh',
        'Isha',
        'Ishwar',
        'Inder',
        'Ishan',
        'Jatin',
        'Jayant',
        'Jagdish',
        'Jai',
        'Kartik',
        'Kiran',
        'Krishna',
        'Kunal',
        'Lalit',
        'Lokesh',
        'Laxman',
        'Leeladhar',
        'Manish',
        'Madhav',
        'Mukesh',
        'Mukul',
        'Nikhil',
        'Nitin',
        'Navin',
        'Naveen',
        'Omkar',
        'Ojas',
        'Om',
        'Opal',
        'Pranav',
        'Poojan',
        'Prithvi',
        'Pankaj',
        'Ravi',
        'Raghav',
        'Rohit',
        'Rajesh',
        'Suresh',
        'Shiv',
        'Sanjay',
        'Siddharth',
        'Tarun',
        'Tanuj',
        'Tejas',
        'Tanmay',
        'Ujjwal',
        'Uday',
        'Umesh',
        'Upendra',
        'Vikram',
        'Vishal',
        'Varun',
        'Vivek',
        'Yash',
        'Yogesh',
        'Yuvraj',
        'Yogendra',
    ];
    const femaleNames = [
        'Aarti',
        'Ananya',
        'Aishwarya',
        'Amrita',
        'Bhavana',
        'Bina',
        'Bharati',
        'Bindu',
        'Chandni',
        'Charul',
        'Chitra',
        'Chandana',
        'Deepika',
        'Divya',
        'Disha',
        'Durga',
        'Esha',
        'Ekta',
        'Isha',
        'Ira',
        'Gita',
        'Geeta',
        'Gargi',
        'Gaurika',
        'Hina',
        'Himani',
        'Harini',
        'Hema',
        'Isha',
        'Indira',
        'Ishita',
        'Ira',
        'Jaya',
        'Jyoti',
        'Jasmin',
        'Jeevika',
        'Kavya',
        'Komal',
        'Kriti',
        'Kiran',
        'Laxmi',
        'Leela',
        'Lakshmi',
        'Lalita',
        'Manju',
        'Madhuri',
        'Meera',
        'Madhavi',
        'Neha',
        'Nisha',
        'Nivedita',
        'Nandini',
        'Omana',
        'Ojasvi',
        'Opal',
        'Oorja',
        'Pooja',
        'Priya',
        'Parul',
        'Preeti',
        'Riya',
        'Radhika',
        'Rekha',
        'Rupa',
        'Sneha',
        'Shivani',
        'Simran',
        'Sanya',
        'Tanu',
        'Trisha',
        'Tanvi',
        'Tejal',
        'Usha',
        'Urvi',
        'Ujjwala',
        'Upasana',
        'Vishakha',
        'Vidya',
        'Vasudha',
        'Vandana',
        'Yogita',
        'Yashika',
        'Yamini',
        'Yogini',
    ];

    if (maleNames.includes(firstName)) {
        return 'MALE';
    } else if (femaleNames.includes(firstName)) {
        return 'FEMALE';
    } else {
        return 'OTHER';
    }
}

// // Function to generate random timestamps for created_at and updated_at
// function generateTimestamps() {
//     const createdAt = date.recent();
//     const updatedAt = moment(createdAt)
//         .add(Math.floor(Math.random() * 100), 'days')
//         .toDate();
//     return [createdAt, updatedAt];
// }

// Prepare the query to insert the data
const insertQuery = `
  INSERT INTO students (
    first_name, last_name, phone, email, full_address, dob,
    gender, city
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

// List of first and last names to choose from
const firstNames = [
    'Aarav',
    'Ananya',
    'Arjun',
    'Aditi',
    'Bhuvan',
    'Bhavana',
    'Bharat',
    'Bina',
    'Chirag',
    'Chandni',
    'Chetan',
    'Charul',
    'Deepak',
    'Divya',
    'Dinesh',
    'Durga',
    'Ekta',
    'Esha',
    'Eshan',
    'Isha',
    'Faizan',
    'Falguni',
    'Farhan',
    'Fatima',
    'Gaurav',
    'Geeta',
    'Gita',
    'Girish',
    'Harish',
    'Hina',
    'Himanshu',
    'Honey',
    'Ishaan',
    'Ira',
    'Indira',
    'Ishita',
    'Jatin',
    'Jyoti',
    'Jayant',
    'Jasmin',
    'Kiran',
    'Kavya',
    'Kartik',
    'Komal',
    'Lalit',
    'Lakshmi',
    'Laxman',
    'Leela',
    'Manish',
    'Meera',
    'Madhuri',
    'Mukul',
    'Nikhil',
    'Neha',
    'Nina',
    'Navin',
    'Omkar',
    'Om',
    'Opal',
    'Ojas',
    'Priya',
    'Pooja',
    'Pranav',
    'Parul',
    'Ravi',
    'Radhika',
    'Rohit',
    'Riya',
    'Suresh',
    'Sneha',
    'Shiv',
    'Simran',
    'Tanuj',
    'Tanvi',
    'Tarun',
    'Trisha',
    'Ujjwal',
    'Urvi',
    'Upendra',
    'Usha',
    'Vikram',
    'Vidya',
    'Vishal',
    'Varsha',
    'Yash',
    'Yogita',
    'Yashika',
    'Yamini',
    'Zara',
    'Zahid',
    'Zoya',
    'Zakir',
];
const lastNames = [
    'Agarwal',
    'Anand',
    'Arora',
    'Ahuja',
    'Bhatia',
    'Bajpai',
    'Bansal',
    'Bhatt',
    'Chauhan',
    'Chandran',
    'Chopra',
    'Chawla',
    'Deshmukh',
    'Dixit',
    'Dube',
    'Dutt',
    'Iyer',
    'Inder',
    'Ishwar',
    'Iyengar',
    'Garg',
    'Gupta',
    'Ghosh',
    'Gandhi',
    'Hegde',
    'Hussain',
    'Hooda',
    'Heer',
    'Joshi',
    'Jain',
    'Jha',
    'Jadhav',
    'Kapoor',
    'Kumar',
    'Kohli',
    'Khanna',
    'Lal',
    'Lodha',
    'Lamba',
    'Lalwani',
    'Mehta',
    'Mishra',
    'Madhok',
    'Malik',
    'Nair',
    'Nath',
    'Naidu',
    'Negi',
    'Patel',
    'Pillai',
    'Prasad',
    'Purohit',
    'Reddy',
    'Rao',
    'Rai',
    'Rathore',
    'Sharma',
    'Shukla',
    'Singh',
    'Sood',
    'Thakur',
    'Tiwari',
    'Tandon',
    'Tripathi',
    'Uppal',
    'Urs',
    'Umar',
    'Uday',
    'Verma',
    'Vora',
    'Vishwakarma',
    'Vikram',
    'Yadav',
    'Yogesh',
    'Yousuf',
    'Yadavalli',
];

// Insert 10,000 records
let counter = 0;
function insertData() {
    for (let i = 0; i < 10000; i++) {
        const firstName =
            firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName =
            lastNames[Math.floor(Math.random() * lastNames.length)];
        const phoneNumber = generatePhoneNumber();
        const dob = generateDob();
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${dob.split('-')[0]}.${i}@gmail.com`;
        const address = generateAddress();
        const gender = generateGender(firstName);
        const city = generateCity();

        const data = [
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            dob,
            gender,
            city
        ];

//         // Execute the insert query
//         connection.execute(insertQuery, data, (err, results) => {
//             if (err) {
//                 console.error('Error inserting data:', err);
//             }
//         });

//         // Commit every 1000 inserts to avoid excessive memory usage
//         counter++;
//         if (counter % 1000 === 0) {
//             console.log(`Inserted ${counter} records...`);
//         }
//     }

//     console.log('10,000 records inserted successfully.');
//     connection.end(); // Close the connection
// }

for (let i = 0; i < 10000; i++) {
    connection.execute(insertQuery, data);
 }
 
 connection.end(); 

// Start inserting the data
insertData();
    }}