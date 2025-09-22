import {
  CalendarToday,
  ChevronLeft,
  ChevronRight,
  Close,
  ExpandMore,
  Language,
  Launch,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import * as motion from "motion/react-client";
import React from "react";
import useResponsive from "../../../hooks/useResponsive";

const PREVIEW_IMAGE_COUNT = 3;

const ImageGrid = ({ images, showAll = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const isDesktop = useResponsive("up", "sm");

  const displayImages = showAll
    ? images
    : images.slice(0, isDesktop ? 5 : PREVIEW_IMAGE_COUNT);
  const hasMore = images.length > (isDesktop ? 5 : PREVIEW_IMAGE_COUNT);

  const ImageViewer = () => {
    return (
      <Box
        sx={{
          position: "relative",
          width: "800px",
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            p: 2,
            zIndex: 50,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant='h6'>Search Images</Typography>
            <Typography variant='body2' color='text.secondary'>
              {selectedImage + 1} of {images.length}
            </Typography>
          </Box>
          {/* close icon */}
          <IconButton
            onClick={() => setIsOpen(false)}
            disabled={false}
            color='text.secondary'
            aria-label='Close'
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              p: 0.5,
            }}
          >
            <Close size='small' />
          </IconButton>
        </Box>

        {/* Main Image */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "60%",
          }}
        >
          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].description}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          sx={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() =>
            setSelectedImage((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
        >
          <ChevronLeft sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() =>
            setSelectedImage((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
        >
          <ChevronRight sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Description */}
        {images[selectedImage].description && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
            }}
          >
            <Typography variant='body2'>
              {images[selectedImage].description}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {/* Image Gallery Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "auto",
          gap: 1,
        }}
      >
        {displayImages.map((image, index) => (
          <motion.div
            key={index}
            style={{
              position: "relative",
              borderRadius: "8px",
              height: index === 0 ? "188px" : "90px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s",
              ...(index === 0 && {
                gridColumn: "span 2",
                gridRow: "span 2",
              }),
            }}
            onClick={() => {
              setSelectedImage(index);
              setIsOpen(true);
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img
              src={image.url}
              alt={image.description}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {image.description && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  opacity: 0,
                  padding: 1,
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.2s",
                  lineHeight: 0.5,
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    color: "white",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {image.description}
                </Typography>
              </Box>
            )}
            {!showAll && index === (isDesktop ? 3 : 2) && hasMore && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Typography variant='caption' sx={{ color: "white" }}>
                  +{images.length - (isDesktop ? 5 : 3)}
                </Typography>
              </Box>
            )}
          </motion.div>
        ))}
      </Box>

      {/* Modal Dialog for Image Viewer (Desktop) */}
      {isDesktop ? (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth='lg'>
          <DialogContent sx={{ p: 0, borderRadius: 0 }}>
            <ImageViewer selectedImage={selectedImage} images={images} />
          </DialogContent>
        </Dialog>
      ) : (
        // Drawer for Mobile View
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              p: 0,
              height: "80vh",
              width: "100%",
              borderRadius: 0,
            },
          }}
        >
          <ImageViewer selectedImage={selectedImage} images={images} />
        </Drawer>
      )}
    </Box>
  );
};

const WebSearch = ({ data }) => {
  return (
    <Stack gap={1} sx={{ width: "100%" }}>
      <Accordion
        sx={{
          backgroundColor: "Background.paper",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "divider",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        defaultExpanded
      >
        <AccordionSummary
          sx={{
            minHeight: "unset",
            height: "auto",
            "&.Mui-expanded": { minHeight: "unset" },
          }}
          expandIcon={<ExpandMore sx={{ color: "text.secondary" }} />}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ width: "100%" }}
          >
            <Stack direction='row' alignItems='center' spacing={0.5}>
              <Language fontSize='small' sx={{ color: "text.secondary" }} />
              <Typography sx={{ fontWeight: 500 }}>Sources Found</Typography>
            </Stack>
            <Chip
              icon={<SearchIcon fontSize='small' sx={{ color: "inherit" }} />}
              label={`${data?.results?.length} Results`}
              sx={{
                bgcolor: "rgba(73, 149, 87, 0.04)",
                color: "text.secondary",
                fontWeight: 500,
              }}
            />
          </Stack>
        </AccordionSummary>
        <Divider />

        <AccordionDetails
          sx={{ p: 2, bgcolor: "background.paper", borderRadius: "5px" }}
        >
          {/* Query badges */}
          <Stack
            direction='row'
            spacing={1}
            sx={{
              overflowX: "auto",
              pb: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {data.queries?.map((query, i) => (
              <Chip
                key={i}
                sx={{ paddingX: 0.5 }}
                icon={<SearchIcon sx={{ mt: 0.3 }} fontSize='small' />}
                label={query}
                variant='outlined'
              />
            ))}
          </Stack>

          {/* Horizontal scrolling results */}
          <Stack
            direction='row'
            spacing={2}
            sx={{
              overflowX: "auto",
              mt: 2,
              pb: 1,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {data.results?.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    width: 300,
                    flexShrink: 0,
                    bgcolor: "background.paper",
                    boxShadow: 0,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "divider",
                    borderRadius: "10px",
                    transition: "all 0.2s",
                    "&:hover": { boxShadow: 3 },
                  }}
                >
                  <CardContent>
                    {/* Header */}
                    <Box display='flex' alignItems='center' gap={2.5} mb={2}>
                      <Avatar
                        src={`https://www.google.com/s2/favicons?sz=128&domain=${
                          new URL(result.url).hostname
                        }`}
                        alt=''
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                        }}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='12' y1='8' x2='12' y2='16'/%3E%3Cline x1='8' y1='12' x2='16' y2='12'/%3E%3C/svg%3E")
                        }
                      />
                      <Box>
                        <Typography
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                          variant='subtitle2'
                        >
                          {result.title}
                        </Typography>
                        <Link
                          href={result.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          variant='caption'
                          color='text.secondary'
                          underline='hover'
                          display='flex'
                          alignItems='center'
                          gap={0.5}
                        >
                          {new URL(result.url).hostname}
                          <Launch sx={{ fontSize: 12 }} />
                        </Link>
                      </Box>
                    </Box>

                    {/* Content */}
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 2,
                      }}
                    >
                      {result.content}
                    </Typography>

                    {/* Published Date */}
                    {result.published_date && (
                      <>
                        <Divider />
                        <Box
                          display='flex'
                          alignItems='center'
                          gap={1.5}
                          mt={2}
                        >
                          <CalendarToday
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography variant='caption' color='text.secondary'>
                            {new Date(
                              result.published_date
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Images section outside accordion */}
      {data.images?.length > 0 && <ImageGrid images={data.images} />}
    </Stack>
  );
};

export default WebSearch;
