import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import AttendeeHeaderCard from "../component/AttendeeHeaderCard";

import AttendeeStatistics from "../component/AttendeeStatistics";
import DataTable from "../component/DataTable";

const AttendeeAdmin = () => {
  const tableHead = [
    "Head",
    "Head2",
    "Head3",
    "Head4",
    "Head5",
    "Head6",
    "Head7",
    "Head8",
    "Head9",
  ];
  const widthArr = [40, 60, 80, 100, 120, 140, 160, 180, 200];

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <AttendeeHeaderCard />
        {/* <AttendeeStatistics /> */}
        {/* <DataTable
          tableHead={tableHead}
          tableData={tableData}
          widthArr={widthArr}
        /> */}
        <View style={{ height: 2000 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AttendeeAdmin;
