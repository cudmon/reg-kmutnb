import SectionChange from "./SectionChange";
import SectionWithdraw from "./SectionWithdraw";
import { TableCell, TableRow } from "@mui/material";

const styles = {
  row: { "&:last-child td, &:last-child th": { border: 0 } },
};

export default function SectionRow({ rows, columns }) {
  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.registration_id} sx={styles.row}>
          {columns.map((column) => (
            <TableCell key={column.name} align={column.align}>
              {row[column.name]}
            </TableCell>
          ))}
          <TableCell align="center">
            <SectionChange
              id={row.subject_id}
              subject={row.subject_name}
              oldSection={row.section_number}
            />
            <SectionWithdraw
              id={row.section_id}
              teacher={row.teacher_tid}
              subject={row.subject_name}
              section={row.section_number}
            />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
