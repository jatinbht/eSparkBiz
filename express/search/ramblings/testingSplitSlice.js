// \! = first_name
// @ = last_name
// # = phone
// $ = email
// % = full_address
// ^ = dob
// & = gender
// \* = city

// const q = '@last1$first3@last2$first1AND@last3@last4$first2@last'
const q = 'first'

const split1 = q.split('$')

console.log(split1);

const split2 = split1[split1.length-1].split('@')
console.log(split1.length-1)

console.log(typeof split2, split2);


// console.log(q.split('AND'))