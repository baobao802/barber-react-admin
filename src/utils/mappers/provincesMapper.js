const provincesMapper = (provinces) =>
  provinces.map((province) => ({
    id: province.code,
    value: province.name,
    label: province.name,
  }));

const districtsMapper = (districts) =>
  districts.map((district) => ({
    id: district.code,
    value: district.name,
    label: district.name,
  }));

const wardsMapper = (wards) =>
  wards.map((ward) => ({
    id: ward.code,
    value: ward.name,
    label: ward.name,
  }));

export { provincesMapper, districtsMapper, wardsMapper };
