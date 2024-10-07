import * as React from "react";
import { View, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

const InventoryAdmin = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
    {
      key: 1,
      name: "Speakers",
      NumItems: 13,
      NumItemsSort: 0,
    },
    {
      key: 2,
      name: "Chairs",
      NumItems: 52,
      NumItemsSort: 0,
    },
    {
      key: 3,
      name: "Plate",
      NumItems: 123,
      NumItemsSort: 0,
    },
    {
      key: 4,
      name: "Lechon tray",
      NumItems: 13,
      NumItemsSort: 0,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={{ padding: 16 }}>
      {/* Adding horizontal ScrollView for the table */}
      <ScrollView horizontal>
        <DataTable>
          {/* DataTable Header */}
          <DataTable.Header>
            <DataTable.Title style={{ width: 150 }}>Item</DataTable.Title>
            <DataTable.Title numeric style={{ width: 100 }}>
              No. of items
            </DataTable.Title>
            <DataTable.Title numeric style={{ width: 150 }}>
              No. of items sorted
            </DataTable.Title>
            <DataTable.Title numeric style={{ width: 100 }}>
              Status
            </DataTable.Title>
          </DataTable.Header>

          {/* DataTable Rows */}
          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell style={{ width: 150 }}>
                {item.name}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 100 }}>
                {item.NumItems}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 150 }}>
                {item.NumItemsSort}
              </DataTable.Cell>
              <DataTable.Cell numeric style={{ width: 100 }}>
                Pending
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          {/* Pagination */}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${items.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default InventoryAdmin;
