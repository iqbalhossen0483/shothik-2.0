import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid2,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";

const BlogHeader = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Grid2
      sx={{
        bgcolor: "primary.main",
        boxShadow: "none",
        px: 5,
        py: 2,
        borderRadius: 2,
        mb: 4,
      }}
      container
      alignItems='center'
      spacing={2}
    >
      <Grid2 size={{ xs: 12, md: 9 }}>
        <Box sx={{ pt: 4, pb: 2 }}>
          <Typography variant='h6' color='white' gutterBottom>
            Search our 8,000+ development and sysadmin blogs.
          </Typography>
          <TextField
            variant='outlined'
            placeholder='Search Blogs ...'
            value={searchQuery}
            onChange={handleInputChange}
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { border: "none" },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon color='action' />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Typography
            variant='body2'
            color='white'
            sx={{ mt: 1, opacity: 0.8 }}
          >
            search this query on {"questions and answers"}
          </Typography>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 3 }}>
        <Image
          src='/moscot.png'
          alt='Blog Header Image'
          height={180}
          width={200}
        />
      </Grid2>
    </Grid2>
  );
};

export default BlogHeader;
