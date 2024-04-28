import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  Divider,
  Stack,
  Checkbox,
  FormGroup,
  FormControlLabel,
  AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

interface Option {
  label: string;
  choices: { label: string }[];
}

const Popup = React.memo(
  (prop: {
    id: number;
    name: string;
    price: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    image: string;
  }) => {
    const [largeImage, setLargeImage] = useState("");
    const [options, setOptions] = useState<Option[]>([]);
    const handleClose = () => prop.setOpen(false);
    const [amount, setAmount] = useState<number>(1);
    const [price, setPrice] = useState<number>(prop.price);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);

    const style = {
      position: "absolute" as "absolute",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      borderRadius: "20px",
    };

    useEffect(() => {
      if (prop.name) {
        axios
          .get("http://localhost:3001/FullMenu/" + prop.id + "/" + prop.name)
          .then((res) => {
            if (res.data.largeImage) {
              setLargeImage(res.data.largeImage);
              setHasPhoto(true);
            }
            console.log(res.data.options);
            setOptions(res.data.options);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [prop.name]);

    const add = () => {
      setAmount(amount + 1);
      setPrice(price + prop.price);
    };
    const subtract = () => {
      if (amount > 0) {
        setAmount(amount - 1);
        setPrice(price - prop.price);
      }
    };

    return (
      <Modal
        open={true}
        onClose={handleClose}
        sx={{
          maxWidth: "50vw",
          top: "50%",
          left: "50%",
          minWidth: "90%",
        }}
      >
        <Box
          sx={{
            ...style,
          }}
        >
          <CloseIcon
            onClick={handleClose}
            style={{
              width: "5%",
              height: "auto",
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 2,
              maxHeight: "40px",
              minWidth: "30px",
              cursor: "pointer",
            }}
          />
          <Box
            style={{
              backgroundColor: "white",
              top: "10px",
              left: "10px",
              position: "absolute",
              borderRadius: "100px",
              width: "5%",
              aspectRatio: "1 / 1",
              zIndex: 1,
              opacity: 0.5,
              minWidth: "30px",
              maxHeight: "40px",
              cursor: "pointer",
            }}
          />
          <Box display={{ xs: "flex", lg: "none" }} sx={{ width: "100%" }}>
            <img
              loading="lazy"
              src={largeImage}
              style={{
                transition: "0.3s",
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "20px 20px 0 0",
              }}
            />
          </Box>
          <Box display={{ xs: "none", lg: "flex" }} sx={{ width: "100%" }}>
            <img
              loading="lazy"
              src={hasPhoto ? largeImage : prop.image}
              style={{
                transition: "0.3s",
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "20px 20px 0 0",
              }}
            />
          </Box>
          <Grid container padding={2}>
            <Grid item xs={12}>
              <Typography variant="h6">{prop.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider
                sx={{
                  marginTop: "10px",
                }}
              />
            </Grid>
            <Box
              sx={{
                marginTop: "10px",
                overflowY: "scroll",
                maxHeight: "200px",
                width: "100%",
              }}
            >
              <Grid item xs={12}>
                {options.map((data: Option) => {
                  return (
                    <Box sx={{ marginLeft: "10px" }}>
                      <Typography variant="subtitle2">{data.label}</Typography>

                      {data.choices.map((data: { label: string }) => {
                        return (
                          <AccordionDetails>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox />}
                                label={data.label}
                              />
                            </FormGroup>
                          </AccordionDetails>
                        );
                      })}
                    </Box>
                  );
                })}
              </Grid>
            </Box>
            <Grid item xs={12}>
              <Divider
                sx={{
                  marginBottom: "10px",
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  cursor: "pointer",
                  paddingTop: "5px",
                }}
                marginLeft={2}
              >
                <Stack>
                  {amount == 1 && <DoNotDisturbOnIcon color="info" />}
                  {amount > 1 && (
                    <DoNotDisturbOnIcon color="secondary" onClick={subtract} />
                  )}
                </Stack>
                <Stack>
                  <Typography>{amount}</Typography>
                </Stack>
                <Stack>
                  <AddCircleIcon color="secondary" onClick={add} />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={8}>
              <Button variant="contained" fullWidth>
                สั่งอาหาร ฿ {price}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    );
  }
);

export default Popup;
