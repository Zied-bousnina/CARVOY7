

function server() {
    return `https://convoyage.onrender.com/api/`;
    // return `http://localhost:3600/api/`;
  }
  // http://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=20&api_key=DEMO_KEY
  export const ApiConfigs = {
    base_url: server(),
    /* -------------------------------- */

    apis: {

        auth: {
            // signup:"user/signup",
            login:"users/login",
            getUserByEmail:"users/getUserByEmail/{email}",

            forgotPassword:"users/forgot-password",
            updatePassword:"users/updatePassword",
            GetCurrentUser:"users/users/currentUser",
            GetAllUsers : "users/getUsers",
            GetAllUserDetails : "users/{id}",
            BlockUser : "users/block/{id}",
            UnBlockUser : "users/deblock/{id}",
            DeleteUserByAdmin : "users/deleteAccountByAdmin/{id}",
          },
          notifications: {
            RemoveNotification: 'users/users/EmptySocket',
            ByIdRemoveNotification  : 'users/users/RemoveSocketById/{id}',
          },
          profile: {
            AddProfile: 'users/profile/upload-profile',
            EditProfile_Web: 'users/profile/Edit_profile_web',
            EditProfile_WebPartner : 'users/profile/Edit_profile_web',
            GetProfile: 'profile',


          },
        admin: {
          addPartner: 'users/AddPartner',
          getUsersCounts: 'users/getUserCounts',
          getPartnerCounts: 'users/getPartnerCounts',
          FetchAllPartnership: 'users/partnerShip/fetchAll',
          GetPartnerDetailsById: 'users/partnerShip/fetchByID/{id}',
          UpdatePartnerShip : 'users/UpdatePartner/{id}',

          categorie: {
            createCategorie: 'users/categorie/create',
            deleteCategories: 'users/categorie/deleteCategorie/{id}',
            UpdateCategorie1: 'users/categorie/updateCategorie/{id}',
            FindAllCategories: 'users/categorie/getAllCategorie',
            FindCategorieById: 'users/categorie/{id}',

          },
          mission: {
            create: 'users/createDemande',
            createNewVersion: 'users/createDemandeNewVersion',
            findMissionByUserId:'users/findDemandsByUserId',
            findMissionStatisticsByAdmin: "users/findDemandsstatisticsAdmin",
            deleteMission: 'users/mission/deleteMission/{missionId}',
            findMissionById: 'users/findDemandById/{id}',
            getUserInformationById: 'users/getMissionById/{id}',


          },
          devis: {
            findDevisByPartner: 'users/devis/findDevisByPartner',
            findDevisById: `users/devis/findDevisById/{id}`,
            AddDevis: 'users/devis/create',
            FindDevisByPartnerId : 'users/devis/findDevisByPartnerId/{id}',
          },
          facture: {
            createFacture: 'users/facture/create',
            findAllPartnersAndTheirFactures: "users/findAllPartnersAndTheirFactures",
            findFactureById: "users/factureById/{id}",
            factureDriverById: "users/factureDriverById/{id}",
            PayeeFacture: "users/payeeFacture/{id}",
            payeeFactureDriver: "users/payeeFactureDriver/{id}",
            FindFactureById : "users/facture/fetchFacturePartnerById/{id}",
            PayerEnLignePartner: "users/facture/PayerEnLignePartner",

          },
          driver: {
            findAllDriversAndTheirFactures: "users/findAllDriversAndTheirFactures",
            FetchAllDrivers: "users/driver/fetchAll",
            CreateDriver: "users/driver/AddDriver",
            UpdateDriver: "users/driver/updateDriver/{id}",
            activateDriverAccount : "users/driver/ValiderDriverAccount/{id}",
            RefusAccount : "users/driver/refusDriverAccount/{id}",
          },
          FindRequestDemandeByPartnerV2: 'users/findAllPartnersAndTheirDemands',


        },
        partner: {
          getMissionByPartnerCounts: 'users/getMissionsCountByUser',
          mission: {
            create: 'users/createDemande',
            findMissionCreatedByPartner:"users/findDemandsCreatedByPartner",
            findMissionStatisticsByPartner:"users/findDemandsstatisticsByPartner",
            UpdateMission:"users/mission/updateMission/{id}",
            getMissionsCount: 'users/getDemandeCounts',
          },
          ammount: {
            findAmmountStatisticsByPartner:"users/getTotalAmountByPartner"
          },
          devis: {
            UpdateUserInformationById: 'users/updateFieldsForDevis',
            FindDevisByPartner: 'users/devis/getAllDevisByPartner/{id}',
            rejectDevis: 'users/devis/rejectDevis/{id}',
            UpdateDevis:'users/devis/UpdateDevis/{id}',

          },
          facture: {
            FindFacturesByPartner : "users/facture/fetchFactureByPartner",
            PayeFactureByPartnerHorLigne: "users/facture/PayeFactureByPartnerHorLigne/{id}",
          }

        },




    },
  };
