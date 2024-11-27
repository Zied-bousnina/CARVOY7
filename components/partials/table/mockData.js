// mockData.js

export const mockRequests = [
    {
      _id: '1',
      driver: { name: 'John Doe' },
      address: { display_name: '123 Main St, Anytown' },
      destination: { display_name: '456 Elm St, Othertown' },
      distance: 15.5,
      createdAt: '2023-10-01T10:00:00Z',
      status: 'En attente',
    },
    {
      _id: '2',
      driver: { name: 'Jane Smith' },
      address: { display_name: '789 Oak St, Sometown' },
      destination: { display_name: '101 Pine St, Anothertown' },
      distance: 25.0,
      createdAt: '2023-10-02T11:30:00Z',
      status: 'Confirmée',
    },
    {
      _id: '3',
      driver: { name: 'Alice Johnson' },
      address: { display_name: '234 Maple St, Yourtown' },
      destination: { display_name: '567 Birch St, Thistown' },
      distance: 30.2,
      createdAt: '2023-10-03T14:45:00Z',
      status: 'Terminée',
    },
    ];
    
    export const mockRequestsByPartner = [
    {
      _id: '4',
      driver: { name: 'Bob Brown' },
      address: { display_name: '345 Cedar St, Mytown' },
      destination: { display_name: '678 Spruce St, Theirtown' },
      distance: 40.0,
      createdAt: '2023-10-04T09:15:00Z',
      status: 'Démarrée',
      user: { contactName: 'Partner A' },
    },
    {
      _id: '5',
      driver: { name: 'Charlie Davis' },
      address: { display_name: '456 Willow St, Ourtown' },
      destination: { display_name: '789 Fir St, Theircity' },
      distance: 50.5,
      createdAt: '2023-10-05T16:00:00Z',
      status: 'En retard',
      user: { contactName: 'Partner B' },
    },
    ];