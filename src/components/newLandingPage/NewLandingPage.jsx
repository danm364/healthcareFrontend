import { Box, Typography, Container, useTheme, Divider, alpha } from '@mui/material'
import HeroImage from '../../images/heroimage.jpg'


export default function NewLandingPage() {
    const theme = useTheme();
    console.log(theme.palette.primary.main)
    console.log(theme)
    
    return (
        <Box
            sx={{
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"

            }}
               >
            <Box
            sx={{
                display: "flex", justifyContent: "center", flexWrap: "wrap", 
                alignItems:"center",
                flexDirection:"column",
                width: '90%',
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            }}
            pt={"5%"}

            >
            <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                <Typography
                    variant="h2"
                    component="h1"
                        sx={{
                            display: "flex",
                            flexWrap: "wrap"
                        }}
                >
                    Empowering care through&nbsp;
                    <Typography
                        variant="h2"
                        component="span"
                        sx={{
                            color: theme.palette.primary.main
                        }}
                    >
                        Transparency
                    </Typography>
                </Typography>
                <Typography
                        sx={{
                            mt: "5px",
                            display: "flex",
                            justifyContent: "center"
                        }}
                >
                    Seamlessly connect to your health insurance company and track your claims!
                </Typography>
            </Box>
            <Box
                id="image"
                sx={{
                    mt: "5%",
                    mb: "5%",
                    alignSelf: 'center',
                    height:  "800px" ,
                    width: '80%',
                    backgroundImage: `url(${HeroImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: 'cover',
                    borderRadius: '10px',
                    outline: '1px solid',
                    outlineColor:
                    theme.palette.mode === 'light'
                            ? alpha('#BFCCD9', 0.5)
                            : alpha('#9CCCFC', 0.1),
                    boxShadow:
                        theme.palette.mode === 'light'
                            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                            : `0 0 24px 12px ${alpha('#033363', 0.2)}`,

                }}
                />

            </Box>
            <Box sx={{
                color: theme.palette.common.white,
                width: "100%",
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: `${theme.palette.primary.main}`
            }}>
                <Box>
                    <p>Privacy & Terms</p>
                    <p>Contact Us</p>
                    <p>About us</p>
                </Box>
                <Box>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                    <p>Github</p>
                </Box>
            </Box>
        </Box>
    );
}