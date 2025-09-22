"use client";
import {
  Box,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import Marked from "marked-react";
import { Bar, Pie } from "react-chartjs-2";
import SlidePreview from "./SlidePreview";

ChartJS.register(
  LineElement,
  PointElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const RenderMarkdown = ({ content }) => {
  const renderer = {
    paragraph(children) {
      return (
        <Typography key={this.elementId} sx={{ my: 1 }}>
          {children}
        </Typography>
      );
    },

    heading(children, level) {
      const variantMap = {
        1: "h3",
        2: "h4",
        3: "h5",
        4: "h6",
        5: "subtitle1",
        6: "subtitle2",
      };
      return (
        <Typography
          key={this.elementId}
          variant={variantMap[level] || "body1"}
          sx={{ my: 2 }}
        >
          {children}
        </Typography>
      );
    },

    list(children, ordered) {
      return (
        <List
          key={this.elementId}
          component={ordered ? "ol" : "ul"}
          sx={{
            listStyleType: ordered ? "decimal" : "disc",
            pl: 4,
            color: "text.primary",
            "& li": { display: "list-item" },
          }}
        >
          {children}
        </List>
      );
    },

    listItem(children) {
      return (
        <ListItem
          key={this.elementId}
          sx={{
            color: "text.primary",
            display: "list-item",
            p: 0,
          }}
        >
          {children}
        </ListItem>
      );
    },

    code(children) {
      let data = undefined;
      try {
        data = JSON.parse(children);
      } catch {
        console.log("error: ");
      }
      if (!data) return null;
      if (data.type) {
        return (
          <Box
            key={this.elementId}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 2,
            }}
          >
            {data.type === "bar" ? (
              <div style={{ height: "200px", width: "400px" }}>
                <Bar data={data.data} />
              </div>
            ) : data.type === "pie" ? (
              <div style={{ height: "300px", width: "300px" }}>
                <Pie data={data.data} />
              </div>
            ) : null}
          </Box>
        );
      } else {
        return data?.map((item, index) => (
          <Box
            key={index}
            sx={{ height: "250px", overflow: "hidden", marginY: 2 }}
          >
            <SlidePreview src={item} />
          </Box>
        ));
      }
    },

    table(children) {
      return (
        <TableContainer key={this.elementId} component={Paper} sx={{ my: 2 }}>
          <Table size='small'>{children}</Table>
        </TableContainer>
      );
    },

    tableHead(children) {
      return <TableHead key={this.elementId}>{children}</TableHead>;
    },

    tableBody(children) {
      return <TableBody key={this.elementId}>{children}</TableBody>;
    },

    tableRow(children) {
      return <TableRow key={this.elementId}>{children}</TableRow>;
    },

    tableCell(children, { header }) {
      return header ? (
        <TableCell key={this.elementId} component='th' scope='col'>
          <strong>{children}</strong>
        </TableCell>
      ) : (
        <TableCell key={this.elementId}>{children}</TableCell>
      );
    },
  };

  return <Marked renderer={renderer}>{content}</Marked>;
};

export default RenderMarkdown;
