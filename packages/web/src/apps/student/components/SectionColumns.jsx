import { TableCell, TableRow } from "@mui/material";

export default function SectionColumn({ columns }) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell key={column.name} align={column.align}>
          {column.label}
        </TableCell>
      ))}
      <TableCell align="center"></TableCell>
    </TableRow>
  );
}
