export const menuItems = [
{
  isHeadr: true,
  title: "menu",
},
{
  title: "Accueil",
  icon: "heroicons-outline:home", // Home icon for "Accueil"
  link: "admin",
  isHide: false,
},
// {
//   title: "invoice",
//   icon: "heroicons-outline:home", // Home icon for "Accueil"
//   link: "admin/invoice",
//   isHide: false,
// },
{
  title: "Liste des Missions",
  icon: "heroicons-outline:clipboard-list", // List icon for "Liste des Missions"
  link: "admin/mission",
},
{
  title: "Partenaires",
  icon: "heroicons-outline:user-group", // Group icon for "Partenaires"
  link: "admin/Partenaires",
},
// {
//   title: "Conducteurs",
//   icon: "heroicons-outline:truck", // Truck icon for "Conducteurs"
//   link: "admin/conducteurs",
//   isOpen: true,
// },
{
  title: "Conducteurs",
  icon: "heroicons-outline:document-text", // Document icon for "Facturation"
  isOpen: true,
  isHide: true,
  child: [
    {
      childtitle: "conducteurs",
      childlink: "admin/conducteurs",
    },
    {
      childtitle: "suivi conducteurs",
      childlink: "admin/SuiviConducteurs",
    },

  ],
},
{
  title: "Facturation",
  icon: "heroicons-outline:document-text", // Document icon for "Facturation"
  isOpen: true,
  isHide: true,
  child: [
    {
      childtitle: "Gérer les paramètres",
      childlink: "admin/addCategorie",
    },
    // {
    //   childtitle: "Liste Categorie",
    //   childlink: "admin/categorieList",
    // },
    {
      childtitle: "Générer Facture",
      childlink: "admin/generateFacture",
    },
    {
      childtitle: "Facture partenaires",
      childlink: "admin/generateFacture",
    },
    {
      childtitle: "Facture conducteurs",
      childlink: "admin/ListFactureDrivers",
    },
  ],
},
{
  title: "chat",
  icon: "heroicons-outline:chat", // User profile icon for "Profil utilisateur"
  link: "admin/chat",
  isOpen: true,
},
{
  title: "to-do",
  icon: "heroicons-outline:clipboard-check", // User profile icon for "Profil utilisateur"
  link: "admin/todo",
  isOpen: true,
},
{
  title: "Profil utilisateur",
  icon: "heroicons-outline:user-circle", // User profile icon for "Profil utilisateur"
  link: "admin/profile",
  isOpen: true,
},
];

export const topMenu = [

{
  isHeadr: true,
  title: "menu",
},
{
  title: "Accueil",
  icon: "heroicons-outline:home", // Home icon for "Accueil"
  link: "admin",
  isHide: false,
},
{
  title: "Liste des Missions",
  icon: "heroicons-outline:clipboard-list", // List icon for "Liste des Missions"
  link: "admin/mission",
},
{
  title: "Partenaires",
  icon: "heroicons-outline:user-group", // Group icon for "Partenaires"
  link: "admin/Partenaires",
},
{
  title: "Conducteurs",
  icon: "heroicons-outline:truck", // Truck icon for "Conducteurs"
  link: "admin/conducteurs",
  isOpen: true,
},
{
  title: "Facturation",
  icon: "heroicons-outline:document-text", // Document icon for "Facturation"
  isOpen: true,
  isHide: true,
  child: [
    {
      childtitle: "Gérer les paramètres",
      childlink: "admin/addCategorie",
    },
    {
      childtitle: "Liste Categorie",
      childlink: "admin/categorieList",
    },
    {
      childtitle: "Générer Facture",
      childlink: "admin/generateFacture",
    },
    {
      childtitle: "Facture partenaires",
      childlink: "admin/mission",
    },
    {
      childtitle: "Facture conducteurs",
      childlink: "admin/ListFactureDrivers",
    },
  ],
},
{
  title: "Profil utilisateur",
  icon: "heroicons-outline:user-circle", // User profile icon for "Profil utilisateur"
  link: "admin/profile",
  isOpen: true,
},

];

export const menuItemsPartner = [
  {
    isHeadr: true,
    title: "menu",
  },
  {
    title: "Accueil",
    icon: "heroicons-outline:home", // Home icon for "Accueil"
    link: "partner",
    isHide: false,
  },
  // {
  //   title: "invoice",
  //   icon: "heroicons-outline:home", // Home icon for "Accueil"
  //   link: "admin/invoice",
  //   isHide: false,
  // },
  {
    title: "j'obtiens mon devis",
    icon: "heroicons-outline:user-group", // Group icon for "Partenaires"
    link: "partner/createMission",
  },
  // {
  //   title: "Liste des Missions",
  //   icon: "heroicons-outline:clipboard-list", // List icon for "Liste des Missions"
  //   link: "partner/mission",
  // },


  {
    title: "Mission",
    icon:"heroicons-outline:clipboard-list",
    isOpen:true,
    isHide:true,
    child: [
      {
        childtitle:"suivi-mission",
        childlink:"partner/suiviMission"
      },
      {
        childtitle:"Liste des missions",
        childlink: "partner/mission"
      }
    ]
  },

  {
    title: "Facturation",
    icon: "heroicons-outline:document-text", // Document icon for "Facturation"
    isOpen: true,
    isHide: true,
    child: [

      {
        childtitle: "Facture conducteurs",
        childlink: "partner/ListFactureDrivers",
      },
    ],
  },
  {
  title: "chat",
  icon: "heroicons-outline:chat", // User profile icon for "Profil utilisateur"
  link: "partner/chat",
  isOpen: true,
},
  {
    title: "Profil utilisateur",
    icon: "heroicons-outline:user-circle", // User profile icon for "Profil utilisateur"
    link: "partner/profile",
    isOpen: true,
  },
  ];

export const topMenuPartner = [


    {
      isHeadr: true,
      title: "menu",
    },
    {
      title: "Accueil",
      icon: "heroicons-outline:home", // Home icon for "Accueil"
      link: "partner",
      isHide: false,
    },
    // {
    //   title: "invoice",
    //   icon: "heroicons-outline:home", // Home icon for "Accueil"
    //   link: "admin/invoice",
    //   isHide: false,
    // },
    {
      title: "j'obtiens mon devis",
      icon: "heroicons-outline:user-group", // Group icon for "Partenaires"
      link: "partner/createMission",
    },
    {
      title: "Liste des Missions",
      icon: "heroicons-outline:clipboard-list", // List icon for "Liste des Missions"
      link: "partner/mission",
    },


    {
      title: "Facturation",
      icon: "heroicons-outline:document-text", // Document icon for "Facturation"
      isOpen: true,
      isHide: true,
      child: [

        {
          childtitle: "Facture conducteurs",
          childlink: "partner/ListFactureDrivers",
        },
      ],
    },
    {
      title: "Profil utilisateur",
      icon: "heroicons-outline:user-circle", // User profile icon for "Profil utilisateur"
      link: "partner/profile",
      isOpen: true,
    },
    ];

export const notifications = [
  {
    title: "Your order is placed",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",

    image: "/assets/images/all-img/user.png",
    link: "#",
  },
  {
    title: "Congratulations Darlene  🎉",
    desc: "Won the monthly best seller badge",
    unread: true,
    image: "/assets/images/all-img/user2.png",
    link: "#",
  },
  {
    title: "Revised Order 👋",
    desc: "Won the monthly best seller badge",

    image: "/assets/images/all-img/user3.png",
    link: "#",
  },
  {
    title: "Brooklyn Simmons",
    desc: "Added you to Top Secret Project group...",

    image: "/assets/images/all-img/user4.png",
    link: "#",
  },
];

export const message = [

];

export const colors = {
  primary: "#4669FA",
  secondary: "#A0AEC0",
  danger: "#F1595C",
  black: "#111112",
  warning: "#FA916B",
  info: "#0CE7FA",
  light: "#425466",
  success: "#50C793",
  "gray-f7": "#F7F8FC",
  dark: "#1E293B",
  "dark-gray": "#0F172A",
  gray: "#68768A",
  gray2: "#EEF1F9",
  "dark-light": "#CBD5E1",
};

export const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const topFilterLists = [
  {
    name: "Inbox",
    value: "all",
    icon: "uil:image-v",
  },
  {
    name: "Starred",
    value: "fav",
    icon: "heroicons:star",
  },
  {
    name: "Sent",
    value: "sent",
    icon: "heroicons-outline:paper-airplane",
  },

  {
    name: "Drafts",
    value: "drafts",
    icon: "heroicons-outline:pencil-alt",
  },
  {
    name: "Spam",
    value: "spam",
    icon: "heroicons:information-circle",
  },
  {
    name: "Trash",
    value: "trash",
    icon: "heroicons:trash",
  },
];

export const bottomFilterLists = [
  {
    name: "personal",
    value: "personal",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Social",
    value: "social",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Promotions",
    value: "promotions",
    icon: "heroicons:chevron-double-right",
  },
  {
    name: "Business",
    value: "business",
    icon: "heroicons:chevron-double-right",
  },
];

export const meets = [
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
  {
    img: "/assets/images/svg/path.svg",
    title: "Design meeting (team)",
    date: "01 Nov 2021",
    meet: "Skyp meeting",
  },
  {
    img: "/assets/images/svg/dc.svg",
    title: "Background research",
    date: "01 Nov 2021",
    meet: "Google meeting",
  },
  {
    img: "/assets/images/svg/sk.svg",
    title: "Meeting with client",
    date: "01 Nov 2021",
    meet: "Zoom meeting",
  },
];

export const files = [
  {
    img: "/assets/images/icon/file-1.svg",
    title: "Dashboard.fig",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-1.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/zip-1.svg",
    title: "Job portal_app.zip",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/pdf-2.svg",
    title: "Ecommerce.pdf",
    date: "06 June 2021 / 155MB",
  },
  {
    img: "/assets/images/icon/scr-1.svg",
    title: "Screenshot.jpg",
    date: "06 June 2021 / 155MB",
  },
];
