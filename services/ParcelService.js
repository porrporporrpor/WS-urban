const callGetAll = async () => {
  console.log('callGetAll parcel service');
  try {
    const parcelList = [
      {
        id: 1,
        name: '2101-190',
        collectedOn: '29 ธ.ค. 2563',
        collectedBy: 'Banjawan S.',
        releasedBy: 'นิติบุุคล',
        unitNumber: '299/141',
        ownerParcel: 'Banjawan S.',
        trackingNumber: 'TH00128199388C',
        deliveryService: 'Shopee Express',
        parcelType: 'กล่องเล็ก',
        addedToSystem: '29 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
        markAsRead: true,
      },
      {
        id: 2,
        collectedOn: '29 ธ.ค. 2563',
        collectedBy: 'Banjawan S.',
        releasedBy: 'นิติบุุคล',
        name: '2101-304',
        unitNumber: '299/142',
        ownerParcel: 'Papa',
        trackingNumber: 'TH00128199388K',
        deliveryService: 'Kerry Express',
        parcelType: 'กล่องกลาง',
        addedToSystem: '30 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
        markAsRead: false,
      },
      {
        id: 3,
        name: '2101-559',
        unitNumber: '299/143',
        ownerParcel: 'Mama',
        trackingNumber: 'TH00128199388N',
        deliveryService: 'Ninja Van',
        parcelType: 'กล่องใหญ่',
        addedToSystem: '31 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
        markAsRead: false,
      },
      {
        id: 4,
        name: '2101-847',
        unitNumber: '299/144',
        ownerParcel: 'Didi',
        trackingNumber: 'TH00128199388N',
        deliveryService: 'Ninja Van',
        parcelType: 'กล่องใหญ่',
        addedToSystem: '31 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
        markAsRead: false,
      },
    ];
    return parcelList;
  } catch (error) {
    return error;
  }
};
const callGetOne = async (parcelID) => {
  console.log('callGetOne parcel service');
  try {
    switch (parcelID) {
      case 1:
        console.log('select parcelID 1');
        return {
          id: 1,
          name: '2101-190',
          collectedOn: '29 ธ.ค. 2563',
          collectedBy: 'Banjawan S.',
          releasedBy: 'นิติบุุคล',
          unitNumber: '299/141',
          ownerParcel: 'Banjawan S.',
          trackingNumber: 'TH00128199388C',
          deliveryService: 'Shopee Express',
          parcelType: 'กล่องเล็ก',
          addedToSystem: '29 ธ.ค. 2563',
          addedBy: 'นิติบุคคล',
        };
      case 2:
        console.log('select parcelID 2');
        return {
          id: 2,
          collectedOn: '29 ธ.ค. 2563',
          collectedBy: 'Banjawan S.',
          releasedBy: 'นิติบุุคล',
          name: '2101-304',
          unitNumber: '299/142',
          ownerParcel: 'Papa',
          trackingNumber: 'TH00128199388K',
          deliveryService: 'Kerry Express',
          parcelType: 'กล่องกลาง',
          addedToSystem: '30 ธ.ค. 2563',
          addedBy: 'นิติบุคคล',
        };
      case 3:
        console.log('select parcelID 3');
        return {
          id: 3,
          name: '2101-559',
          unitNumber: '299/143',
          ownerParcel: 'Mama',
          trackingNumber: 'TH00128199388N',
          deliveryService: 'Ninja Van',
          parcelType: 'กล่องใหญ่',
          addedToSystem: '31 ธ.ค. 2563',
          addedBy: 'นิติบุคคล',
        };
      case 4:
        return {
          id: 4,
          name: '2101-847',
          unitNumber: '299/144',
          ownerParcel: 'Didi',
          trackingNumber: 'TH00128199388N',
          deliveryService: 'Ninja Van',
          parcelType: 'กล่องใหญ่',
          addedToSystem: '31 ธ.ค. 2563',
          addedBy: 'นิติบุคคล',
          markAsRead: false,
        };
      default:
        console.log('id ' + parcelID + ' out of scope');
    }
  } catch (error) {
    return error;
  }
};

const callUpdateMarkAsRead = async (parcelID) => {
  console.log('callUpdateMarkAsRead parcel service');
  try {
    return 'success';
  } catch (error) {
    return error;
  }
};
const callClearHistory = async (parcelID) => {
  console.log('callClearHistory parcel service');
  try {
    const parcelList = [
      {
        id: 1,
        name: '2101-190',
        collectedOn: '29 ธ.ค. 2563',
        collectedBy: 'Banjawan S.',
        releasedBy: 'นิติบุุคล',
        unitNumber: '299/141',
        ownerParcel: 'Banjawan S.',
        trackingNumber: 'TH00128199388C',
        deliveryService: 'Shopee Express',
        parcelType: 'กล่องเล็ก',
        addedToSystem: '29 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
      },
      {
        id: 3,
        name: '2101-559',
        unitNumber: '299/143',
        ownerParcel: 'Mama',
        trackingNumber: 'TH00128199388N',
        deliveryService: 'Ninja Van',
        parcelType: 'กล่องใหญ่',
        addedToSystem: '31 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
      },
      {
        id: 4,
        name: '2101-847',
        unitNumber: '299/144',
        ownerParcel: 'Didi',
        trackingNumber: 'TH00128199388N',
        deliveryService: 'Ninja Van',
        parcelType: 'กล่องใหญ่',
        addedToSystem: '31 ธ.ค. 2563',
        addedBy: 'นิติบุคคล',
        markAsRead: false,
      },
    ];
    const deletedArray = parcelList.filter((obj) => obj.id != parcelID);
    return deletedArray;
  } catch (error) {
    return error;
  }
};

export const parcelService = {
  callGetAll,
  callGetOne,
  callUpdateMarkAsRead,
  callClearHistory,
};
