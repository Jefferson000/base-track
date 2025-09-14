const unknown = { label: "N/A", value:0, color: "#B0B0B0", softColor: "#B0B0B0" }

/*
  1 - Distribution Network
  2 - Source - Spring
  3 - Source - Well
  4 - Source - Stream
  4 - Source - Mix
*/
const source_types = [
  { label: 'Red de distribución', value: 1, color: '#369bd6' },
  { label: 'Fuente - Naciente', value: 2, color: '#4cceac' },
  { label: 'Fuente - Pozo', value: 3, color: '#4cceac' },
  { label: 'Fuente - Quebrada', value: 4, color: '#4cceac' },
  { label: 'Fuente - Mezcla', value: 5, color: '#4cceac' },
];

function getSourceTypeByValue(value) {
  return source_types.find(source => source.value === value) || unknown;
}

export { 
  source_types,
  getSourceTypeByValue,
}