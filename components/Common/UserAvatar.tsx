import { Avatar } from "@mui/material";
import Image from "next/image";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

interface UserAvatarProps {
    username: string;
    avatar: string;
    width: number;
    height: number;
}

export default function UserAvatar({ username, avatar, width, height } : UserAvatarProps){
    return (
        <Avatar sx={{ width: {width}, height: {height}, mr: 1 }}>
            {avatar ? (
                <Image 
                    src={avatar} 
                    alt={`${username}'s avatar`} 
                    width={width} 
                    height={height} 
                    style={{ borderRadius: '50%' }}
                />
            ) : (
                <PersonOutlineIcon sx={{ width: {width}, height: {height} }} />
            )}
        </Avatar>
    )
}