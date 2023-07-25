export const SCHEDULE_DUMMY_DATA = [
  {
    id: "0",
    date: "Saturday Feburary 20th",
    tag1: "Dog walk",
    tag2: "Morning",
    dogName: "Ginger Fisher",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwqLItU-WEM04wB8BjhB01Mgl1hk-Mf_I_PlSE9NPCqbvxjbQw2mf7L1gep6Pq8RoBjg&usqp=CAU",
    address: "123 Fluffypants Lane Pawtown FL 32789 123-468-8901",
    text: "Please be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: "Andrew Couldwell",
    rating: "4.8",
  },
  {
    id: "1",
    date: "Sunday Feburary 21th",
    tag1: "Dog walk",
    tag2: "Morning",
    dogName: "Horse Fisher",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQPmLXIAWoZWYvvv1eJVU0AUonKfv3HPQWC8hYEbseG61iwvGAJmTlTtqWEu2n7Gc4ig&usqp=CAU",

    address: "124 Fluffypants Lane Pawtown FL 32789 123-468-8901",
    text: "Please be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: "Max Couldwell",
    rating: "4.7",
  },
  {
    id: "2",
    date: "Monday Feburary 22th",
    tag1: "Dog walk",
    tag2: "Morning",
    dogName: "Holiver",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaLZxjvb77TvWUNW6qe5uUpDIl1G1TiL_k8nD7HFA39xS2Ha-bxivdJMqplPoMuP0ev0s&usqp=CAU",

    address: "321 Fluffypants Lane Pawtown FL 32789 123-468-8901",
    text: "Please be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: "John Doe",
    rating: "4.9",
  },
];

export const COMPLETED_DUMMY_DATA = [
  {
    id: "0",
    date: "Saturday Feburary 20th",
    tag1: "Dog walk",
    tag2: "Morning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEQPmLXIAWoZWYvvv1eJVU0AUonKfv3HPQWC8hYEbseG61iwvGAJmTlTtqWEu2n7Gc4ig&usqp=CAU",

    text: "Please be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: "Andrew Couldwell",
    rating: "4.8",
    arrivalTime: "10:00",
    departureTime: "10:45",
  },
  {
    id: "1",
    date: "Saturday Feburary 21th",
    tag1: "Dog walk",
    tag2: "Morning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaLZxjvb77TvWUNW6qe5uUpDIl1G1TiL_k8nD7HFA39xS2Ha-bxivdJMqplPoMuP0ev0s&usqp=CAU",

    text: "Please be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: "Max Couldwell",
    rating: "4.8",
    arrivalTime: "11:00",
    departureTime: "12:45",
  },
  {
    id: "2",
    date: "Saturday Feburary 22th",
    tag1: "Dog walk",
    tag2: "Morning",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaLZxjvb77TvWUNW6qe5uUpDIl1G1TiL_k8nD7HFA39xS2Ha-bxivdJMqplPoMuP0ev0s&usqp=CAU",

    text: "Hello There be sure to give he the antibiotics they are on the kitchen counter ",
    sitterName: " Couldwell",
    rating: "4.8",
    arrivalTime: "11:00",
    departureTime: "12:45",
  },
];

export const healthConcern = [
  {
    id: 1,
    title: "Fatigue",
    dropDown: [
      {
        id: 1,
        title: "Treat Fatigue",
      },
      {
        id: 2,
        title: "Treat Cancer",
      },
      {
        id: 3,
        title: "Cure and Prevent",
      },
      {
        id: 4,
        title: "Prevent and cure",
      },
    ],
  },
  {
    id: 2,
    title: "High Blood Pressure",
    dropDown: [
      {
        id: 1,
        title: "Treat Fatigue",
      },
      {
        id: 2,
        title: "Treat Cancer",
      },
      {
        id: 3,
        title: "Cure and Prevent",
      },
      {
        id: 4,
        title: "Prevent and cure",
      },
    ],
  },

  {
    id: 3,
    title: "Diabetes",
    dropDown: [
      {
        id: 1,
        title: "Treat Fatigue",
      },
      {
        id: 2,
        title: "Treat Cancer",
      },
      {
        id: 3,
        title: "Cure and Prevent",
      },
      {
        id: 4,
        title: "Prevent and cure",
      },
    ],
  },
  {
    id: 4,
    title: "Obesity",
    dropDown: [
      {
        id: 1,
        title: "Treat Fatigue",
      },
      {
        id: 2,
        title: "Treat Cancer",
      },
      {
        id: 3,
        title: "Cure and Prevent",
      },
      {
        id: 4,
        title: "Prevent and cure",
      },
    ],
  },
];

export const LocSpec = [
  {
    id: "location",
    title: "Location",
  },
  {
    id: "speciality",
    cId: "conditions",

    title: "Speciality / Condition",
  },
];

export const Footeritems = [
  {
    id: 1,
    title: "Holmeddoc",
    list: [
      {
        id: 1,
        title: "Home",
      },
      {
        id: 2,
        title: "About Us",
      },
    ],
  },
  {
    id: 2,
    title: " Contact Us",
    list: [
      {
        id: 1,
        title: "info@holmeddoc.com",
      },
      {
        id: 2,
        title: "+1 000 000 0000",
      },
    ],
  },
  {
    id: 3,
    title: " Insurance Providers",
    list: [
      {
        id: 1,
        title: "UHC",
      },
      {
        id: 2,
        title: "Humana",
      },
      {
        id: 3,
        title: "Aetna",
      },
    ],
  },
  {
    id: 4,
    title: " Major Specialities",
    list: [
      {
        id: 1,
        title: "Acupuncture ",
      },
      {
        id: 2,
        title: "Aromatherapy ",
      },
      {
        id: 3,
        title: "Alternative Medicine ",
      },
      {
        id: 4,
        title: "Yoga  ",
      },
      {
        id: 5,
        title: "Reiki   ",
      },
      {
        id: 6,
        title: "Holistic Medicine  ",
      },
      {
        id: "viewall",
        title: "View All  ",
      },
    ],
  },
  {
    id: 5,
    title: " For Doctor and Healthcare providers",
    list: [
      {
        id: 1,
        title: "Sign up with Holmeddoc ",
      },
      {
        id: 2,
        title: "Sign up with Holmeddoc ",
      },
      {
        id: 3,
        title: "For Developer Teams ",
      },
      {
        id: 4,
        title: "Get the Holmeddoc App",
      },
    ],
  },
];

export const slides = [
  {
    image: require("./images/home/Doctor.jpg"),
    title: "Lindsay M.",
    subtitle: "Vancouver, BC",
    text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
  },
  {
    image: require("./images/home/Doctor.jpg"),
    title: "Lindsay M.",
    subtitle: "Vancouver, BC",
    text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
  },
  {
    image: require("./images/home/Doctor.jpg"),
    title: "Lindsay M.",
    subtitle: "Vancouver, BC",
    text: "Lindsay was raised in Atlanta Georgia. She graduated from the University of Texas where she earned her degree in human biology...",
  },
];

export const dummyData = [
  {
    id: 1,
    title: "Languages",
    data: [
      {
        id: 1,
        name: "English",
      },
      {
        id: 2,
        name: "Hindi",
      },
      {
        id: 3,
        name: "French",
      },
    ],
  },
  {
    id: 2,
    title: "Speciality",
    data: [
      {
        id: 1,
        name: "Dentist",
      },
      {
        id: 2,
        name: "Physician",
      },
      {
        id: 3,
        name: "Cardiologist",
      },
      {
        id: 4,
        name: "Oncologist",
      },
      {
        id: 5,
        name: "Pulmonologist",
      },
      {
        id: 6,
        name: "Oral Surgeon",
      },
    ],
  },
  {
    id: 3,
    title: "Conditions",
    data: [
      {
        id: 1,
        name: "Allergic Cough",
      },
      {
        id: 2,
        name: "Acne",
      },
      {
        id: 3,
        name: "Abdominal Pain",
      },
      {
        id: 4,
        name: "Foot Consultations",
      },
      {
        id: 5,
        name: "Eye Doctors",
      },
      {
        id: 6,
        name: "Heart Failure",
      },
    ],
  },
  {
    id: 4,
    title: "Appointment Type",
    data: [
      {
        id: 1,
        name: "Virtual",
      },
      {
        id: 2,
        name: "InPerson",
      },
    ],
  },
  {
    id: 5,
    title: "Insurance",
    data: [
      {
        id: 1,
        name: "Aetna",
      },
      {
        id: 2,
        name: "Humana",
      },
      {
        id: 3,
        name: "UHC",
      },
      {
        id: 4,
        name: "Other",
      },
    ],
  },
];


export const ImageArray=[
  {
    id:1,
    name:"traditional-chinese-medicine",
    image:require("./images/specialities/TraditionalChinese.png") 
  },
  {
    id:2,
    name:"integrative-medicine",
    image:require("./images/specialities/Integrative.png")
  },
  {
    id:3,
    name:"acupuncturist",
    image:require("./images/specialities/Acupuncture.png")
  },{
    id:4,
    name:"allergist-and-immunologist",
    image:require("./images/specialities/Allergy.png")
  },
  {
    id:5,
    name:"ayurvedic-medicine-practitioner",
    image:require("./images/specialities/Ayurveda.png")
  }
,{
  id:6,
  name:"chiropractor",
  image:require("./images/specialities/Chiropractic.png")
},{
  id:7,
  name:"dietician-nutritionist" ,
  image:require("./images/specialities/Dietican.png")
},
{
  id:8,
  name:"endocrinologist",
  image:require("./images/specialities/Endocrinology.png")
},
{
  id:9,
  name:"internal-medicine",
  image:require("./images/specialities/Functional.png")
},
{
  id:10,
  name:"homeopathic-practitioner",
  image:require("./images/specialities/Homeopathy.png")
},
{
  id:11,
  name:"hypnotherapist",
  image:require("./images/specialities/Hypnotherapy.png")
},
{
  id:12,
  name:"massage-therapist",
  image:require("./images/specialities/MassageTherapy.png")
}
,
{
  id:13,
  name:"naturopathic-doctor",
  image:require("./images/specialities/Naturapathy.png")
}
,
{
  id:15,
  name:"obgyn-obstetrician-gynecologist",
  image:require("./images/specialities/Gynecology.png")
}
  ,
  {
    id:16,
    name:"physical-therapist",
    image:require("./images/specialities/Psychotherapy.png")
  }
  ,
  {
    id:17,
    name:"psychologist-psychotherapist-counselor",
    image:require("./images/specialities/Psychology.png")
  }
  ,
  {
    id:18,
    name:"reflexologist",
    image:require("./images/specialities/Reflexology.png")
  }
  ,
  {
    id:19,
    name:"sleep-medicine-specialist",
    image:require("./images/specialities/SleepMedicine.png")
  },
  {
    id:20,
    name:"yoga-meditation-centers",
    image:require("./images/specialities/SportMedicine.png")
  }
]

const doctorImages = [
  "https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZG9jdG9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  "https://media.istockphoto.com/id/1372002650/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.webp?b=1&s=170667a&w=0&k=20&c=ZaIV4-qe9Bgx9QTal0mAU6MbR8eOzxA4jf0KVKYjVMQ=",
  "https://media.istockphoto.com/id/1500306618/photo/side-view-of-a-young-male-doctor-stands-while-looking-down-at-a-document-and-reading-with.webp?b=1&s=170667a&w=0&k=20&c=Wk5HGfbyOvexk2BJpihWPp4r8yE59hJE8tqsGDo-Kco=",
  "https://media.istockphoto.com/id/1447365709/photo/healthcare-women-and-doctors-with-patient-chart-on-clipboard-in-hospital-or-clinic-happy.webp?b=1&s=170667a&w=0&k=20&c=x9SJ1GnXViqPcvdZZuGMkFa6vnwBWfPY3AM-oJBSL7o=",
  "https://media.istockphoto.com/id/1451854647/photo/female-nurse-using-her-digital-tablet-while-standing-in-the-consultation.webp?b=1&s=170667a&w=0&k=20&c=nDe03QVF4dHzJlnvnHCxPdq3grNgx32POxF15UuusVo=",
  
];

export const getRandomDoctorImage = () => {
  const randomIndex = Math.floor(Math.random() * doctorImages.length);
  return doctorImages[randomIndex];
};