import Image from "next/image";
import { Box, Typography } from "@mui/material";


interface EntityViewImageProps {
    title: string;
    imageUrl?: string;
    placeholderText: string;
    fallbackText: string;    
}

export default function EntityViewImage({ title, imageUrl, placeholderText, fallbackText }: EntityViewImageProps) {
    return (
        <>
            <Typography variant="h4" component="h3" sx={{ paddingBottom: 2, marginTop: 1 }}>{ title }</Typography>
            <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '50%' }, display: 'flex', alignItems: 'center' }}>
                {imageUrl ? (
                <Box sx={{ width: '100%', position: 'relative', height: '300px' }}>
                    <Image
                    priority
                    src={imageUrl}
                    alt={`${ placeholderText }`}
                    fill
                    style={{
                        borderRadius: '16px',
                        objectFit: 'cover',
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    }}
                    />
                </Box>
                ) : (
                <Typography variant="body1">{ fallbackText }</Typography>
                )}
            </Box>
        </>
    )
}