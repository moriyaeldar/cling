enum geoArea {
  DAROM = 'דרום',
  MERKAZ = 'מרכז',
  TZAFON = 'צפון',
}

export class ActivityFilter {
  geoArea: geoArea;
  interests: string;
  range: number;
  searchText: string;
  selectedDate: Date;
}
