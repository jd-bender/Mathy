import { Typography } from "@mui/material";

const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const plainTextMapping = (content: string, index: number) => (
    <Typography mb={2} key={index}>
        {content}
    </Typography>
);

export { getRandomNumber, plainTextMapping };
