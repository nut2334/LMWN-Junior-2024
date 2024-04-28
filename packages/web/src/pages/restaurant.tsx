import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Divider,
  Grid,
  CircularProgress,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { CoverImagePhone } from "../core-ui/theme";
import Popup from "../components/popup";

const Restaurant = () => {
  const { id } = useParams();
  const [coverImage, setCoverImage] = useState("");
  const [nameRestaurant, setNameRestaurant] = useState("");
  const [activeTimePeriod, setActiveTimePeriod] = useState<{
    open: string;
    close: string;
  }>({ open: "", close: "" });
  const today = new Date();
  const [menus, setMenus] = useState<[]>([]);
  const [nameShortManu, setNameShortManu] = useState<string>("");
  const [priceShortMenu, setPriceShortMenu] = useState<number>(0);
  const [shortMenu, setShortMenu] = useState<
    { name: string; fullPrice: number; thumbnailImage: string }[]
  >([]);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  const listInnerRef = useRef<HTMLDivElement>(null);

  // ชื่อเมนูทั้งหมด
  useEffect(() => {
    //1
    window.addEventListener("scroll", handleScroll);
    axios
      .get("http://localhost:3001/Restaurant/" + id)
      .then((res) => {
        setCoverImage(res.data.coverImage);
        setNameRestaurant(res.data.name);
        setActiveTimePeriod(res.data.activeTimePeriod);
        setMenus(res.data.menus);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // แบ่งเมนูที่แสดง10เมนูต่อหน้า
    //3
    var sliceMenus = menus.slice(page * 10, page * 10 + 10);

    sliceMenus.map((data: string) => {
      axios
        .get(`http://localhost:3001/ShortMenu/${id}/${data}`)
        .then((res) => {
          //ShortMenuเก่า+ShortMenuใหม่
          setShortMenu((prev) => [
            ...prev,
            {
              name: res.data.name,
              fullPrice: res.data.fullPrice,
              thumbnailImage: res.data.thumbnailImage,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    // ถ้าเมนูที่แสดงน้อยกว่า10และไม่ใช่หน้าแรกให้ไม่แสดงเมนู
    //4
    if (sliceMenus.length < 10 && page != 0) {
      setHasMore(false);
      return;
    }
  }, [page, menus]);

  const handleScroll = () => {
    // เช็คว่าเลื่อนลงสุดหรือยัง
    //2
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // เช็คเวลาเปิดร้าน
  //useMemo คือการเก็บค่าไว้เพื่อเอาไปใช้ในอนาคต
  //เช็คเวลาเปิดร้าน
  const checkTime = useMemo(() => {
    return () => {
      const openTime = new Date(
        // แยกปีเดือนวัน
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        // แยกชั่วโมงและนาที
        Number(activeTimePeriod.open.split(":")[0]),
        Number(activeTimePeriod.open.split(":")[1])
      );
      const closeTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        Number(activeTimePeriod.close.split(":")[0]),
        Number(activeTimePeriod.close.split(":")[1])
      );
      return (
        // เช็คว่าเวลาปัจจุบันอยู่ระหว่างเวลาเปิด-ปิดร้านหรือไม่
        today.getTime() >= openTime.getTime() &&
        today.getTime() <= closeTime.getTime()
      );
    };
  }, [activeTimePeriod, today]);

  const handleClick = (
    nameShortManu: string,
    priceShortMenu: number,
    thumbnailImage: string
  ) => {
    console.log("click");
    setNameShortManu(nameShortManu);
    setPriceShortMenu(priceShortMenu);
    setThumbnailImage(thumbnailImage);
    setOpen(true);
  };

  return (
    <div ref={listInnerRef}>
      {open == true && (
        <Popup
          id={Number(id)}
          name={nameShortManu}
          price={priceShortMenu}
          setOpen={setOpen}
          image={thumbnailImage}
        />
      )}
      <img
        loading="lazy"
        src={coverImage}
        alt="coverImage"
        width="100%"
        style={{
          width: "100%",
          height: "400px",
          objectFit: "cover",
          objectPosition: "center center",
          maxWidth: "100%",
        }}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            top: "20%",
            left: "0",
            borderRadius: "20px",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box padding={2}>
            <Stack>
              <Typography variant="h5">{nameRestaurant}</Typography>
              <Stack direction="row" marginTop={1}>
                <Stack>
                  <Button
                    variant="contained"
                    startIcon={<StoreIcon />}
                    style={{
                      backgroundColor: checkTime() ? "#259b24" : "#DF2E38",
                      color: "#FFFFFF",
                    }}
                  >
                    {checkTime() ? "Open" : "Close"}
                  </Button>
                </Stack>
                <Stack>
                  <Button
                    color="secondary"
                    startIcon={<AccessTimeIcon />}
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    {activeTimePeriod.open} - {activeTimePeriod.close}
                  </Button>
                </Stack>
              </Stack>
              <Divider style={{ margin: "10px" }} />
            </Stack>

            <div>
              {shortMenu.map((data: any) => {
                return (
                  <Container
                    onClick={() =>
                      handleClick(
                        data.name,
                        data.fullPrice,
                        data.thumbnailImage
                      )
                    }
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Box
                          sx={{
                            textAlign: "right",
                          }}
                        >
                          {data.thumbnailImage ? (
                            <img
                              src={data.thumbnailImage}
                              alt="thumbnailImage"
                              style={CoverImagePhone}
                            />
                          ) : (
                            <RestaurantMenuIcon
                              color="secondary"
                              style={{ fontSize: "100px" }}
                            />
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={9}>
                        <Grid
                          container
                          sx={{
                            paddingLeft: "30px",
                          }}
                        >
                          <Grid item xs={12}>
                            <Typography>{data.name}</Typography>
                          </Grid>
                          <Grid item xs={12} margin={1} />
                          <Grid item xs={11}>
                            <Typography variant="subtitle2" color="primary">
                              {" "}
                              ฿{data.fullPrice}
                            </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <AddCircleOutlineIcon color="info" />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider style={{ margin: "10px" }} />
                  </Container>
                );
              })}
              <Box>
                <CircularProgress
                  sx={{
                    margin: "0 auto",
                    ...(hasMore
                      ? {
                          display: "flex",
                          visibility: "visible",
                        }
                      : {
                          display: "none",
                          visibility: "hidden",
                        }),
                  }}
                />
              </Box>
            </div>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Restaurant;
