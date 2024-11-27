import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CustomDataTable = ({ data, columns, onRowClick, filters, globalFilterFields }) => (
<DataTable
  value={data}
  paginator
  rows={5}
  rowsPerPageOptions={[5, 10, 25]}
  onRowClick={onRowClick}
  filters={filters}
  globalFilterFields={globalFilterFields}
  emptyMessage="No Missions found."
>
  {columns.map((col, index) => (
    <Column key={index} field={col.field} header={col.header} sortable />
  ))}
</DataTable>
);

export default CustomDataTable;