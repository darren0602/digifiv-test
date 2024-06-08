import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props {
  multiples: number;
}

function PaddedView({ children, multiples = 1 }: PropsWithChildren<Props>) {
  return <Box sx={{ padding: multiples * 1, flex: 1 }}>{children}</Box>;
}

export default PaddedView;
