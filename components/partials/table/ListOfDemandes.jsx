import React, { useState } from 'react';
import { Container, Row, Col, Card, CardHeader, CardFooter } from 'reactstrap';
import Header from './Header-table';
// import CustomDataTable from './CustomDataTable';
// import NotificationModal from './NotificationModal';
import { mockRequests, mockRequestsByPartner } from './mockData';
import CustomDataTable from './CustomDataTable';
import NotificationModal from '@/components/ui/NotificationModal';

const ListOfDemandes = () => {
const [selectedItem, setSelectedItem] = useState(null);
const [notificationModal, setNotificationModal] = useState(false);
const [tab, setTab] = useState("admin");

const handleDelete = (id) => {
  // Simulate delete action
 
  setNotificationModal(false);
};

const columns = [
  { field: '_id', header: 'ID' },
  { field: 'driver.name', header: 'Conducteur' },
  { field: 'address.display_name', header: 'Point de départ' },
  { field: 'destination.display_name', header: 'Destination' },
  { field: 'distance', header: 'Distance (km)' },
  { field: 'createdAt', header: 'Created At' },
  { field: 'status', header: 'Status' },
];

return (
  <>
    <Header
      onRefresh={() => console.log('Refreshing data...')}
      onAddRequest={() => console.log('Navigating to add request page...')}
      onTabChange={setTab}
    />
    <Container className="mt-7" fluid>
      <Row>
        <Col>
          <Card className="shadow">
            {/* <CardHeader className="border-0">
              <h3 className="mb-0">Liste de toutes les missions</h3>
            </CardHeader> */}
            <CustomDataTable
              data={tab === "partner" ? mockRequestsByPartner : mockRequests}
              columns={columns}
              onRowClick={(e) => console.log(`Row clicked: ${e.data._id}`)}
              filters={{}}
              globalFilterFields={['_id', 'name', 'status']}
            />
            <NotificationModal
              isOpen={notificationModal}
              toggle={() => setNotificationModal(!notificationModal)}
              onConfirm={() => handleDelete(selectedItem)}
              isLoading={false}
            />
            <CardFooter className="py-4">
              {/* Pagination or other footer content */}
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);
};

export default ListOfDemandes;