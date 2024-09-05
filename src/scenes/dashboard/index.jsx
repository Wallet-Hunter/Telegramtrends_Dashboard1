import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";

import BarChart from "../../components/comp/BarChart";
import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
// import { PieChart } from "@mui/icons-material";
import Sentiment from "../../components/comp/Sentiment";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Telegram Trends" subtitle="Building Dreams, Together" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1505926"
            subtitle="Total Messages"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="38"
            subtitle="Memes Groups"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="158886"
            subtitle="Total Participants"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="197"
            subtitle="Bots"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="20px"
            p="0 20px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h3"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Overall Messages
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
              Recent Analytics
            </Typography>
          </Box>
          {/* {mockTransactions.map((transaction, i) => ( */}
          <Box
            // key={`${transaction.txId}-${i}`}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box display="flex" flexDirection="column" alignItems="center" mb="25px">
              <Typography
                color={colors.greenAccent[100]}
                variant="h5"
                fontWeight="600"
              >
               Group with Maximum Participants: <br />
               CryptoMoonShots Chat 加密月球shots (36694)
              </Typography>
              <Typography color={colors.grey[100]}></Typography>
            </Box>

            <Box color={colors.grey[100]}></Box>
            { <Box
              backgroundColor={colors.greenAccent[100]}
              p="5px 10px"
              borderRadius="4px"
            ></Box> }
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" height="100px">
              <Typography
                color={colors.greenAccent[100]}
                variant="h5"
                fontWeight="600"
              >
                Non-Bot Users: 89428
                 
              </Typography>
              <Typography color={colors.grey[100]}></Typography>
            </Box>

          {/* ))} */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Sentiment Analysis
          </Typography>
          <Box height="200px">
            <Sentiment />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
