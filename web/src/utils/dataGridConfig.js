const dataGridStyles = (colors) => ({
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "none",
    fontSize: "0.9rem",
  },
  
  "& .name-column--cell": {
    color: colors.greenAccent[500],
  },
  "& .MuiDataGrid-withBorderColor": {
    // backgroundColor: colors.primary[500],
    fontSize: "1.1rem",
  },
  "& .MuiDataGrid-virtualScroller": {
    backgroundColor: colors.primary[400],
  },
  "& .MuiCheckbox-root.Mui-checked":{
    color: colors.greenAccent[500]
  },  
  "& .MuiDataGrid-footerContainer": {
    borderTop: "none",
  },
  "& ::-webkit-scrollbar": {
    width: "5px"
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: colors.primary[400]
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: colors.greenAccent[400]
  },
});

const localeText = {
  MuiTablePagination: {
    labelRowsPerPage: "Filas por página:",
    labelDisplayedRows: ({ from, to, count }) => `${from}-${to} de ${count}`,
  },
  noRowsOverlayLabel: "No hay datos disponibles",
  noResultsOverlayLabel: "No hay datos disponibles",
  noRowsLabel: "No hay registros",
  footerRowSelected: (count) => `${count} ${count === 1 ? 'registro seleccionada' : 'registros seleccionadas'}`,
};

export { localeText, dataGridStyles}