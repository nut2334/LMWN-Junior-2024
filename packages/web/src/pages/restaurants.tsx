import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Divider,
  Container,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import {
  StyledNavLink,
  CoverImageComputer,
  CoverImageTablet,
  CoverImagePhone,
} from "../core-ui/theme";
import StoreIcon from "@mui/icons-material/Store";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Restaurant {
  id: number;
  name: string;
  coverImage: string;
  activeTimePeriod: { open: string; close: string };
}

const Restaurants = () => {
  const id = [567051, 227018];
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    id.map((index: number) => {
      console.log(index);
      axios
        .get("http://localhost:3001/Restaurant/" + index)
        .then((res) => {
          console.log(res.data);
          setRestaurants((restaurants) => [
            //restaurantsเก่า+restaurantsใหม่
            ...restaurants,
            {
              id: index,
              name: res.data.name,
              coverImage: res.data.coverImage,
              activeTimePeriod: res.data.activeTimePeriod,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  // เช็คเวลา
  const checkTime = (activeTimePeriod: {
    open: string;
    close: string;
  }): boolean => {
    const today = new Date();
    const openTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      parseInt(activeTimePeriod.open.split(":")[0]),
      parseInt(activeTimePeriod.open.split(":")[1])
    );
    const closeTime = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      parseInt(activeTimePeriod.close.split(":")[0]),
      parseInt(activeTimePeriod.close.split(":")[1])
    );
    if (
      today.getTime() >= openTime.getTime() &&
      today.getTime() <= closeTime.getTime()
    ) {
      console.log("open");
      return true;
    } else {
      console.log("close");
      return false;
    }
  };

  return (
    <div>
      {restaurants.map((data: Restaurant) => {
        return (
          <Container maxWidth="lg">
            <StyledNavLink to={"/restaurant/" + data.id}>
              <Grid container spacing={2} style={{ padding: "10px" }}>
                <Grid item xs={3} style={{ textAlign: "right" }}>
                  {/* Computer */}
                  <Box
                    sx={{
                      display: {
                        lg: "flex",
                        xs: "none",
                        md: "none",
                        sm: "none",
                      },
                    }}
                  >
                    <img
                      src={data.coverImage}
                      style={{ objectFit: "cover", ...CoverImageComputer }}
                    />
                  </Box>
                  {/* Tablet */}
                  <Box
                    sx={{
                      display: {
                        lg: "none",
                        sm: "none",
                        md: "flex",
                        xs: "none",
                      },
                    }}
                  >
                    <img
                      src={data.coverImage}
                      style={{ objectFit: "cover", ...CoverImageTablet }}
                    />
                  </Box>
                  {/* iPad Mini */}
                  <Box sx={{ display: { md: "none", sm: "flex", xs: "none" } }}>
                    <img
                      src={data.coverImage}
                      style={{
                        width: "125px",
                        height: "auto",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                        objectPosition: "center center",
                        borderRadius: "8px",
                        marginLeft: "50px",
                      }}
                    />
                  </Box>
                  {/* Phone */}
                  <Box
                    sx={{
                      display: {
                        md: "none",
                        sm: "none",
                        xs: "flex",
                        lg: "none",
                      },
                    }}
                  >
                    <img
                      src={data.coverImage}
                      style={{ objectFit: "cover", ...CoverImagePhone }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      {/* Computer */}
                      <Typography
                        variant="h5"
                        style={{ marginTop: "40px", marginBottom: "10px" }}
                        sx={{ display: { lg: "flex", md: "none", xs: "none" } }}
                        test-id="restaurantName"
                      >
                        {data.name}
                      </Typography>
                      {/* Tablet */}
                      <Typography
                        variant="h5"
                        style={{ marginTop: "30px", marginBottom: "5px" }}
                        sx={{ display: { lg: "none", md: "flex", xs: "none" } }}
                      >
                        {data.name}
                      </Typography>
                      {/* Phone */}
                      <Box
                        sx={{ display: { lg: "none", md: "none", xs: "flex" } }}
                      >
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                            marginBottom: "5px",
                          }}
                        >
                          <Typography
                            noWrap
                            style={{ fontWeight: 600, marginLeft: "30px" }}
                          >
                            {data.name}
                          </Typography>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      {/* Computer */}
                      <Button
                        variant="contained"
                        startIcon={<StoreIcon />}
                        style={{
                          backgroundColor: checkTime(data.activeTimePeriod)
                            ? "#259b24"
                            : "#DF2E38",
                          color: "#FFFFFF",
                        }}
                        sx={{ display: { lg: "flex", md: "none", xs: "none" } }}
                      >
                        {checkTime(data.activeTimePeriod) ? "Open" : "Close"}
                      </Button>
                      <Grid item xs={12} />
                      <Button
                        color="secondary"
                        sx={{ display: { lg: "flex", md: "none", xs: "none" } }}
                        startIcon={<AccessTimeIcon />}
                      >
                        {data.activeTimePeriod.open} -{" "}
                        {data.activeTimePeriod.close}
                      </Button>

                      {/* Tablet */}
                      <Button
                        variant="contained"
                        startIcon={<StoreIcon />}
                        style={{
                          backgroundColor: checkTime(data.activeTimePeriod)
                            ? "#259b24"
                            : "#DF2E38",
                          color: "#FFFFFF",
                        }}
                        sx={{ display: { lg: "none", md: "flex", xs: "none" } }}
                      >
                        {checkTime(data.activeTimePeriod) ? "Open" : "Close"}
                      </Button>
                      <Grid item xs={12} />
                      <Button
                        color="secondary"
                        sx={{ display: { lg: "none", md: "flex", xs: "none" } }}
                        startIcon={<AccessTimeIcon />}
                      >
                        {data.activeTimePeriod.open} -{" "}
                        {data.activeTimePeriod.close}
                      </Button>
                      {/* Phone */}

                      <Button
                        variant="contained"
                        startIcon={<StoreIcon />}
                        style={{
                          backgroundColor: checkTime(data.activeTimePeriod)
                            ? "#259b24"
                            : "#DF2E38",
                          color: "#FFFFFF",
                          marginLeft: "30px",
                        }}
                        sx={{ display: { lg: "none", md: "none", xs: "flex" } }}
                      >
                        {checkTime(data.activeTimePeriod) ? "Open" : "Close"}
                      </Button>
                      <Grid item xs={12} />
                      <Button
                        color="secondary"
                        style={{ marginLeft: "30px" }}
                        sx={{ display: { lg: "none", md: "none", xs: "flex" } }}
                        startIcon={<AccessTimeIcon />}
                      >
                        {data.activeTimePeriod.open} -{" "}
                        {data.activeTimePeriod.close}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </StyledNavLink>
            <Divider style={{ margin: "10px" }} />
          </Container>
        );
      })}
    </div>
  );
};

export default Restaurants;
