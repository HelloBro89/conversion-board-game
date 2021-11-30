import { Box } from "@material-ui/core";
import backgroundIMG from '../images/testBackground.png'
import FormNickName from "../containers/FormNickName";

export const MainPage = () => {
    return (
        <Box style={{height: '100%', width: '100%', backgroundImage: `url(${backgroundIMG})`, overflow: 'hidden'}}>
            <FormNickName/>
        </Box>
    );
};